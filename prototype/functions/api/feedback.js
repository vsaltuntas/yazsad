// Cloudflare Pages Function — receives feedback POSTs
// Deploy: this runs automatically at POST /api/feedback when you enable Functions
// on your Cloudflare Pages project.
//
// Optional env vars (set in Cloudflare dashboard → Settings → Environment variables):
//   FEEDBACK_WEBHOOK  — Slack/Discord webhook URL to forward feedback to
//   FEEDBACK_KV       — KV binding name for persistence (optional)

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Basic shape validation
  const { rating, category, message, email } = payload || {};
  if (typeof message !== 'string' || message.trim().length < 3) {
    return new Response(JSON.stringify({ error: 'message_required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const record = {
    ts: new Date().toISOString(),
    rating: Number(rating) || 0,
    category: String(category || 'genel').slice(0, 40),
    message: String(message).slice(0, 4000),
    email: email ? String(email).slice(0, 200) : null,
    ua: request.headers.get('user-agent') || '',
    ref: 'FB-' + Math.random().toString(36).toUpperCase().slice(-6),
  };

  // Forward to Slack/Discord webhook if configured
  if (env.FEEDBACK_WEBHOOK) {
    try {
      await fetch(env.FEEDBACK_WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: `🔔 YAZSAD feedback · ${record.ref}\n★${record.rating} · ${record.category}\n${record.message}\n${record.email ? '↩ ' + record.email : 'anonim'}`,
        }),
      });
    } catch (e) {
      // Don't fail the user's request if webhook is down
      console.error('webhook failed', e);
    }
  }

  // Persist to KV if bound
  if (env.FEEDBACK_KV) {
    try {
      const key = `fb-${Date.now()}-${record.ref}`;
      await env.FEEDBACK_KV.put(key, JSON.stringify(record));
    } catch (e) {
      console.error('kv failed', e);
    }
  }

  return new Response(JSON.stringify({ ok: true, ref: record.ref }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  });
}
