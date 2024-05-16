const https = require('https');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { prompt } = req.body;

    const data = JSON.stringify({
        prompt: prompt,
        max_tokens: 150
    });

    const options = {
        hostname: 'api.openai.com',
        path: '/v1/engines/text-davinci-002/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // استخدم المتغير البيئي لمفتاح API
        }
    };

    const proxyRequest = https.request(options, (proxyRes) => {
        let body = '';
        proxyRes.on('data', (chunk) => {
            body += chunk;
        });

        proxyRes.on('end', () => {
            res.status(200).json(JSON.parse(body));
        });
    });

    proxyRequest.on('error', (e) => {
        res.status(500).json({ error: 'Error in connecting to the API: ' + e.message });
    });

    proxyRequest.write(data);
    proxyRequest.end();
}
