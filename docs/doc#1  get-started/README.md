# Get Started with Dorky

Purpose
- Quick intro to run and develop the Dorky core HTTP service and language clients (Node CLI + Python client).
- Understand the architecture and how to work locally with your own bucket (S3/GCS/Azure planned).

Architecture (high level)
- Core service: small language-agnostic HTTP service implementing artifact storage, streaming upload/download, metadata, idempotency, and versioning.
- Clients: thin language clients (Node CLI, Python) calling the HTTP API; heavy data-format work can be offloaded to Python helpers.

What you can do
- Upload/download large artifacts without putting them in Git.
- Keep version history and metadata (hash, size, uploader, timestamps).
- Avoid duplicate uploads via idempotency keys.
- Bring your own bucket (S3/GCS now; Azure planned) and keep control of your data.

Prerequisites
- Node 16.x (see docs/doc#3 the-correct-node-version)
- npm installed
- Optional: Python 3.8+ if you want to use the Python client

Run the HTTP service locally
```bash
cd server
npm install
npm start
# Service listens on http://localhost:3000
```

Run the Node CLI locally (legacy workflow)
```bash
# from repo root
npm install
node bin/index.js --help
```
Key legacy commands:
- `dorky --init aws|google-drive` (sets up .dorky metadata and credentials)
- `dorky --add <files>` / `--rm <files>` (stage/unstage)
- `dorky --push` / `--pull` (upload/download via S3 or Google Drive)

Run the web app (React scaffold)
```bash
cd web-app
npm install
npm run start
```

Use the Python client (sync, minimal scaffold)
```bash
pip install -e python-client
python - <<'PY'
from dorky_client import DorkyClient
c = DorkyClient('http://localhost:3000')
print(c.upload('path/to/file.txt', metadata={'note':'example'}))
PY
```

HTTP API quick reference (see openapi/openapi.yaml)
- `GET /health` — service status
- `POST /artifacts` — upload (multipart/form-data, supports `idempotency_key`)
- `GET /artifacts/{id}` — download (stream)
- `DELETE /artifacts/{id}` — delete
- `GET /artifacts/{id}/metadata` — fetch metadata
- `PATCH /artifacts/{id}/metadata` — update metadata
- `GET /artifacts/{id}/versions` — list versions

Metadata captured on upload
- `content_hash` (SHA256), `file_size`, `compressed_size` (if any)
- `compression_type` (gzip/lz4/brotli/none planned)
- `last_updated`, `uploaded_by`
- `custom` (user-supplied metadata)

Idempotency
- Provide `idempotency_key` on upload to avoid duplicate artifacts when retrying.
- Server returns the existing artifact if the same key is reused (HTTP 409 with the existing artifact info).

Versioning (stub in memory)
- Each upload currently recorded as version `1` in the stub.
- Planned: true multi-version history with `versions` listing and versioned downloads.

Storage backends
- Supported now: AWS S3, Google Drive (via legacy CLI flows)
- Planned: Azure Blob, GCS official path in new HTTP service, MinIO/S3-compatible, local filesystem for dev.

Local folders and config
- `.dorky/metadata.json` — staging and uploaded file tracking (legacy CLI)
- `.dorky/credentials.json` — storage credentials (legacy CLI)
- `.dorkyignore` — ignore patterns for staging (legacy CLI)
- `.nvmrc` — pins Node 16

Recommended local dev flow (HTTP service + clients)
1) Start HTTP service: `cd server && npm install && npm start`
2) Use Node CLI (legacy) or Python client to hit the service
3) Inspect API contract: `openapi/openapi.yaml`
4) Iterate on endpoints, then expand clients (Node/Python) accordingly

Troubleshooting tips
- Port already in use: stop previous server or `PORT=3001 npm start`
- Missing Node 16: `nvm install 16 && nvm use 16`
- Upload returns 409: idempotency key was reused; change key or reuse returned artifact
- Metadata JSON invalid on upload: ensure `metadata` field is valid JSON string

Notes on backward compatibility
- Legacy CLI (direct S3/Drive) is retained; new HTTP service will be the canonical path.
- Migration strategy: keep old commands working while adding new commands that talk to the HTTP API.
