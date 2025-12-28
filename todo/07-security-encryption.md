# Security & Encryption

Client-side encryption, key management, and secure authentication.

## P1: Client-Side Encryption at Rest

### AES-256 Encryption
- [ ] Implement AES-256-GCM encryption
- [ ] Use `crypto` module in Node.js
- [ ] Support encryption in Python with `cryptography`
- [ ] Encrypt before upload, decrypt after download

### Key Management (User-Provided)
- [ ] Allow user to provide encryption key (password or raw key)
- [ ] Derive key from password using PBKDF2 (cost factor 100k+)
- [ ] Store key securely (not in config, in key ring)
- [ ] Add `--encrypt-key <path>` flag to CLI

### Encryption Metadata
- [ ] Store encryption algorithm and parameters in metadata
- [ ] Store salt for key derivation
- [ ] Store IV for GCM in metadata (safe to store)
- [ ] Prevent accidental download without decryption

### CLI Support
- [ ] Add `--encrypt` flag to upload command
- [ ] Add `--decrypt` flag to download command
- [ ] Prompt for password if not provided
- [ ] Support keychain integration (macOS Keychain, Windows Credential Manager)

## P1: Selective File Encryption

### Pattern-Based Encryption
- [ ] Create `.dorkyencrypt` file (like `.gitignore`)
- [ ] Support patterns: `*.key`, `secrets/*`, `*.pem`, etc.
- [ ] Encrypt matching files automatically on upload
- [ ] Decrypt on download transparently

### Obfuscation Mode (Optional)
- [ ] Implement faster obfuscation (XOR, Base64) for non-sensitive data
- [ ] Use `--obfuscate` flag (less secure, faster)
- [ ] Document security limitations clearly

## P2: KMS Integration

### AWS KMS
- [ ] Use AWS KMS for key management
- [ ] Generate data keys from KMS master key
- [ ] Encrypt/decrypt using AWS SDK
- [ ] Support assume role for cross-account KMS
- [ ] Add `--kms-key-id=<arn>` flag

### Google Cloud KMS
- [ ] Use Google Cloud KMS
- [ ] Similar flow to AWS KMS
- [ ] Support project ID and key ring configuration
- [ ] Add `--gcp-kms-key=<resource-name>` flag

### Azure Key Vault
- [ ] Use Azure Key Vault for key management
- [ ] Support managed identity authentication
- [ ] Add `--azure-key-vault-url=<url>` flag

### KMS Metadata
- [ ] Store which KMS was used in metadata
- [ ] Store wrapped key in metadata
- [ ] Support key rotation with rekeying

## P2: Authentication & Authorization

### API Key Support
- [ ] Generate API keys for programmatic access
- [ ] Hash keys server-side (not plaintext)
- [ ] Support key expiration and rotation
- [ ] Add `dorky auth generate-key` command

### JWT Tokens
- [ ] Support JWT tokens for authentication
- [ ] Issue tokens with short TTL (1 hour)
- [ ] Refresh tokens for longer sessions
- [ ] Add claims for user ID, project, scopes

### Role-Based Access Control (RBAC)
- [ ] Define roles: admin, writer, reader
- [ ] Enforce at API level (who can upload, delete, etc.)
- [ ] Support resource-level permissions (bucket, artifact, folder)
- [ ] Audit role changes

## P3: Advanced Security

### Public Key Cryptography
- [ ] Support RSA or ECDH for key agreement
- [ ] Allow sharing encrypted files with specific users
- [ ] Implement key exchange protocol

### Multi-User Encryption
- [ ] Encrypt file once, share with multiple users
- [ ] Each user has encrypted copy of data key
- [ ] Support adding/removing users from access list

### Compliance Features
- [ ] Support FIPS 140-2 mode (restricted algorithms)
- [ ] Audit all encryption operations
- [ ] Log key access and rotation

### Secret Rotation
- [ ] Auto-rotate encryption keys on schedule
- [ ] Re-encrypt existing files with new key
- [ ] Track which key was used for each file

---

**Status**: Encryption design ready, implementation pending
**Next**: Implement AES-256-GCM, user key management, selective encryption patterns
