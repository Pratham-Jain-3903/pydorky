# Performance & Concurrency

Parallel uploads, streaming, incremental updates, and caching for high performance.

## P1: Parallel Upload Support

### Worker Threads
- [ ] Use Node `worker_threads` for compression
- [ ] Spawn `2 * num_cores - 1` worker threads
- [ ] Queue files/chunks for compression
- [ ] Collect compressed chunks and upload

### Chunked Upload (Multipart)
- [ ] Split large files into chunks (e.g., 5MB each)
- [ ] Upload chunks in parallel
- [ ] Use cloud provider multipart APIs (S3 MultipartUpload, GCS resumable)
- [ ] Implement retry logic per chunk
- [ ] Reconstruct file on server side

### Progress Reporting
- [ ] Show upload progress (bytes/total, percentage)
- [ ] Display ETA based on current speed
- [ ] Update progress in real-time
- [ ] Support `--no-progress` flag

## P1: Streaming & Chunking Download

### Streaming Download
- [ ] Stream response directly to file (no buffering)
- [ ] Support range requests (`Range` header)
- [ ] Allow partial download resume on network error
- [ ] Show download progress with ETA

### Chunk-based Download
- [ ] For very large files, download in parallel chunks
- [ ] Use range requests to fetch chunks concurrently
- [ ] Reconstruct file from chunks in correct order
- [ ] Verify integrity per chunk

### Resume on Failure
- [ ] Store partially downloaded files
- [ ] Resume from last byte on retry
- [ ] Clean up stale partial downloads

## P2: Incremental / Delta Updates

### File Change Detection
- [ ] Compute file hash on upload and download
- [ ] Detect changes by comparing hashes
- [ ] Only upload changed files in batch operations

### Rsync-like Delta Sync
- [ ] Implement rolling hash algorithm (rsync)
- [ ] Compute delta between local and remote versions
- [ ] Upload only differences (not whole file)
- [ ] Reconstruct file on server side
- [ ] Add `--incremental` flag to upload

### Partial File Updates
- [ ] Support append-only updates (logs)
- [ ] Support range writes for binary files
- [ ] Track which ranges have been written
- [ ] Merge multiple partial writes

## P2: Caching

### Local Artifact Cache
- [ ] Cache downloaded artifacts in `~/.dorky/cache/`
- [ ] Use artifact ID as cache key
- [ ] Check cache before downloading
- [ ] Validate cache using content_hash from metadata

### Cache Invalidation
- [ ] Invalidate cache if remote file changes (hash mismatch)
- [ ] Support TTL-based expiration (configurable)
- [ ] Manual cache clear: `dorky cache clear`
- [ ] Cache statistics: `dorky cache stats`

### Metadata Caching
- [ ] Cache artifact metadata to avoid repeated GET requests
- [ ] Use `Last-Modified` / `ETag` headers for validation
- [ ] Respect `Cache-Control` headers from server

## P2: Connection Pooling & Optimization

### HTTP Session Reuse
- [ ] Reuse HTTP connections across operations
- [ ] Implement connection pool with size limit
- [ ] Keep-alive to reduce connection overhead
- [ ] Graceful shutdown of idle connections

### Request Batching
- [ ] Batch metadata queries in single request
- [ ] Use GraphQL-like query language for complex operations
- [ ] Reduce round-trips for multi-operation workflows

## P3: Advanced Performance

### Bandwidth Limiting
- [ ] Add `--bandwidth-limit=<bytes/sec>` flag
- [ ] Throttle uploads to prevent network saturation
- [ ] Support upload/download speed limits

### Priority Queue
- [ ] Prioritize recent/important files in batch uploads
- [ ] Support `--priority=<high|normal|low>` flag
- [ ] Pre-warm cache with priority files

### Load Balancing
- [ ] Support multiple server replicas
- [ ] Distribute uploads across replicas
- [ ] Health check and failover

## P3: Monitoring & Metrics

### Performance Metrics
- [ ] Track upload/download speed (bytes/sec)
- [ ] Record compression ratio and time
- [ ] Monitor worker thread utilization
- [ ] Add `--metrics` flag to capture timing data

### Diagnostics
- [ ] Log slow operations (threshold configurable)
- [ ] Report bottlenecks (network, CPU, disk)
- [ ] Add `dorky profile <command>` for profiling

---

**Status**: Streaming partially exists, parallel/chunking/caching pending
**Next**: Implement multipart/chunked upload, local caching, worker threads for compression
