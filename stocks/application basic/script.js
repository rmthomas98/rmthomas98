"use-strict";

const apiKey = "2664b4bd6aea5baf4a79a8fdef78acdc";
const searchBar = document.querySelector(".search-bar");

//INITIALIZATION//
searchBar.addEventListener("keydown", (e) => {
  if (searchBar.value === "") return;
  if (e.key === "Enter") {
    const stock = searchBar.value.toUpperCase();
    init(stock);
    searchBar.value = "";
    searchBar.blur();
  }
});

document.querySelector(".fa-search").addEventListener("click", () => {
  if (searchBar.value === "") return;
  const stock = searchBar.value.toUpperCase();
  init(stock);
  searchBar.value = "";
  searchBar.blur();
});

function init(stock) {
  moreStats(stock);
  basicInfo(stock);
  stockStats(stock);
  getincomeStatement(stock);
  getBalanceSheet(stock);
  getWorkingCapital(stock);
}

//STOCK STATISTICS SECTION//

//fetch short float, insider ownership, institutional ownership
async function moreStats(stock) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=Z2TMRUER31RS62WE`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displayMoreStats(response);
}

//fetch ticker, exchange, company name, sector, industry, country, market cap
async function basicInfo(stock) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${stock}?apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displaybasicInfo(response[0]);
}

//fetch outstanding shares and float
async function stockStats(stock) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v4/shares_float?symbol=${stock}&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displayStockStats(response[0]);
}

//format market cap to display
function formatNums(data) {
  let dataString = data.toString();
  const dataStringLength = dataString.length;
  let formattedNum;
  if (dataStringLength === 7) {
    formattedNum = dataString.slice(0, 3).split("");
    formattedNum.splice(1, 0, ".");
    formattedNum = formattedNum.join("") + "M";
  } else if (dataStringLength === 8) {
    formattedNum = dataString.slice(0, 4).split("");
    formattedNum.splice(2, 0, ".");
    formattedNum = formattedNum.join("") + "M";
  } else if (dataStringLength === 9) {
    formattedNum = dataString.slice(0, 5).split("");
    formattedNum.splice(3, 0, ".");
    formattedNum = formattedNum.join("") + "M";
  } else if (dataStringLength === 10) {
    formattedNum = dataString.slice(0, 3).split("");
    formattedNum.splice(1, 0, ".");
    formattedNum = formattedNum.join("") + "B";
  } else if (dataStringLength === 11) {
    formattedNum = dataString.slice(0, 4).split("");
    formattedNum.splice(2, 0, ".");
    formattedNum = formattedNum.join("") + "B";
  } else if (dataStringLength === 12) {
    formattedNum = dataString.slice(0, 5).split("");
    formattedNum.splice(3, 0, ".");
    formattedNum = formattedNum.join("") + "B";
  } else if (dataStringLength === 13) {
    formattedNum = dataString.slice(0, 3).split("");
    formattedNum.splice(1, 0, ".");
    formattedNum = formattedNum.join("") + "T";
  } else {
    formattedNum = "N/A";
  }
  return formattedNum;
}

//display basic company info
function displaybasicInfo(response) {
  if (!response) {
    document.querySelector(".pop-up-error").classList.add("fade");
    setTimeout(function () {
      document.querySelector(".pop-up-error").classList.remove("fade");
    }, 2000);
    document.querySelector(".ticker").textContent = "-";
    document.querySelector(".exchange").textContent = "-";
    document.querySelector(".company").textContent = "-";
    document.querySelector(".sector").textContent = "-";
    document.querySelector(".industry").textContent = "-";
    document.querySelector(".country").textContent = "-";
    document.querySelector(".market-cap").textContent = "-";
  } else {
    const {
      symbol,
      exchangeShortName,
      companyName,
      sector,
      industry,
      country,
      mktCap,
    } = response;
    //converting market cap
    marketCap = formatNums(mktCap);
    //displaying info to page
    document.querySelector(".ticker").textContent = symbol;
    document.querySelector(".exchange").textContent = exchangeShortName;
    document.querySelector(".company").textContent = companyName;
    document.querySelector(".sector").textContent = sector;
    document.querySelector(".industry").textContent = industry;
    document.querySelector(".country").textContent = country;
    document.querySelector(".market-cap").textContent = `$${marketCap}`;
  }
}

//display shares outstanding and float
function displayStockStats(response) {
  if (!response) {
    document.querySelector(".float").textContent = "-";
    document.querySelector(".shares-outstanding").textContent = "-";
  } else {
    const { floatShares: float, outstandingShares } = response;
    const formattedFloat = formatNums(float);
    const formattedOutstandingShares = formatNums(outstandingShares);

    document.querySelector(".float").textContent = formattedFloat;
    document.querySelector(".shares-outstanding").textContent =
      formattedOutstandingShares;
  }
}

//display short float, insider ownership, institutional ownership
function displayMoreStats(response) {
  console.log(response);
  if (Object.keys(response).length === 0) {
    document.querySelector(".short-float").textContent = `-`;
    document.querySelector(".insider").textContent = `-`;
    document.querySelector(".institution").textContent = `-`;
  } else {
    const {
      PercentInsiders: insiders,
      PercentInstitutions: institutions,
      ShortPercentFloat: shortFloat,
    } = response;

    document.querySelector(".short-float").textContent = `${(
      Number(shortFloat) * 100
    ).toFixed(2)}%`;
    document.querySelector(".insider").textContent = `${Number(
      insiders
    ).toFixed(2)}%`;
    document.querySelector(".institution").textContent = `${Number(
      institutions
    ).toFixed(2)}%`;
  }
}

//FINANCIAL INFORMATION SECTION
//fetch net income and operating expenses
async function getincomeStatement(stock) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/income-statement/${stock}?period=quarter&limit=1&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displayIncomeStatement(response);
}

//fetch cash, current assets, total assets, current liabilities, total liabilities
async function getBalanceSheet(stock) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stock}?period=quarter&limit=1&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displayBalanceSheet(response);
}

//fetch working capital
async function getWorkingCapital(stock) {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/key-metrics/${stock}?limit=1&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
  displayWorkingCapital(response);
}

//display net income and operating expenses
function displayIncomeStatement(response) {
  if (!response[0]) {
    document.querySelector(".operating-expenses").textContent = `-`;
    document.querySelector(".net-income").textContent = `-`;
  } else {
    const { operatingExpenses, netIncome } = response[0];
    const operatingExp = formatNums(operatingExpenses);
    const netInc = formatNums(netIncome);

    document.querySelector(
      ".operating-expenses"
    ).textContent = `$${operatingExp}`;
    document.querySelector(".net-income").textContent = `$${netInc}`;
  }
}

//display cash, current assets, total assets, current liabilities, total liabilities
function displayBalanceSheet(response) {
  if (!response[0]) {
    document.querySelector(".cash").textContent = `-`;
    document.querySelector(".current-assets").textContent = `-`;
    document.querySelector(".total-assets").textContent = `-`;
    document.querySelector(".current-liabilities").textContent = `-`;
    document.querySelector(".total-liabilities").textContent = `-`;
  } else {
    const {
      cashAndCashEquivalents,
      totalCurrentAssets,
      totalAssets,
      totalCurrentLiabilities,
      totalLiabilities,
    } = response[0];
    const cash = formatNums(cashAndCashEquivalents);
    const currentAssets = formatNums(totalCurrentAssets);
    const assets = formatNums(totalAssets);
    const currentLiabilities = formatNums(totalCurrentLiabilities);
    const liabilities = formatNums(totalLiabilities);

    document.querySelector(".cash").textContent = `$${cash}`;
    document.querySelector(".current-assets").textContent = `$${currentAssets}`;
    document.querySelector(".total-assets").textContent = `$${assets}`;
    document.querySelector(
      ".current-liabilities"
    ).textContent = `$${currentLiabilities}`;
    document.querySelector(
      ".total-liabilities"
    ).textContent = `$${liabilities}`;
  }
}

//display working capital
function displayWorkingCapital(response) {
  if (!response[0]) {
    document.querySelector(".working-capital").textContent = `-`;
  } else {
    const { workingCapital } = response[0];
    const wrkCap = formatNums(workingCapital);
    document.querySelector(".working-capital").textContent = `$${wrkCap}`;
  }
}

//SEC FILING SECTION
get10k();
async function get10k() {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/AAPL?type=10-K&limit=100&apikey=${apiKey}`
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
  display10k(response);
}

function display10k(response) {
  const entries = Object.entries(response);
  console.log(entries);

  entries.forEach((e) => {
    const { fillingDate, type } = e[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    document.querySelector(".filing").insertAdjacentHTML(
      "afterend",
      `<div class="filing">
        <p class="sec-row">${fileType}</p>
        <p class="sec-row">prospectus supplement</p>
        <p class="sec-row">${date}</p>
      </div>`
    );
  });
}
