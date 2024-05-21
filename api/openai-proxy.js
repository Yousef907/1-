const axios = require('axios');

async function handler(req, res) {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            `https://api.openai.com/v1/assistants/${process.env.YOUR_ASSISTANT_ID}/invoke`,
            {
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 100
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the response from OpenAI.' });
    }
}

module.exports = handler;
