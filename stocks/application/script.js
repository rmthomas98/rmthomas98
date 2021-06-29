"use-strict";

const apiKey = "2664b4bd6aea5baf4a79a8fdef78acdc";
const searchBar = document.querySelector(".search-bar");

//INITIALIZATION//
searchBar.addEventListener("keydown", (e) => {
  if (searchBar.value === "") return;
  if (e.key === "Enter") {
    clearHtml();
    const stock = searchBar.value.toUpperCase();
    init(stock);
    searchBar.value = "";
    searchBar.blur();
  }
});

document.querySelector(".fa-search").addEventListener("click", () => {
  if (searchBar.value === "") return;
  clearHtml();
  const stock = searchBar.value.toUpperCase();
  init(stock);
  searchBar.value = "";
  searchBar.blur();
});

function clearHtml() {
  document.querySelector(".filing-holder-tenk").innerHTML = "";
  document.querySelector(".filing-holder-tenq").innerHTML = "";
  document.querySelector(".filing-holder-news").innerHTML = "";
  document.querySelector(".filing-holder-prospectuses").innerHTML = "";
  document.querySelector(".filing-holder-registration").innerHTML = "";
  document.querySelector(".filing-holder-other").innerHTML = "";
}

function init(stock) {
  moreStats(stock);
  basicInfo(stock);
  stockStats(stock);
  getincomeStatement(stock);
  getBalanceSheet(stock);
  getWorkingCapital(stock);
  get10k(stock);
  get10q(stock);
  get8k(stock);
  getProspectus(stock);
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
    document.querySelector(".current-assets").textContent = `${
      currentAssets === "N/A" ? "-" : "$" + currentAssets
    }`;
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
let tenkResponse;
let twentyfResponse;
//fetch anuual earnings reports sec filings
async function get10k(stock) {
  tenkResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?type=10-K&limit=100&apikey=${apiKey}`
  )
    .then((tenkResponse) => tenkResponse.json())
    .catch((err) => console.error(err));

  //fetch annual earnings report for foreign companies
  twentyfResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?type=20-F&limit=100&apikey=${apiKey}`
  )
    .then((twentyfResponse) => twentyfResponse.json())
    .catch((err) => console.error(err));

  if (twentyfResponse.length !== 0) {
    displayInitial10k(twentyfResponse);
  } else if (tenkResponse.length !== 0) {
    displayInitial10k(tenkResponse);
  } else if (twentyfResponse.length === 0 && tenkResponse.length === 0) {
    displayInitial10k("");
  }
}

//view all 10k and 20f sec filings button initiation
function initiateAll10k() {
  if (tenkResponse.length !== 0) {
    viewMore10k(tenkResponse);
  }
  if (twentyfResponse.length !== 0) {
    viewMore10k(twentyfResponse);
  }
  document.querySelector(".view-more-tenk").style.display = "none";
}

let tenqResponse;
//fetch 10-Q sec filings
async function get10q(stock) {
  tenqResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?type=10-Q&limit=100&apikey=${apiKey}`
  )
    .then((tenqResponse) => tenqResponse.json())
    .catch((err) => console.error(err));
  displayInitial10q(tenqResponse);
}

//view all 10q sec filings button initiation
function initiateAll10q() {
  viewMore10q(tenqResponse);
  document.querySelector(".view-more-tenq").style.display = "none";
}

let eightkResponse;
let sixkResponse;
//fetch 8-k or 6k sec filings
async function get8k(stock) {
  eightkResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?type=8-K&limit=100&apikey=${apiKey}`
  )
    .then((eightkResponse) => eightkResponse.json())
    .catch((err) => console.error(err));

  //fetch 6k sec filings
  sixkResponse = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?type=6-K&limit=100&apikey=${apiKey}`
  )
    .then((sixkResponse) => sixkResponse.json())
    .catch((err) => console.error(err));

  if (sixkResponse.length !== 0) {
    displayInitial8k(sixkResponse);
  } else if (eightkResponse.length !== 0) {
    displayInitial8k(eightkResponse);
  } else if (sixkResponse.length === 0 && eightkResponse.length === 0) {
    displayInitial8k("");
  }
}

//view all 8k and 6k sec filings button initiation
function initiateAll8k() {
  if (sixkResponse.length !== 0) {
    viewMore8k(sixkResponse);
  }
  if (eightkResponse.length !== 0) {
    viewMore8k(eightkResponse);
  }
  document.querySelector(".view-more-news").style.display = "none";
}

//fetch prospectuses and registration sec filings
async function getProspectus(stock) {
  const allOtherSecFilings = await fetch(
    `https://financialmodelingprep.com/api/v3/sec_filings/${stock}?limit=500&apikey=${apiKey}`
  )
    .then((allOtherSecFilings) => allOtherSecFilings.json())
    .catch((err) => console.error(err));
  displayInitialProspectus(allOtherSecFilings);
  displayInitialRegistrations(allOtherSecFilings);
  displayInitialOther(allOtherSecFilings);
}

