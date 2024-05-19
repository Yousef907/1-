async function getAssistantResponse(prompt) {
  const response = await fetch('/api/openai-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  return data.response;
}

async function sendData() {
  const input = document.getElementById('input1').value;
  try {
    const response = await getAssistantResponse(input);
    document.getElementById('output1').value = response;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('output1').value = "An error occurred. Please try again.";
  }
}
