export default async function handler(req, res) {
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

const { prompt, maxTokens = 1000, system = "" } = req.body;

if (!prompt) return res.status(400).json({ error: 'Prompt required' });

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

try {
const body = {
model: 'claude-haiku-4-5-20251001',
max_tokens: Math.min(maxTokens, 4000),
messages: [{ role: 'user', content: prompt }],
};

if (system && system.trim().length > 0) {
body.system = system;
}

const response = await fetch('https://api.anthropic.com/v1/messages', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-api-key': apiKey,
'anthropic-version': '2023-06-01',
},
body: JSON.stringify(body),
});

const data = await response.json();

if (!response.ok) {
return res.status(response.status).json({ error: data.error?.message || 'API error' });
}

const text = data.content?.[0]?.text || '';
return res.status(200).json({ text });

} catch (err) {
return res.status(500).json({ error: err.message });
}
}
