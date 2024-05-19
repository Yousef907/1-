const { getAssistantResponse } = require('../assistant');

module.exports = async (req, res) => {
    try {
        const { prompt } = req.body;
        const message = await getAssistantResponse(prompt);
        res.status(200).json({ message });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error calling OpenAI API' });
    }
};
