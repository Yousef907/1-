async function sendData() {
    const input = document.getElementById('input1').value;
    const output = document.getElementById('output1');

    try {
        const response = await fetch('/api/openai-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: input }),
        });

        const data = await response.json();
        output.value = data.message;
    } catch (error) {
        console.error('Error:', error);
        output.value = 'Error in processing your request';
    }
}
