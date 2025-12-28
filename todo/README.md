# Pydorky Feature Implementation Roadmap

This folder tracks features to implement, organized by priority and category.
Each file represents a feature area with actionable tasks.

## Priority Legend
- **P0**: Critical / blocking other work
- **P1**: High priority / near-term
- **P2**: Medium priority / planned
- **P3**: Nice-to-have / backlog

## Status Legend
- [ ] Not started
- [~] In progress
- [x] Completed

## Feature Areas
1. **Core Infrastructure** — HTTP service, CLI foundation, Node version alignment
2. **Storage Providers** — Cloud integrations (S3, GCS, Azure), BYOB support
3. **Compression & Formats** — gzip, lz4, brotli, Parquet conversions
4. **Python Client** — PyPI package, async/sync clients, CLI parity
5. **Metadata & Versioning** — Artifact versioning, conflict detection, time travel
6. **Performance & Concurrency** — Parallel uploads, streaming, incremental updates
7. **Security & Encryption** — Client-side encryption, KMS integration
8. **Developer Experience** — Docs, config, testing, error handling

## Key Milestones
- [ ] Phase 1: Core HTTP service + Node CLI (P0)
- [ ] Phase 2: Python client + storage providers (P0-P1)
- [ ] Phase 3: Compression + metadata versioning (P1-P2)
- [ ] Phase 4: Performance optimization (P2)
- [ ] Phase 5: Security & encryption (P2-P3)

---

**Last Updated**: 2025-12-28
**Status**: Roadmap created, ready for implementation
