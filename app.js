async function sendData() {
    const input1 = document.getElementById('input1').value;
    const output = document.getElementById('output1');
    output.value = 'Processing your request...';

    try {
        const response = await fetch('/api/openai-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: input1 })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.content) {
                output.value = data.content;
            } else {
                output.value = "No response text received";
            }
        } else {
            output.value = 'Error in processing your request.';
        }
    } catch (error) {
        console.error('Error:', error);
        output.value = 'Error in connecting to the API.';
    }
}
