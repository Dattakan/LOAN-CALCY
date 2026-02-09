// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  // debug
  console.log('Loan calculator script loaded');

  const calculateBtn = document.getElementById('calculateBtn');
  const amountInput = document.getElementById('amount');
  const interestInput = document.getElementById('interest');
  const termInput = document.getElementById('term');

  const monthlyPayment = document.getElementById('monthly');
  const totalPayment = document.getElementById('total');
  const totalInterestPayment = document.getElementById('totalInterest');

  if (!calculateBtn) return console.error('calculateBtn not found in DOM');

  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = progress * (end - start) + start;
      element.textContent = '$' + value.toFixed(2);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const annualRate = parseFloat(interestInput.value);
    const years = parseFloat(termInput.value);
    const monthlyRate = (isNaN(annualRate) ? NaN : annualRate / 100 / 12);
    const payments = isNaN(years) ? NaN : years * 12;

    if (isNaN(principal) || isNaN(monthlyRate) || isNaN(payments) || principal <= 0 || monthlyRate < 0 || payments <= 0) {
      alert('Please enter valid positive numbers for amount, interest, and years.');
      return;
    }

    let monthly;
    if (monthlyRate === 0) {
      monthly = principal / payments;
    } else {
      const x = Math.pow(1 + monthlyRate, payments);
      monthly = (principal * x * monthlyRate) / (x - 1);
    }

    if (!isFinite(monthly)) {
      alert('Please check your numbers and try again.');
      return;
    }

    const total = monthly * payments;
    const totalInterest = total - principal;

    const currentMonthly = parseFloat(monthlyPayment.textContent.replace(/[^0-9.-]+/g, '')) || 0;
    const currentTotal = parseFloat(totalPayment.textContent.replace(/[^0-9.-]+/g, '')) || 0;
    const currentInterest = parseFloat(totalInterestPayment.textContent.replace(/[^0-9.-]+/g, '')) || 0;

    animateValue(monthlyPayment, currentMonthly, monthly, 700);
    animateValue(totalPayment, currentTotal, total, 700);
    animateValue(totalInterestPayment, currentInterest, totalInterest, 700);
  }

  calculateBtn.addEventListener('click', calculateLoan);
});
// ...existing code...