const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/openai-proxy', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
        });
        res.json({ text: response.data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in processing your request.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
