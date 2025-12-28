import os
import requests
from typing import Optional, Dict

CHUNK_SIZE = 1024 * 64

class DorkyClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')

    def upload(self, file_path: str, metadata: Optional[Dict]=None, idempotency_key: Optional[str]=None):
        url = f"{self.base_url}/artifacts"
        files = {'file': open(file_path, 'rb')}
        data = {}
        if metadata:
            data['metadata'] = requests.utils.requote_uri(str(metadata))
        if idempotency_key:
            data['idempotency_key'] = idempotency_key
        resp = requests.post(url, files=files, data=data)
        resp.raise_for_status()
        return resp.json()

    def download(self, artifact_id: str, dest_path: str):
        url = f"{self.base_url}/artifacts/{artifact_id}"
        with requests.get(url, stream=True) as r:
            r.raise_for_status()
            os.makedirs(os.path.dirname(dest_path) or '.', exist_ok=True)
            with open(dest_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=CHUNK_SIZE):
                    if chunk:
                        f.write(chunk)
        return dest_path
