async function getAssistantResponse(prompt) {
  const response = await fetch('https://api.openai.com/v1/assistants/asst_jBQl5a13CBIVdDyqjN2JGbQj/invoke', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // استخدام مفتاح API المخزن في Vercel
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
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
