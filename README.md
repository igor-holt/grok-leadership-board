# Grok Leadership Board v2

Visitor does one thing: **Continue with X**.

After that the page, not the visitor:

1. Completes X OAuth 2.0 PKCE
2. Reads only public X profile fields (bio, urls, handle, id)
3. Stack-ranks against visible builders and the public advanced-usage ceiling
4. Seals an AES-GCM authenticity digest on-device (no passphrase)
5. Drops a **verified** row on the public board

Private Grok usage is never read. `vs_all_users` stays `unknown_private_volume`. L8 still needs `ops_evidence` plus a public operational artifact.

## Operator once

- X app at developer.x.com (PKCE public client)
- Deploy `worker.js` so the browser never sees the access token
- Set `client_id` once; visitors never touch it

## Files

- `index.html` — gate + board
- `worker.js` — token exchange
- `gce.glb-cert.v1.json` — certificate schema

ORCID `0009-0008-8389-1297`
