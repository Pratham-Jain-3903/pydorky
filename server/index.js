const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'tmp/' });
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'openapi', 'openapi.yaml'));
});

app.post('/artifacts', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no file' });
  const id = Date.now().toString(36);
  const dest = path.resolve(__dirname, '..', 'data', id + '_' + req.file.originalname);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(req.file.path, dest);
  const metadata = req.body.metadata || {};
  res.status(201).json({ id, url: `/artifacts/${id}`, metadata });
});

app.get('/artifacts/:id', (req, res) => {
  const id = req.params.id;
  const dir = path.resolve(__dirname, '..', 'data');
  const file = fs.readdirSync(dir).find(f => f.startsWith(id + '_'));
  if (!file) return res.status(404).json({ error: 'not found' });
  res.sendFile(path.resolve(dir, file));
});

app.get('/artifacts/:id/metadata', (req, res) => {
  // lightweight metadata (none persisted in stub)
  res.json({ id: req.params.id, created: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Dorky stub server listening on ${PORT}`));
