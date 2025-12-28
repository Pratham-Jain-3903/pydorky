# Core Infrastructure

Core HTTP service, CLI foundation, and Node version alignment.

## P0: HTTP Service Foundation

### Upload & Download
- [ ] Finalize OpenAPI spec (multipart form, JSON responses, error codes)
- [ ] Implement `POST /artifacts` endpoint with streaming support
- [ ] Implement `GET /artifacts/{id}` endpoint with streaming download
- [ ] Add HTTP 201 Created response for uploads
- [ ] Add HTTP 200 OK for downloads
- [ ] Handle large file uploads (>100MB) efficiently

### Metadata Operations
- [ ] Implement `GET /artifacts/{id}/metadata` endpoint
- [ ] Implement `PATCH /artifacts/{id}/metadata` endpoint
- [ ] Support custom key-value metadata
- [ ] Store `content_hash`, `file_size`, `last_updated`, `uploaded_by`

### Idempotency
- [ ] Add idempotency key support in upload endpoint
- [ ] Store idempotency key → artifact ID mapping
- [ ] Return cached result if same key uploaded twice
- [ ] Auto-clean old idempotency entries (TTL)

### Health & Status
- [ ] Add `GET /health` endpoint
- [ ] Add `GET /status` with service diagnostics
- [ ] Return storage backend status

## P0: Node Version & CI

### Node Version Management
- [ ] Add `.nvmrc` file with `16` in repo root
- [ ] Add `engines.node` to `package.json` (`>=16`)
- [ ] Update devcontainer image to Node 16 base
- [ ] Document Node version requirement in `README.md` and `docs/doc#1  get-started`

### CI/CD Alignment
- [ ] Ensure publish workflow runs on Node 16
- [ ] Add CI matrix job for Node 16 + Node 20 testing
- [ ] Run integration tests on both versions
- [ ] Plan migration steps to Node 20 (documented)

## P1: CLI Foundation

### Commit/Stage/Push Workflow
- [ ] Implement `dorky init` — scaffold project config
- [ ] Implement `dorky status` — show staged/changed files
- [ ] Implement `dorky stage <path>` — add file to staging
- [ ] Implement `dorky unstage <path>` — remove from staging
- [ ] Implement `dorky commit <message>` — create commit with staged files
- [ ] Implement `dorky push` — upload commits to remote bucket
- [ ] Implement `dorky pull` — download latest from bucket

### Configuration
- [ ] Add `.dorkyrc` project config file support
- [ ] Support environment variables for bucket URL, credentials
- [ ] Store local state in `.dorky/` directory

### Error Handling
- [ ] Add `--verbose` flag for debugging
- [ ] Add `--help` for all commands
- [ ] Return clear error messages with actionable hints

## P2: Testing & Documentation

### Testing
- [ ] Add unit tests for upload/download logic
- [ ] Add integration tests with local server
- [ ] Add E2E tests for CLI workflow
- [ ] Test with various file sizes (small, medium, large >1GB)

### Documentation
- [ ] Document OpenAPI spec with examples
- [ ] Add CLI command reference to README
- [ ] Add architecture diagram
- [ ] Add troubleshooting guide

---

**Status**: Core service + CLI in dev, Node alignment pending
**Next**: Finalize OpenAPI spec, implement upload/download endpoints
