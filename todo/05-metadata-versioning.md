# Metadata & Versioning

Artifact versioning, conflict detection, and complete change history.

## P1: Enhanced Metadata

### Standard Metadata Fields
- [ ] Implement `last_updated` timestamp (UTC ISO 8601)
- [ ] Implement `content_hash` (SHA256 hex string)
- [ ] Implement `uploaded_by` (user/email from config)
- [ ] Implement `file_size` (bytes)
- [ ] Implement `compressed_size` (bytes, if compressed)
- [ ] Implement `compression_type` (gzip, lz4, brotli, or null)

### Custom Metadata
- [ ] Support user-defined key-value metadata
- [ ] Store custom metadata in artifact metadata section
- [ ] Merge custom + standard metadata in response
- [ ] Document metadata schema in OpenAPI

### Metadata Update
- [ ] Implement `PATCH /artifacts/{id}/metadata` endpoint
- [ ] Allow updating custom metadata without re-uploading file
- [ ] Store update timestamp and updater info
- [ ] Maintain update history

## P1: Artifact Versioning

### Version Storage
- [ ] Store multiple versions of same artifact
- [ ] Use version ID (integer or UUID) for each version
- [ ] Track version creation timestamp and uploader
- [ ] Keep version metadata (size, hash, compression)

### Version Endpoints
- [ ] Implement `GET /artifacts/{id}/versions` — list all versions
- [ ] Implement `GET /artifacts/{id}?version={v}` — get specific version
- [ ] Implement `GET /artifacts/{id}/versions/{v}/metadata` — version metadata
- [ ] Implement `DELETE /artifacts/{id}/versions/{v}` — delete version (keep data)

### CLI Commands
- [ ] Add `dorky history <artifact_id>` — show version history
- [ ] Add `dorky show <artifact_id> --version=<v>` — view specific version
- [ ] Add `dorky checkout <artifact_id> --version=<v>` — download version
- [ ] Add `dorky info <artifact_id>` — show current + version info

## P1: Conflict Detection & Resolution

### Race Condition Detection
- [ ] Detect concurrent uploads of same file
- [ ] Implement optimistic locking using ETags
- [ ] Return HTTP 409 Conflict if updated concurrently
- [ ] Include conflict details in error response

### Conflict Resolution Strategies
- [ ] `--force` flag to overwrite
- [ ] `--merge` strategy for mergeable files
- [ ] `--abort` flag to fail on conflicts
- [ ] Show conflict info (who, when, hash diff)

### Merge Conflicts for Structured Data
- [ ] Detect schema mismatches
- [ ] Support JSON merge (deep merge)
- [ ] Support CSV/Parquet schema evolution
- [ ] Warn on incompatible changes

## P2: Time Travel & Diffs

### Historical Queries
- [ ] `dorky log <artifact_id>` — show commit-like history
- [ ] `dorky diff <id> --version=<v1> --version=<v2>` — compare versions
- [ ] `dorky blame <artifact_id>` — show line-by-line history (for text)

### Diff Implementation
- [ ] For text files: line-by-line diff (unified format)
- [ ] For JSON: semantic diff (structure aware)
- [ ] For Parquet: schema + row count diff
- [ ] For binary: byte-level diff or hash comparison

### Rollback
- [ ] `dorky rollback <artifact_id> --version=<v>` — restore version
- [ ] Creates new version (doesn't delete old)
- [ ] Mark as rollback in metadata/history

## P2: Retention & Cleanup

### Version Retention Policies
- [ ] Keep last N versions of each artifact
- [ ] Auto-delete old versions after TTL (configurable)
- [ ] Support explicit version deletion
- [ ] Warn before deleting versions

### Garbage Collection
- [ ] Implement cleanup of orphaned blob data
- [ ] Run GC on schedule (configurable)
- [ ] Track storage usage and report
- [ ] Add `dorky storage stats` command

## P3: Audit & Compliance

### Audit Log
- [ ] Log all mutations (upload, update, delete)
- [ ] Store user, timestamp, action, artifact ID
- [ ] Implement `GET /audit-log` endpoint (admin only)
- [ ] Support audit log export

### Compliance Features
- [ ] Lock versions for immutability (compliance)
- [ ] Add `--immutable` flag to upload
- [ ] Prevent deletion of locked versions
- [ ] Generate compliance reports

---

**Status**: Standard metadata planned, versioning in design, conflict detection pending
**Next**: Implement standard metadata fields, version storage, conflict detection
