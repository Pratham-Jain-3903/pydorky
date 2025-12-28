# Developer Experience

Documentation, configuration, testing, and error handling.

## P0: Documentation

### README Updates
- [ ] Update main README with current architecture (HTTP service + thin clients)
- [ ] Add architecture diagram (ASCII or SVG)
- [ ] Add quick start guide for Node and Python
- [ ] Add cloud provider setup instructions (S3, GCS, Azure)
- [ ] Add troubleshooting section

### API Documentation
- [ ] Generate API docs from OpenAPI spec (Swagger UI)
- [ ] Host Swagger UI at `/api/docs`
- [ ] Add cURL examples for each endpoint
- [ ] Document error codes and response formats

### CLI Documentation
- [ ] Document all CLI commands and flags
- [ ] Add `dorky --help` output
- [ ] Create `docs/cli-reference.md`
- [ ] Add usage examples for common workflows

### Guides
- [ ] Create `docs/guides/` directory
- [ ] Add guide: "Using S3 with Dorky"
- [ ] Add guide: "Data compression strategies"
- [ ] Add guide: "Python integration"
- [ ] Add guide: "GitHub Actions integration"

### Architecture Document
- [ ] Document system design and decisions
- [ ] Explain HTTP service role
- [ ] Explain client library architecture
- [ ] Diagram: local CLI → HTTP service → cloud storage

## P1: Configuration Management

### Project Config File (`.dorkyrc`)
- [ ] TOML or YAML format
- [ ] Store bucket URL, credentials, compression settings
- [ ] Support environment variable overrides
- [ ] Example `.dorkyrc.example` in repo

### User Configuration
- [ ] Support `~/.dorky/config` for user defaults
- [ ] Support `~/.dorky/credentials` for secrets
- [ ] Add `dorky config set <key> <value>` command
- [ ] Add `dorky config get <key>` command
- [ ] Add `dorky config list` command

### Environment Variables
- [ ] `DORKY_URL` — service base URL
- [ ] `DORKY_BUCKET_URL` — cloud bucket URL
- [ ] `DORKY_ACCESS_KEY` — cloud credentials
- [ ] `DORKY_SECRET_KEY` — cloud credentials
- [ ] `DORKY_COMPRESS` — default compression type
- [ ] Document all variables in README

### Init Command
- [ ] `dorky init` — interactive setup wizard
- [ ] Detect cloud provider from credentials
- [ ] Create `.dorkyrc` with initial config
- [ ] Test bucket connection
- [ ] Offer to add `.dorkyrc` to `.gitignore`

## P1: Testing & CI

### Unit Tests
- [ ] Test upload/download logic
- [ ] Test compression/decompression
- [ ] Test metadata operations
- [ ] Test error handling and retries
- [ ] Target 80%+ code coverage

### Integration Tests
- [ ] Test against local HTTP server
- [ ] Test all storage backends (S3, GCS, local)
- [ ] Test CLI commands end-to-end
- [ ] Test compression options
- [ ] Test various file sizes (small, large, >1GB)

### E2E Tests
- [ ] Test full workflow: init → stage → commit → push → pull
- [ ] Test multi-file operations
- [ ] Test concurrent uploads
- [ ] Test error recovery (network interruption, etc.)

### Test Infrastructure
- [ ] Use Jest for Node tests
- [ ] Use pytest for Python tests
- [ ] Use Docker for consistent test environment
- [ ] Add CI workflows (GitHub Actions)
- [ ] Run tests on Node 16 + 20
- [ ] Run Python tests on 3.8, 3.9, 3.10, 3.11

### CI Workflows
- [ ] Lint (ESLint for Node, pylint/black for Python)
- [ ] Type check (TypeScript, mypy)
- [ ] Unit tests on every PR
- [ ] Integration tests on main branch
- [ ] E2E tests before release

## P2: Error Handling & Diagnostics

### Error Messages
- [ ] Clear, actionable error messages
- [ ] Suggest fixes when possible
- [ ] Include error codes (e.g., `E001: Invalid bucket URL`)
- [ ] Don't expose internal stack traces to users

### Verbose Mode
- [ ] `--verbose` / `-v` flag for detailed output
- [ ] Log all HTTP requests/responses
- [ ] Show timing information
- [ ] Include diagnostics (network, disk, permissions)

### Debug Mode
- [ ] `--debug` flag for maximum verbosity
- [ ] Dump request/response bodies
- [ ] Show internal state
- [ ] Enable profiling

### Logging
- [ ] Structured logging (JSON format option)
- [ ] Log to file: `~/.dorky/logs/`
- [ ] Log rotation (keep last 10 files)
- [ ] Log level configuration (info, debug, trace)

### Diagnostics Command
- [ ] `dorky diagnose` — check system health
- [ ] Verify bucket connectivity
- [ ] Check permissions
- [ ] Verify file system space
- [ ] Test network speed
- [ ] Report diagnostics bundle for issue reporting

## P2: IDE Integration

### VS Code Extension
- [ ] Create VS Code extension for Dorky
- [ ] File explorer integration
- [ ] Show sync status icon
- [ ] Quick actions: upload file, download artifact
- [ ] Status bar: connection status, last sync time

### Editor Integration
- [ ] Context menu: "Upload to Dorky", "Sync with Dorky"
- [ ] Sync status in file decorations (✓, !, ↑, ↓)
- [ ] Preview artifact metadata
- [ ] Show file history (versions)

## P3: Advanced Developer Tools

### GitHub Integration
- [ ] GitHub Action: Upload artifacts from CI/CD
- [ ] GitHub Action: Download artifacts from Dorky
- [ ] Example workflows in `docs/examples/`

### SDK & Libraries
- [ ] TypeScript SDK with full type definitions
- [ ] Python SDK with type hints (mypy compatible)
- [ ] Generate SDKs from OpenAPI spec

### API Playground
- [ ] Interactive API explorer (Swagger UI)
- [ ] Example code generation (cURL, Python, Node, etc.)
- [ ] Request/response history

---

**Status**: Documentation started, config/testing/diagnostics pending
**Next**: Update README with architecture, create `.dorkyrc` support, add unit/integration tests
