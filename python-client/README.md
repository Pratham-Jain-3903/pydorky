Dorky Python client

This is a minimal scaffold for the Dorky Python client. It implements a thin wrapper
around the Dorky HTTP API (see `openapi/openapi.yaml`).

Install (local editable):

```bash
pip install -e python-client
```

Usage example:

```python
from dorky_client import DorkyClient

client = DorkyClient('http://localhost:3000')
client.upload('path/to/file.txt', metadata={'note':'example'})
```
