async function getAssistantResponse(prompt) {
    const response = await fetch('/api/openai-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response;
}

window.sendData = async function() {
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
