const axios = require('axios');

async function getAssistantResponse(prompt) {
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

    return response.data.choices[0].message.content;
}

module.exports = { getAssistantResponse };
