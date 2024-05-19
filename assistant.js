// assistant.js
const axios = require('axios');

async function getAssistantResponse(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/assistants/asst_jBQl5a13CBIVdDyqjN2JGbQj/invoke', // استخدام معرف المساعد الخاص بك هنا
    {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100
    },
    {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`, // استخدام مفتاح API الصحيح هنا
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { getAssistantResponse };
