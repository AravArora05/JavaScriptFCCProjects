let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// Cash denominations and their values in the United States of America
const cashDenominations = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const currentCash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchase = document.getElementById("purchase-btn");

purchase.addEventListener("click", () => {
  let amountGiven = parseFloat(currentCash.value);
  const change = amountGiven - price;

  if (amountGiven < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (amountGiven === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  }
  calculateChange(change);
});

const calculateChange = (change) => {
  let totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
  let remainingChange = change;
  let changeArray = [];

  if (change > totalCid) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  for (let i = cid.length - 1; i >= 0; i--) {
    let [denomination, drawerAmount] = cid[i];
    let denominationValue = cashDenominations[denomination];
    let amountToReturn = 0;

    while (drawerAmount > 0 && remainingChange >= denominationValue) {
      amountToReturn = parseFloat((amountToReturn + denominationValue).toFixed(2));
      remainingChange = parseFloat((remainingChange - denominationValue).toFixed(2));
      drawerAmount = parseFloat((drawerAmount - denominationValue).toFixed(2));
    }

    if (amountToReturn > 0) {
      changeArray.push([denomination, amountToReturn]);
      cid[i][1] = drawerAmount;
    }
  }

  let remainingCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  if (remainingChange > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if (remainingCid === 0) {
    changeDue.innerText = "Status: CLOSED\n\n" + outputChange(changeArray);
  } else {
    changeDue.innerText = "Status: OPEN\n\n" + outputChange(changeArray);
  }
};

const outputChange = (changeArray) => {
  return changeArray.map(([denomination, amount]) => `${denomination}: $${amount}`).join("\n");
};

// Simplest way to find the necessary values
//Testing
calculateChange(2);
