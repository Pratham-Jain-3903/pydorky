# Pydorky — Practical artifact storage for teams

Introduction

This repository is Pydorky, a Python-first client and ecosystem built around a small language-agnostic artifact service. Pydorky was inspired by the original `dorky` tool — originally authored by Trishant Pahwa — and extends the idea with data-focused features and a Python client optimized for data teams. The original project provided the foundation; this fork focuses the design on reliability, data ergonomics, and reproducible sharing.

Vision

Teams should never lose important artifacts in chat threads, ad-hoc paste tools, or personal drives. Pydorky offers a reproducible, privacy-aware, and developer-friendly way to store project artifacts (secrets, environment files, small datasets, and binaries) in user-controlled storage (S3, GCS, etc.).

Why we built this

I grew tired of important artifacts being scattered across chat apps (Teams, Slack), quick paste services (sharetext.io), and personal drives. That pattern causes lost context, duplicate uploads, and potential leaks. Pydorky provides a minimal, auditable, and automated alternative that:

- keeps artifacts out of VCS while enabling reproducible sharing
- integrates with existing cloud storage and IAM controls
- provides lightweight metadata, idempotency, and streaming-friendly APIs
- offers a Python client for data teams (Parquet/pyarrow integration) and thin clients for other languages

Approach

Keep the service small and language-agnostic. Implement a canonical HTTP service for storage semantics (streaming upload/download, idempotency keys, metadata, hierarchical sync). Language clients — Python and Node — remain thin translators that implement ergonomic workflows (`commit`, `stage`, `push`). Heavy data-format work (Parquet conversions, large-table transforms) is handled by optional Python tools or sidecar converters.

Quick start

Install the Python client (local editable):

```bash
pip install -e python-client
```

Run a local stub service during development:

```bash
cd server
npm install
npm start
```

Upload with the Python client:

```python
from dorky_client import DorkyClient
client = DorkyClient('http://localhost:3000')
client.upload('path/to/file', metadata={'note':'example'})
```

Where to look next

Implementation notes and design rationale: see `docs/` (architecture, migration plan, Python client notes).

Acknowledgements

This project builds on and refines the ideas in the original `dorky` project. See `docs/` for more on differences and the migration path.

Node (npm) users — CLI and legacy usage

We continue to support the original Node/npm CLI workflows so JavaScript and Ops users can keep using the familiar commands.

Install the CLI globally:

```bash
npm install -g dorky
```

Quick CLI commands (same workflow as before):

- Initialize for AWS S3: `dorky --init aws`
- Initialize for Google Drive: `dorky --init google-drive`
- List files: `dorky --list` (respects `.dorkyignore`)
- Add to stage: `dorky --add <file>`
- Remove from stage: `dorky --rm <file>`
- Push staged files: `dorky --push`
- Pull files from remote: `dorky --pull`

AWS S3 notes

1. Create an S3 bucket and configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in your environment.
2. Use `dorky --init aws` to set up local metadata and `.dorkyignore`.
3. Use `dorky --add`, `dorky --push`, `dorky --pull` as your normal workflow.

Google Drive notes

1. Use `dorky --init google-drive` and follow the OAuth setup instructions.
2. Use the same `--add`, `--push`, `--pull` flow as above.

Developer & compatibility notes

- The repo contains both the Node CLI and a Python client. The canonical storage semantics are provided by a small HTTP service; clients are thin translators.
- Current Node compatibility: project targets Node 16 (`.nvmrc` + `engines.node`), with a planned migration to Node 20. See `docs/doc#3 the-correct-node-version`.
- Python users: see `python-client/` for the PyPI-ready client scaffold and `docs/doc#2.5 python-port` for design notes.



