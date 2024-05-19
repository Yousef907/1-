const axios = require('axios');

async function getAssistantResponse(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/assistants/asst_jBQl5a13CBIVdDyqjN2JGbQj/invoke',
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

module.exports = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getAssistantResponse(prompt);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
};
