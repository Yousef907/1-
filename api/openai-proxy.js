const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: "Prompt is required" });
    return;
  }

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003-turbo",
      prompt: prompt,
      max_tokens: 50,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ message: "Error calling OpenAI API" });
  }
};
