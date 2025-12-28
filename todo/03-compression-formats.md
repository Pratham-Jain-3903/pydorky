# Compression & Data Formats

Compress artifacts during upload and support data format conversions (CSV to Parquet, etc.).

## P1: Core Compression

### Gzip
- [ ] Implement gzip compression in upload flow
- [ ] Store `Content-Encoding: gzip` in metadata
- [ ] Auto-decompress on download
- [ ] Add `--compress=gzip` CLI flag
- [ ] Add compression level configuration (1-9)

### LZ4 (Fast Compression)
- [ ] Add LZ4 compression support (faster than gzip)
- [ ] Store compression type in metadata
- [ ] Add `--compress=lz4` CLI flag
- [ ] Test performance vs gzip

### Brotli
- [ ] Add Brotli compression support (better ratio)
- [ ] Add `--compress=brotli` CLI flag
- [ ] Test performance vs gzip/lz4

### Decompression on Download
- [ ] Auto-detect compression from metadata
- [ ] Decompress transparently during download
- [ ] Support partial decompression (streaming)
- [ ] Add `--no-decompress` flag to keep compressed

## P1: Compression Configuration

### Project-Level Config
- [ ] Add compression preference in `.dorkyrc`
- [ ] Support per-file pattern compression (e.g., `*.json` → gzip)
- [ ] Add `dorky config compression` command

### Metadata Tracking
- [ ] Store `compression_type` in metadata
- [ ] Store `compressed_size` alongside `file_size`
- [ ] Store `compression_ratio` for reporting
- [ ] Add `--show-compression` flag to display stats

## P2: Data Format Conversions

### CSV to Parquet
- [ ] Create Python worker service for conversions
- [ ] Implement CSV → Parquet conversion
- [ ] Infer schema from CSV headers
- [ ] Support schema config file (JSON)
- [ ] Add `dorky convert csv-to-parquet <input> <output>` command

### JSON Compression
- [ ] Minify JSON before compression
- [ ] Remove whitespace and comments
- [ ] Add `--minify-json` flag
- [ ] Store original schema separately for reconstruction

### Format Detection
- [ ] Auto-detect file type on upload (.json, .csv, .parquet, etc.)
- [ ] Suggest optimal compression based on file type
- [ ] Add `--format` hint flag for ambiguous files

## P2: Data Quality & Validation

### Integrity Checking
- [ ] Store SHA256 hash of original file in metadata
- [ ] Verify hash on download before decompression
- [ ] Add `--verify` flag for integrity check
- [ ] Report any corrupted files

### Schema Validation
- [ ] Optional schema validation for structured formats
- [ ] Store schema in `.dorkyschema` or metadata
- [ ] Validate before uploading
- [ ] Warn on schema changes

## P3: Advanced Conversions

### Other Formats
- [ ] Parquet → Arrow IPC
- [ ] JSON → MessagePack
- [ ] Binary format conversions
- [ ] Add `dorky convert list` to show available conversions

### Streaming Conversions
- [ ] Stream large CSV → Parquet without buffering
- [ ] Support incremental conversions
- [ ] Allow on-demand conversion (download → convert → return)

---

**Status**: Compression infrastructure pending, format conversions planned
**Next**: Implement gzip/lz4, add compression config, create Python conversion service
