document.getElementById('check-btn').addEventListener('click', palindromeChecker);

function palindromeChecker() {
    const inputText = document.getElementById('text-input').value;
    if (!inputText) {
        alert("Please input a value");
        return;
    }

   
    const resultText = isPalindrome(inputText) ? `${inputText} is a palindrome` : `${inputText} is not a palindrome`;

    const result = document.getElementById('result');
    result.textContent = resultText;
    /**
     * I was wondering if I should make it an animation and make it bigger, but may try that in a later update
     */
    result.style.color = isPalindrome(inputText) ? "green" : "red";
}

function isPalindrome(text) {
    const cleaned = text.replace(/[\W_]/g, '');
    const lowered = cleaned.toLowerCase();
    const reversed = lowered.split('').reverse().join('');
    return lowered === reversed;
}
