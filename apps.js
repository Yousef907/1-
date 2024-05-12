function sendData() {
    var input1 = document.getElementById('input1').value;
    var output = document.getElementById('output1');

    fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY' // استبدل YOUR_API_KEY بمفتاح API الخاص بك
        },
        body: JSON.stringify({
            prompt: input1,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        output.value = data.choices[0].text; // تحديث مربع النتائج بناءً على البيانات الواردة
    })
    .catch(error => {
        console.error('Error:', error);
        output.value = "Error in processing your request";
    });
}
