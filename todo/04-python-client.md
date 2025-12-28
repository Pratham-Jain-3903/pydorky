# Python Client (PyPI)

Lightweight Python package on PyPI that mirrors Node client feature set.

## P0: Core Blocking Client

### Basic Operations
- [x] Scaffold `python-client/` with `pyproject.toml`
- [x] Implement `DorkyClient.upload()` (blocking)
- [x] Implement `DorkyClient.download()` (blocking)
- [ ] Add `DorkyClient.get_metadata()` method
- [ ] Add `DorkyClient.delete()` method
- [ ] Verify streaming for large files (no buffering)

### Idempotency & Conflict Handling
- [ ] Add idempotency key support in `upload()`
- [ ] Handle 409 Conflict responses
- [ ] Add retry logic with exponential backoff
- [ ] Support `--force` option to overwrite

### Error Handling
- [ ] Catch and wrap HTTP errors
- [ ] Provide clear error messages
- [ ] Add retry-after handling (429 Rate Limited)
- [ ] Add timeout configuration

## P1: Async Client

### Async Implementation
- [ ] Create `AsyncDorkyClient` using `httpx`
- [ ] Mirror all sync methods in async version
- [ ] Add async `upload()`, `download()`, `get_metadata()`, `delete()`
- [ ] Add connection pooling and session reuse
- [ ] Support async context manager (`async with`)

### Testing
- [ ] Add integration tests for async client
- [ ] Test concurrent uploads/downloads
- [ ] Verify no blocking calls in async code

## P1: CLI Wrapper

### CLI Commands
- [ ] Add `dorky-py` or `dorky` CLI entry point
- [ ] Implement `dorky-py commit <message>` command
- [ ] Implement `dorky-py stage <path>` command
- [ ] Implement `dorky-py push` command
- [ ] Implement `dorky-py pull` command
- [ ] Implement `dorky-py download <artifact_id> <dest>` command
- [ ] Implement `dorky-py status` command

### Configuration
- [ ] Read from `.dorkyrc` in project root
- [ ] Support environment variables (DORKY_URL, DORKY_BUCKET, etc.)
- [ ] Add `dorky-py config` command to view/edit settings
- [ ] Support `~/.dorky/config` for user defaults

### Progress & Output
- [ ] Show progress bar for uploads/downloads
- [ ] Add `--quiet` / `-q` flag
- [ ] Add `--verbose` / `-v` flag for debugging
- [ ] Pretty-print metadata and file listings

## P1: PyPI Publishing

### Package Setup
- [ ] Finalize `pyproject.toml` with metadata
- [ ] Add PyPI classifiers (Python 3.7+)
- [ ] Set up build script (uses setuptools/wheel)
- [ ] Test local install: `pip install -e .`

### Publishing Workflow
- [ ] Create TestPyPI account
- [ ] Publish to TestPyPI first
- [ ] Test install from TestPyPI: `pip install --index-url https://test.pypi.org/simple/ dorky-client`
- [ ] Add GitHub Actions workflow for PyPI publish
- [ ] Publish to PyPI (production)

### Version Management
- [ ] Follow semantic versioning (MAJOR.MINOR.PATCH)
- [ ] Update version in `pyproject.toml` for each release
- [ ] Tag releases in git (e.g., `py-v0.1.0`)
- [ ] Auto-generate changelog from commits

## P2: Compression & Format Support

### Compression
- [ ] Add `upload(compress='gzip')` parameter
- [ ] Support `compress='lz4'`, `compress='brotli'`
- [ ] Auto-decompress downloads based on metadata
- [ ] Add `--compress` flag to CLI

### Data Formats
- [ ] Add optional `pyarrow` dependency for Parquet
- [ ] Support `upload(..., format='parquet')`
- [ ] Add format conversion helpers
- [ ] Make heavy dependencies optional (`dorky[parquet]`, `dorky[async]`)

## P2: Optional Extras

### Package Extras
- [ ] `dorky[parquet]` — includes `pyarrow` for Parquet support
- [ ] `dorky[async]` — includes `httpx` for async client
- [ ] `dorky[all]` — includes all optional dependencies
- [ ] Document in README

### Security Extras
- [ ] `dorky[encrypt]` — includes `cryptography` for encryption
- [ ] Support encrypted upload/download with client-side keys

## P3: Advanced Features

### Batch Operations
- [ ] Implement `upload_batch(files: List[str])` for multiple files
- [ ] Implement `download_batch(ids: List[str], dest_dir: str)`
- [ ] Support concurrent batch operations with asyncio

### Streaming & Chunking
- [ ] Expose raw streaming download (generator/iterator)
- [ ] Support range requests for partial downloads
- [ ] Add chunk size configuration

---

**Status**: Core client exists, async/CLI/publishing pending
**Next**: Add async client, CLI commands, publish to TestPyPI
