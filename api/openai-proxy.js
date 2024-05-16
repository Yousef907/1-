const https = require('https');

exports.handler = async (event) => {
    const prompt = JSON.parse(event.body).prompt;

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
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: body
                });
            });
        });

        req.on('error', (e) => {
            reject({
                statusCode: 500,
                body: 'Error: ' + e.message
            });
        });

        req.write(data);
        req.end();
    });
};