//display first 4 10k sec filings
function displayInitial10k(response) {
  if (response.length > 0) {
    document.querySelector(".tenk-title").style.display = "block";
  } else {
    document.querySelector(".tenk-title").style.display = "block";
    document.querySelector(".filing-holder-tenk").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing tenk">
        <p class="sec-type">No filings found in this category</p>
      </div></a>`
    );
  }
  const entries = Object.entries(response);
  if (entries.length > 4) {
    document.querySelector(".view-more-tenk").style.display = "block";
  } else {
    document.querySelector(".view-more-tenk").style.display = "none";
  }
  const initialEntries = entries.slice(0, 4);
  for (const entry of initialEntries) {
    const { fillingDate, type, finalLink } = entry[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    document.querySelector(".filing-holder-tenk").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing tenk">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">${
          fileType === "10-K"
            ? "Annual Financial Report"
            : "Registration statement / Annual report / Transition report"
        }</p>
        <p class="sec-date">${date}</p>
      </div><a>`
    );
  }
}

//display the rest of 10k sec filings
function viewMore10k(response) {
  const entries = Object.entries(response);
  const moreEntries = entries.slice(4);

  moreEntries.forEach((e) => {
    const { fillingDate, type, finalLink } = e[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    document.querySelector(".filing-holder-tenk").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing tenk">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">${
          fileType === "10-K"
            ? "Annual Financial Report"
            : "Registration statement / Annual report / Transition report"
        }</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}

//display first 4 10q sec filings
function displayInitial10q(response) {
  if (response.length > 0) {
    document.querySelector(".tenq-title").style.display = "block";
  } else {
    document.querySelector(".tenq-title").style.display = "block";
    document.querySelector(".filing-holder-tenq").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing tenq">
        <p class="sec-type">No filings found in this category</p>
      </div></a>`
    );
  }
  const entries = Object.entries(response);
  if (entries.length > 4) {
    document.querySelector(".view-more-tenq").style.display = "block";
  } else {
    document.querySelector(".view-more-tenq").style.display = "none";
  }
  const initialEntries = entries.slice(0, 4);
  for (const entry of initialEntries) {
    const { fillingDate, type, finalLink } = entry[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    document.querySelector(".filing-holder-tenq").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing tenq">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">Quarterly Earnings Report</p>
        <p class="sec-date">${date}</p>
      </div><a>`
    );
  }
}

//display the rest of 10q sec filings
function viewMore10q(response) {
  const entries = Object.entries(response);
  const moreEntries = entries.slice(4);

  moreEntries.forEach((e) => {
    const { fillingDate, type, finalLink } = e[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    document.querySelector(".filing-holder-tenq").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing tenq">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">Quarterly Earnings Report</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}

//display first 4 8k sec filings
function displayInitial8k(response) {
  if (response.length > 0) {
    document.querySelector(".news-title").style.display = "block";
  } else {
    document.querySelector(".news-title").style.display = "block";
    document.querySelector(".filing-holder-news").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing news">
        <p class="sec-type">No filings found in this category</p>
      </div></a>`
    );
  }
  const entries = Object.entries(response);
  if (entries.length > 4) {
    document.querySelector(".view-more-news").style.display = "block";
  } else {
    document.querySelector(".view-more-news").style.display = "none";
  }
  const initialEntries = entries.slice(0, 4);
  initialEntries.forEach((e) => {
    const { fillingDate, type, finalLink } = e[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;

    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    document.querySelector(".filing-holder-news").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing news">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">News Report</p>
        <p class="sec-date">${date}</p>
      </div><a>`
    );
  });
}

//display the rest of 8k sec filings
function viewMore8k(response) {
  const entries = Object.entries(response);
  const moreEntries = entries.slice(4);
  console.log(moreEntries);
  moreEntries.forEach((e) => {
    const { fillingDate, type, finalLink } = e[1];
    const date = fillingDate.split(" ")[0];
    const fileType = type;
    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }
    document.querySelector(".filing-holder-news").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing news">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">News Report</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}

let allProspectuses;
//display first 4 prospectus sec filings
function displayInitialProspectus(response) {
  if (response.length > 0) {
    allProspectuses = [];
    Object.entries(response).forEach((e) => {
      if (
        e[1].type === "424B2" ||
        e[1].type === "424B3" ||
        e[1].type === "424B4" ||
        e[1].type === "424B5"
      ) {
        allProspectuses = [...allProspectuses, e[1]];
      }
    });
    if (allProspectuses.length > 0) {
      document.querySelector(".prospectuses-title").style.display = "block";
    } else {
      document.querySelector(".prospectuses-title").style.display = "block";
      document.querySelector(".view-more-prospectuses").style.display = "none";
      document.querySelector(".filing-holder-prospectuses").insertAdjacentHTML(
        "beforeend",
        `<a href="#" target="_blank"><div class="filing prospectuses">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
      );
    }
    if (allProspectuses.length > 4) {
      document.querySelector(".view-more-prospectuses").style.display = "block";
    } else {
      document.querySelector(".view-more-prospectuses").style.display = "none";
    }
    allProspectuses.slice(0, 4).forEach((e) => {
      const { fillingDate, finalLink, type } = e;
      const date = fillingDate.split(" ")[0];
      const fileType = type;
      if (finalLink === "" || fillingDate === "" || type === "") {
        return;
      }

      let summary;

      if (fileType === "424B2") summary = "Prospectus for primary offering";
      if (fileType === "424B3") summary = "Prospectus supplement";
      if (fileType === "424B4")
        summary = "Prospectus supplement with pricing info";
      if (fileType === "424B5")
        summary = "Prospectus supplement for primary offering";

      document.querySelector(".filing-holder-prospectuses").insertAdjacentHTML(
        "beforeend",
        `<a href="${finalLink}" target="_blank"><div class="filing prospectuses">
          <p class="sec-type">${fileType}</p>
          <p class="sec-name">${summary}</p>
          <p class="sec-date">${date}</p>
        </div></a>`
      );
    });
  } else {
    document.querySelector(".prospectuses-title").style.display = "block";
    document.querySelector(".view-more-prospectuses").style.display = "none";
    document.querySelector(".filing-holder-prospectuses").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing prospectuses">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
    );
  }
}

//view all prospectus sec filings button initiation
function initiateAllProspectuses() {
  viewMoreProspectuses(allProspectuses);
  document.querySelector(".view-more-prospectuses").style.display = "none";
}

//display all prospectus sec filings
function viewMoreProspectuses(data) {
  data.slice(4).forEach((e) => {
    const { fillingDate, finalLink, type } = e;
    const date = fillingDate.split(" ")[0];
    const fileType = type;
    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    let summary;

    if (fileType === "424B2") summary = "Prospectus for primary offering";
    if (fileType === "424B3") summary = "Prospectus supplement";
    if (fileType === "424B4")
      summary = "Prospectus supplement with pricing info";
    if (fileType === "424B5")
      summary = "Prospectus supplement for primary offering";

    document.querySelector(".filing-holder-prospectuses").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing prospectuses">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">${summary}</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}

let allRegistrations;
//display first 4 registration sec filings

function displayInitialRegistrations(response) {
  if (response.length > 0) {
    allRegistrations = [];
    Object.entries(response).forEach((e) => {
      if (
        e[1].type === "S-1" ||
        e[1].type === "S-1/A" ||
        e[1].type === "S-3" ||
        e[1].type === "S-3/A" ||
        e[1].type === "S-8" ||
        e[1].type === "F-1" ||
        e[1].type === "F-1/A" ||
        e[1].type === "F-3" ||
        e[1].type === "F-3/A"
      ) {
        allRegistrations = [...allRegistrations, e[1]];
      }
    });
    console.log(allRegistrations);
    if (allRegistrations.length > 0) {
      document.querySelector(".registration-title").style.display = "block";
    } else {
      document.querySelector(".registration-title").style.display = "block";
      document.querySelector(".view-more-registration").style.display = "none";
      document.querySelector(".filing-holder-registration").insertAdjacentHTML(
        "beforeend",
        `<a href="#" target="_blank"><div class="filing registration">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
      );
    }
    if (allRegistrations.length > 4) {
      document.querySelector(".view-more-registration").style.display = "block";
    } else {
      document.querySelector(".view-more-registration").style.display = "none";
    }
    allRegistrations.slice(0, 4).forEach((e) => {
      const { finalLink, fillingDate, type } = e;
      const date = fillingDate.split(" ")[0];
      const fileType = type;
      if (finalLink === "" || fillingDate === "" || type === "") {
        return;
      }

      let summary;

      if (fileType === "S-1" || fileType === "F-1")
        summary = "Initial registration of new securities";
      if (fileType === "S-1/A" || fileType === "F-1/A")
        summary = "Initial registration of new securities - amended";
      if (fileType === "S-3" || fileType === "F-3")
        summary = "Shelf registration";
      if (fileType === "S-3/A" || fileType === "F-3/A")
        summary = "Shelf registration - amended";
      if (fileType === "S-8")
        summary = "Registration of securities for employees";

      document.querySelector(".filing-holder-registration").insertAdjacentHTML(
        "beforeend",
        `<a href="${finalLink}" target="_blank"><div class="filing registration">
          <p class="sec-type">${fileType}</p>
          <p class="sec-name">${summary}</p>
          <p class="sec-date">${date}</p>
        </div></a>`
      );
    });
  } else {
    document.querySelector(".registration-title").style.display = "block";
    document.querySelector(".view-more-registration").style.display = "none";
    document.querySelector(".filing-holder-registration").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing registration">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
    );
  }
}

//view all registration sec filings button initiation
function initiateAllRegistrations() {
  viewMoreRegistrations(allRegistrations);
  document.querySelector(".view-more-registration").style.display = "none";
}

//display rest of registration forms
function viewMoreRegistrations(data) {
  data.slice(4).forEach((e) => {
    const { fillingDate, finalLink, type } = e;
    const date = fillingDate.split(" ")[0];
    const fileType = type;
    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    let summary;

    if (fileType === "S-1" || fileType === "F-1")
      summary = "Initial registration of new securities";
    if (fileType === "S-1/A" || fileType === "F-1/A")
      summary = "Initial registration of new securities - amended";
    if (fileType === "S-3" || fileType === "F-3")
      summary = "Shelf registration";
    if (fileType === "S-3/A" || fileType === "F-3/A")
      summary = "Shelf registration - amended";
    if (fileType === "S-8")
      summary = "Registration of securities for employees";

    document.querySelector(".filing-holder-registration").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing registration">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">${summary}</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}

//display first 4 other sec filings
let allOther;
function displayInitialOther(response) {
  if (response.length > 0) {
    allOther = [];
    Object.entries(response).forEach((e) => {
      if (
        e[1].type === "UPLOAD" ||
        e[1].type === "EFFECT" ||
        e[1].type === "CORRESP"
      ) {
        allOther = [...allOther, e[1]];
      }
    });
    if (allOther.length > 0) {
      document.querySelector(".other-title").style.display = "block";
    } else {
      document.querySelector(".other-title").style.display = "block";
      document.querySelector(".view-more-other").style.display = "none";
      document.querySelector(".filing-holder-other").insertAdjacentHTML(
        "beforeend",
        `<a href="#" target="_blank"><div class="filing other">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
      );
    }
    if (allOther.length > 4) {
      document.querySelector(".view-more-other").style.display = "block";
    } else {
      document.querySelector(".view-more-other").style.display = "none";
    }
    allOther.slice(0, 4).forEach((e) => {
      const { fillingDate, finalLink, type } = e;
      const date = fillingDate.split(" ")[0];
      const fileType = type;
      if (finalLink === "" || fillingDate === "" || type === "") {
        return;
      }

      let summary;

      if (fileType === "UPLOAD") summary = "Letter from the SEC";
      if (fileType === "CORRESP") summary = "correspondance with the SEC";
      if (fileType === "EFFECT") summary = "Notice of effectiveness";

      document.querySelector(".filing-holder-other").insertAdjacentHTML(
        "beforeend",
        `<a href="${finalLink}" target="_blank"><div class="filing other">
          <p class="sec-type">${fileType}</p>
          <p class="sec-name">${summary}</p>
          <p class="sec-date">${date}</p>
        </div></a>`
      );
    });
  } else {
    document.querySelector(".other-title").style.display = "block";
    document.querySelector(".view-more-other").style.display = "none";
    document.querySelector(".filing-holder-other").insertAdjacentHTML(
      "beforeend",
      `<a href="#" target="_blank"><div class="filing other">
          <p class="sec-type">No filings found in this category</p>
        </div></a>`
    );
  }
}

//view all other sec filings button initiation
function initiateAllOther() {
  viewMoreOther(allOther);
  document.querySelector(".view-more-other").style.display = "none";
}

//display rest of other sec filings
function viewMoreOther(data) {
  data.slice(4).forEach((e) => {
    const { fillingDate, finalLink, type } = e;
    const date = fillingDate.split(" ")[0];
    const fileType = type;
    if (finalLink === "" || fillingDate === "" || type === "") {
      return;
    }

    let summary;

    if (fileType === "UPLOAD") summary = "Letter from the SEC";
    if (fileType === "CORRESP") summary = "correspondance with the SEC";
    if (fileType === "EFFECT") summary = "Notice of effectiveness";

    document.querySelector(".filing-holder-other").insertAdjacentHTML(
      "beforeend",
      `<a href="${finalLink}" target="_blank"><div class="filing other">
        <p class="sec-type">${fileType}</p>
        <p class="sec-name">${summary}</p>
        <p class="sec-date">${date}</p>
      </div></a>`
    );
  });
}
