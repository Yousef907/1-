async function getAssistantResponse(prompt) {
    const response = await axios.post('/api/openai-proxy', {
        prompt: prompt
    });

    return response.data.response;
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
