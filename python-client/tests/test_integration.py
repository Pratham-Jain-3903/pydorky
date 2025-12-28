import os
import tempfile

from dorky_client import DorkyClient


def test_upload_and_download(tmp_path):
    client = DorkyClient('http://localhost:3000')

    src = tmp_path / 'hello.txt'
    src.write_bytes(b'hello-pydorky')

    resp = client.upload(str(src), metadata={'test': 'integration'})
    assert 'id' in resp
    artifact_id = resp['id']

    dest = tmp_path / 'out.txt'
    client.download(artifact_id, str(dest))
    assert dest.exists()
    assert dest.read_bytes() == b'hello-pydorky'
