# Grok Leadership Board v2

Public-evidence Grok-level board with optional **Sign in with X**, stacked rank vs visible builders **and** advanced-usage capacity, opt-in join, and an **encrypted authenticity certificate**.

Evolves the GLB operator console and the verified / unverified flow from [igor-holt/Check-Your-Score](https://github.com/igor-holt/Check-Your-Score).

## Hard rules (unchanged)

- No private token counts, SuperGrok internals, or hidden chat history.
- Missing xauth fields = `null`; continue.
- L8 only if `ops_evidence === true` **and** a public operational artifact (customers, payroll-equivalent, multi-week shipping log).
- Thin evidence lowers confidence; levels are not inflated.
- `vs_all_users` is always `unknown_private_volume`.

## Stacked rank

```
score = 0.30*build_surface + 0.25*agent_stack + 0.20*grok_loop_density
      + 0.15*originality + 0.10*continuity
```

Capacity envelope is the **public** advanced-usage ceiling (live grok.me + skills/A2A + continuity), not private quota. Gap = ceiling − score.

## Identity

1. **Sign in with X** — OAuth 2.0 PKCE. Browser never receives the access token if you deploy `worker.js`.
2. **Public claim** — paste an xauth packet or type `@handle` and Rank me.

Join board is explicit (Check-Your-Score pattern). Seed rows stay public.

## Certificate

`Issue certificate` builds:

- Canonical payload `gce.glb-cert.v1`
- SHA-256 digest + merkle leaf
- AES-256-GCM envelope keyed by a local passphrase (PBKDF2 120k)
- `onchain_anchor.hash` — post this digest only (Solana / ICP / EVM). No PII on-chain.

Verify by pasting the envelope + passphrase.

## Run

Open `index.html`. Optional:

```
X client_id   → developer.x.com public client, PKCE
token worker  → wrangler deploy worker.js
```

Redirect URI must match the page origin.

## ORCID

`0009-0008-8389-1297`
