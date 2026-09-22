/**
 * GLB X OAuth token worker — Cloudflare Worker.
 * Keeps client_secret off the browser. Returns public X user fields only.
 *
 * Bind secrets:
 *   X_CLIENT_ID
 *   X_CLIENT_SECRET
 *
 * Route example: https://auth.genesisconductor.io/x-oauth
 */
export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: cors(req) });
    }
    if (req.method !== "POST") {
      return json({ error: "POST only" }, 405, req);
    }
    let body;
    try { body = await req.json(); } catch { return json({ error: "invalid json" }, 400, req); }
    const { code, code_verifier, redirect_uri, client_id } = body || {};
    if (!code || !code_verifier || !redirect_uri) {
      return json({ error: "code, code_verifier, redirect_uri required" }, 400, req);
    }
    const id = env.X_CLIENT_ID || client_id;
    const secret = env.X_CLIENT_SECRET || "";
    const basic = btoa(`${id}:${secret}`);
    const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Basic ${basic}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        code_verifier,
        client_id: id,
      }),
    });
    const token = await tokenRes.json();
    if (!token.access_token) {
      return json({ error: "token_exchange_failed", detail: token }, 401, req);
    }
    const meRes = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=id,name,username,verified,description,created_at,public_metrics,url,entities",
      { headers: { authorization: `Bearer ${token.access_token}` } },
    );
    const me = await meRes.json();
    return json({
      user: me.data || null,
      scope: token.scope || null,
      token_type: "bearer",
      landauer_note: "public-evidence only; access token is not returned to the page",
    }, 200, req);
  },
};

function cors(req) {
  const origin = req.headers.get("Origin") || "*";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST,OPTIONS",
  };
}
function json(obj, status, req) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...cors(req) },
  });
}
