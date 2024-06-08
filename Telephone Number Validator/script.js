/**
 * Kind of just followeed a similar format as the last porject, nothing crazy but tried to focus on just the Regex aspect
 * 
 * Still find it a bit confusing
 */
document.getElementById s('check-btn').addEventListener('click', function() {
    const phoneNumber = document.getElementById('user-input').value;
    if (!phoneNumber) {
        alert('Please provide a phone number');
    /**
     * Was failing this before
     Seems to be that a console.error() is a bit different in JS terms than having an alert
     */
        return;
    }

    const isValid = validatePhoneNumber(phoneNumber);
    const resultDiv = document.getElementById('results-div');
    resultDiv.textContent = isValid ? `Valid US number: ${phoneNumber}` : `Invalid US number: ${phoneNumber}`;
    resultDiv.style.color = isValid ? 'green' : 'red';
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').textContent = '';
});

function validatePhoneNumber(number) {
    const validPatterns = [
        /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
        /^1?\s?\d{3}-\d{3}-\d{4}$/,
        /^1?\s?\d{10}$/,
        /^\(\d{3}\)\d{3}-\d{4}$/,
        /^1?\s?\d{3}\s\d{3}\s\d{4}$/,
        /^1?\s?\d{3}\s?\d{3}\s?\d{4}$/
    ];
    return validPatterns.some(pattern => pattern.test(number));
}
