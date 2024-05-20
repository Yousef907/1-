async function sendData() {
    const prompt = document.getElementById('input1').value;
    const response = await fetch('/api/openai-proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();
    document.getElementById('output1').value = data.response;
}
