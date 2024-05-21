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

async function sendData() {
    const input1 = document.getElementById('input1').value;
    const output1 = document.getElementById('output1');

    try {
        const assistantResponse = await getAssistantResponse(input1);
        output1.value = assistantResponse;
    } catch (error) {
        console.error('Error:', error);
        output1.value = 'An error occurred. Please try again.';
    }
}

module.exports = { getAssistantResponse };
