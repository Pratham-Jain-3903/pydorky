const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const upload = multer({ dest: 'tmp/' });
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for metadata and idempotency (in production: use database)
const artifactStore = new Map(); // id -> { path, metadata, versions }
const idempotencyStore = new Map(); // idempotency_key -> artifact_id

// Utility: compute SHA256 hash of file
function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Serve OpenAPI spec
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'openapi', 'openapi.yaml'));
});

// POST /artifacts - Upload artifact with metadata and idempotency
app.post('/artifacts', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'no file provided' });
  }

  const idempotencyKey = req.body.idempotency_key;
  
  // Check idempotency: if same key uploaded before, return cached result
  if (idempotencyKey && idempotencyStore.has(idempotencyKey)) {
    const existingId = idempotencyStore.get(idempotencyKey);
    const existing = artifactStore.get(existingId);
    return res.status(409).json({
      error: 'artifact already exists with this idempotency key',
      artifact: {
        id: existingId,
        url: `/artifacts/${existingId}`,
        metadata: existing.metadata
      }
    });
  }

  // Generate artifact ID
  const id = Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
  const dest = path.resolve(__dirname, '..', 'data', id + '_' + req.file.originalname);
  
  // Create data directory
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(req.file.path, dest);

  // Compute file hash and size
  const fileSize = fs.statSync(dest).size;
  const contentHash = hashFile(dest);

  // Parse custom metadata
  let customMetadata = {};
  try {
    if (req.body.metadata) {
      customMetadata = JSON.parse(req.body.metadata);
    }
  } catch (e) {
    return res.status(400).json({ error: 'invalid metadata JSON' });
  }

  // Build complete metadata
  const metadata = {
    content_hash: contentHash,
    file_size: fileSize,
    compression_type: null,
    compressed_size: fileSize,
    last_updated: new Date().toISOString(),
    uploaded_by: req.body.uploaded_by || 'anonymous',
    custom: customMetadata
  };

  // Store artifact and metadata
  artifactStore.set(id, {
    path: dest,
    metadata: metadata,
    versions: [{ version_id: '1', created_at: metadata.last_updated, metadata: metadata }]
  });

  // Store idempotency mapping
  if (idempotencyKey) {
    idempotencyStore.set(idempotencyKey, id);
  }

  res.status(201).json({
    id,
    url: `/artifacts/${id}`,
    metadata,
    version: '1'
  });
});

// GET /artifacts/{id} - Download artifact
app.get('/artifacts/:id', (req, res) => {
  const id = req.params.id;
  const artifact = artifactStore.get(id);

  if (!artifact) {
    // Fallback: check legacy data directory
    const dir = path.resolve(__dirname, '..', 'data');
    if (fs.existsSync(dir)) {
      const file = fs.readdirSync(dir).find(f => f.startsWith(id + '_'));
      if (file) {
        return res.sendFile(path.resolve(dir, file));
      }
    }
    return res.status(404).json({ error: 'artifact not found' });
  }

  res.sendFile(artifact.path);
});

// DELETE /artifacts/{id} - Delete artifact
app.delete('/artifacts/:id', (req, res) => {
  const id = req.params.id;
  const artifact = artifactStore.get(id);

  if (!artifact) {
    return res.status(404).json({ error: 'artifact not found' });
  }

  // Delete file from disk
  if (fs.existsSync(artifact.path)) {
    fs.unlinkSync(artifact.path);
  }

  // Remove from store
  artifactStore.delete(id);

  res.status(204).send();
});

// GET /artifacts/{id}/metadata - Get metadata
app.get('/artifacts/:id/metadata', (req, res) => {
  const id = req.params.id;
  const artifact = artifactStore.get(id);

  if (!artifact) {
    return res.status(404).json({ error: 'artifact not found' });
  }

  res.json(artifact.metadata);
});

// PATCH /artifacts/{id}/metadata - Update metadata
app.patch('/artifacts/:id/metadata', express.json(), (req, res) => {
  const id = req.params.id;
  const artifact = artifactStore.get(id);

  if (!artifact) {
    return res.status(404).json({ error: 'artifact not found' });
  }

  // Merge custom metadata
  artifact.metadata.custom = { ...artifact.metadata.custom, ...req.body };
  artifact.metadata.last_updated = new Date().toISOString();

  res.json(artifact.metadata);
});

// GET /artifacts/{id}/versions - List all versions
app.get('/artifacts/:id/versions', (req, res) => {
  const id = req.params.id;
  const artifact = artifactStore.get(id);

  if (!artifact) {
    return res.status(404).json({ error: 'artifact not found' });
  }

  res.json(artifact.versions || []);
});

app.listen(PORT, () => {
  console.log(`Dorky artifact service listening on port ${PORT}`);
  console.log(`Health check: GET http://localhost:${PORT}/health`);
  console.log(`OpenAPI spec: GET http://localhost:${PORT}/openapi.yaml`);
});
