function sendData() {
    var input1 = document.getElementById('input1').value;
    var output = document.getElementById('output1');

    fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-phGCerhz72VubXi1CbysT3BlbkFJD4rXynRJ9V7cX0MO7s8q'  // تم استبدال YOUR_API_KEY بمفتاحك
        },
        body: JSON.stringify({
            prompt: input1,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.choices && data.choices.length > 0) {
            output.value = data.choices[0].text;
        } else {
            output.value = "No response text received";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        output.value = "Error in processing your request";
    });
}
