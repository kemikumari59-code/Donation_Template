document.addEventListener('DOMContentLoaded', () => {
const amtButtons = document.querySelectorAll('.amt-btn');
const customAmountInput = document.getElementById('customAmount');

const  cause = document.getElementById('cause').value;
if(cause ==="") {
  alert("Please choose a cause");
}
const  country = document.getElementById('Country').value;
if(country ==="") {
  alert("Please choose a country");
}

const Checkbox = document.getElementById('tax80g');
const taxFields = document.getElementById('taxFields');
 const tabs = document.querySelectorAll('.tab');
 // Handle Amount Selection
amtButtons.forEach(btn => {
btn.addEventListener('click', () => {
amtButtons.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
            
if (btn.classList.contains('custom-btn')) {
customAmountInput.focus();
} else {
customAmountInput.value = btn.getAttribute('data-amount');
}
});
});
// Handle Frequency Tabs
tabs.forEach(tab => {
tab.addEventListener('click', () => {
tabs.forEach(t => t.classList.remove('active'));
tab.classList.add('active');
});
}); 
// Toggle 80G Tax Fields
Checkbox.addEventListener('change', () => {
if (Checkbox.checked) {
taxFields.classList.remove('hidden');
} else {
 taxFields.classList.add('hidden');
}
});
    
// Form Submission
document.getElementById('donationForm').addEventListener('submit', (e) => {
e.preventDefault();
alert('Proceeding to payment gateway...');
});
});