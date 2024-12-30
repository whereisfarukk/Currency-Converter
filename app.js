import { countryList } from './codes.js';

const BASE_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/';
const fromDropdown = document.getElementById('fromCurrency');
const toDropdown = document.getElementById('toCurrency');
function changeFlag(fromFlag, toFlag) {
  const flagFrom = document.getElementById('flagFrom');
  const flagTo = document.getElementById('flagTo');

  flagFrom.src = `https://flagsapi.com/${countryList[fromFlag]}/flat/64.png`;
  flagTo.src = `https://flagsapi.com/${countryList[toFlag]}/flat/64.png`;
}

function populateDropdowns() {
  for (const currencyCode in countryList) {
    const fromOption = document.createElement('option');
    const toOption = document.createElement('option');

    fromOption.value = currencyCode;
    fromOption.textContent = currencyCode; // Only add the currency code
    toOption.value = currencyCode;
    toOption.textContent = currencyCode;

    fromDropdown.appendChild(fromOption);
    toDropdown.appendChild(toOption);
  }
  changeFlag(fromDropdown.value, toDropdown.value); //initial convertion show AED to AED

  fromDropdown.addEventListener('change', () => {
    // console.log("From currency changed to:", fromDropdown.value);
    changeFlag(fromDropdown.value, toDropdown.value);
  });

  toDropdown.addEventListener('change', () => {
    changeFlag(fromDropdown.value, toDropdown.value);
  });
}
populateDropdowns();

// ---------------------------------------------------------------------------------- //

export async function convertCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const result = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    document.getElementById('result').textContent =
      'Please enter a valid amount.';
    return;
  }
  const curURL = `${BASE_URL}${fromCurrency.toLowerCase()}.json`;
  const response = await fetch(curURL);
  const data = await response.json();
  const convertionRate =
    data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
  const convertedAmount = (amount * convertionRate).toFixed(3);
  result.textContent = `${amount}  ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}
