const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/openai-proxy', async (req, res) => {
    console.log('Received request:', req.body);
    try {
        const { prompt } = req.body;
        if (!prompt) {
            throw new Error('Prompt is missing in the request body.');
        }
        console.log('Sending prompt to OpenAI:', prompt);
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
        });
        console.log('Received response from OpenAI:', response.data);
        res.json({ text: response.data.choices[0].text });
    } catch (error) {
        console.error('Error in processing request:', error.message);
        console.error('Full error details:', error); // تسجيل تفاصيل الخطأ الكاملة
        res.status(500).json({ error: `Error in processing your request: ${error.message}` });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
