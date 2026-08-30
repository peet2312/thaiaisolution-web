// tunnel-keepalive.mjs - Keeps public HTTPS tunnel connected and auto-updates LINE Webhook
import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';

// Read Token from .env
let LINE_ACCESS_TOKEN = 'yP1CscBeAmqnLS17FQlt4in3Oq3QzRtMZCSGedFrneSyZ0+tDFwNTHwPTuQi6mr4VbDfaEqBExYTV2TUM5d97UaEbKg1/XI04/guVk81I6P9HILfdml5bCEMdSDrP+VULWf3nB3tyUBAf/YcSxTEAgdB04t89/1O/w1cDnyilFU=';

if (existsSync('.env')) {
  const envContent = readFileSync('.env', 'utf8');
  const match = envContent.match(/LINE_CHANNEL_ACCESS_TOKEN=([^\r\n]+)/);
  if (match && match[1]) {
    LINE_ACCESS_TOKEN = match[1].trim();
  }
}

async function updateLineWebhook(endpoint) {
  try {
    console.log(`[LINE Sync] Updating Webhook to ${endpoint}...`);
    const res = await fetch('https://api.line.me/v2/bot/channel/webhook/endpoint', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ endpoint })
    });
    if (res.ok) {
      console.log(`[LINE Sync] ✅ Webhook updated successfully! Status: ${res.status}`);
      // Test endpoint
      const testRes = await fetch('https://api.line.me/v2/bot/channel/webhook/test', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endpoint })
      }).then(r => r.json());
      console.log('[LINE Sync] Test Result:', testRes.success ? '✅ Verified (200 OK)' : testRes);
    } else {
      console.error(`[LINE Sync] ❌ Failed to update webhook. Status: ${res.status}`);
    }
  } catch (err) {
    console.error('[LINE Sync] Error:', err.message);
  }
}

function startTunnel() {
  console.log('[Tunnel] Starting secure SSH tunnel to localhost.run...');
  const ssh = spawn('ssh', [
    '-R', '80:localhost:3000',
    '-o', 'ServerAliveInterval=30',
    '-o', 'ServerAliveCountMax=3',
    '-o', 'StrictHostKeyChecking=no',
    'nokey@localhost.run'
  ]);

  let currentUrl = null;

  ssh.stdout.on('data', (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/([a-zA-Z0-9.-]+\.lhr\.life)/);
    if (match) {
      const url = match[0];
      if (url !== currentUrl) {
        currentUrl = url;
        const webhookUrl = `${url}/api/line-webhook`;
        console.log(`\n========================================`);
        console.log(`🌐 Public Tunnel URL: ${url}`);
        console.log(`📲 LINE Webhook URL: ${webhookUrl}`);
        console.log(`========================================\n`);
        updateLineWebhook(webhookUrl);
      }
    }
  });

  ssh.stderr.on('data', (data) => {
    // ignore pseudo-terminal messages
  });

  ssh.on('close', (code) => {
    console.log(`[Tunnel] SSH process exited with code ${code}. Reconnecting in 5s...`);
    setTimeout(startTunnel, 5000);
  });
}

startTunnel();
