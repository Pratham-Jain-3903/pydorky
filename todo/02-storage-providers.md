# Storage Providers (BYOB)

Bring-your-own-bucket support for AWS S3, Google Cloud Storage, Azure, and local backends.

## P0: Existing Providers

### AWS S3
- [x] Basic S3 client integration exists
- [ ] Verify streaming upload works (multipart)
- [ ] Verify streaming download works
- [ ] Add region configuration support
- [ ] Test with various file sizes
- [ ] Add S3 access error handling

### Google Cloud Storage (GCS)
- [x] Basic GCS integration exists
- [ ] Verify streaming upload works
- [ ] Verify streaming download works
- [ ] Add project ID configuration
- [ ] Test bucket access and permissions
- [ ] Add GCS-specific error handling

### Google Drive
- [x] Integration exists (documented in docs)
- [ ] Test with OAuth 2.0 flow
- [ ] Verify file sync and versioning

## P1: New Providers

### Azure Blob Storage
- [ ] Implement Azure Blob Storage client
- [ ] Add connection string support
- [ ] Implement streaming upload (block blobs)
- [ ] Implement streaming download
- [ ] Add container creation support
- [ ] Test with various blob sizes

### MinIO / S3-Compatible
- [ ] Implement S3-compatible endpoint support
- [ ] Allow custom endpoint URL configuration
- [ ] Test with MinIO local instance
- [ ] Test with other S3-compatible services (DigitalOcean Spaces, etc.)

### Local Filesystem (Dev/Testing)
- [ ] Implement local filesystem backend
- [ ] Use `.dorky-data/` directory
- [ ] Support all operations (upload, download, metadata, delete)
- [ ] Add for easy local testing without cloud credentials

## P2: Bucket Configuration & Management

### Bucket Provisioning
- [ ] Implement `dorky bucket create` command
- [ ] Auto-detect cloud provider (S3, GCS, Azure)
- [ ] Create bucket with proper permissions
- [ ] Store credentials securely

### Bucket Operations
- [ ] Implement `dorky bucket list` — list all configured buckets
- [ ] Implement `dorky bucket delete` — remove bucket reference
- [ ] Implement `dorky bucket validate` — test connection and permissions
- [ ] Add bucket selection for multi-bucket projects

### Credentials Management
- [ ] Support AWS IAM credentials (env vars or ~/.aws/credentials)
- [ ] Support GCS service account keys
- [ ] Support Azure connection strings
- [ ] Add `dorky config credentials` command

## P2: Hierarchical Sync

### Folder Structure
- [ ] Create hierarchical folder structure on bucket (e.g., `projects/myproject/data/`)
- [ ] Map local file structure to bucket paths
- [ ] Support nested directories at arbitrary depth

### Sync Operations
- [ ] Implement `dorky sync` — two-way sync of local/remote
- [ ] Implement `dorky upload-folder <path>` — upload entire directory
- [ ] Implement `dorky download-folder <path>` — download entire directory
- [ ] Support `.dorkyignore` patterns (like `.gitignore`)

### Incremental Sync
- [ ] Track synced files and timestamps
- [ ] Only sync changed files on subsequent runs
- [ ] Add `--force` flag to re-sync everything
- [ ] Detect conflicts and prompt user

## P3: Advanced Features

### Multi-Cloud
- [ ] Support multiple buckets across different cloud providers
- [ ] Implement replication across providers
- [ ] Add failover logic

### Performance
- [ ] Add concurrent uploads to multiple buckets (backup)
- [ ] Add bandwidth limiting for uploads/downloads
- [ ] Cache bucket listings for faster operations

---

**Status**: S3, GCS, Google Drive exist; Azure/MinIO/local pending
**Next**: Test existing providers, implement Azure + local filesystem
