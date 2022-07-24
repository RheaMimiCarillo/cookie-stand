/* eslint-disable no-unused-vars */
'use strict';

// global variable for CookieStand Objects
// each branch has the same business hours, currently
const businessHours =
[
  '6:00am',
  '7:00am',
  '8:00am',
  '9:00am',
  '10:00am',
  '11:00am',
  '12:00pm',
  '1:00pm',
  '2:00pm',
  '3:00pm',
  '4:00pm',
  '5:00pm',
  '6:00pm',
  '7:00pm'
];

// lab-07 stretch goal:
// curve to modify maximum customers during certain hours of the day
const maxTrafficCurve =
[
  0.5,
  0.75,
  1.0,
  0.6,
  0.8,
  1.0,
  0.7,
  0.4,
  0.6,
  0.9,
  0.7,
  0.5,
  0.3,
  0.4,
  0.6,
];

// template to listen for and handle events
// 1. window into the dom (the thing we are going to attach the event listener to)

let form = document.getElementById('formId');
// let form2 = document.querySelector('form');

// 3. event handler
function handleSubmit(event) {
  event.preventDefault();
  let first = event.target.firstName.value;
  let last = event.target.lastName.value;
  console.log(first, last);
}

// 2. add event listener
//.addEventListener
form.addEventListener('submit', handleSubmit);
// empty array for hourly totals of every location
let hourlyTotalsEveryLocation = [];

// constructor Object for the locations
function CookieStand (location, minCust, maxCust, avgCookiesPerSale)
{
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerSale = avgCookiesPerSale;

  // stores the cookies sold from 6am to 7pm
  // will fill with data each hour
  this.cookiesSoldEachHour = [];

  // property for total cookies sold that day
  this.totalCookiesSoldToday = 0;


  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  // current hour is the index referring to an address in the maxTrafficCurve array
  this.getCustomersThisHour = function(currentHour)
  {
    let maxCustThisHour = this.maxCust * maxTrafficCurve[currentHour];

    // default max customers this location
    // the multiplier from the curve
    // the maxCustThisHour after multiplying default max by curve

    console.log(`default maxCust @ ${this.location}: ${this.maxCust}`);
    console.log(`curved maxCust @ ${this.location}: ${maxTrafficCurve[currentHour]} ${maxCustThisHour}`);

    return Math.floor(Math.random() * (maxCustThisHour - this.minCust +1) + this.minCust);
  };

  // method to calculate how many many cookies were sold at any given hour
  this.calcCookiesPerHour = function()
  {
    for(let i = 0; i < businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour(i);

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      // rounded up to the nearest whole human
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // assign the cookies sold each hour to cookiesSoldEachHour[i] array in the object
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate the global, total cookie sales figure with cookies sold this hour at this location
      this.totalCookiesSoldToday += cookiesSoldThisHour;

      // accumulate each index of the (global) hourlyTotalsEveryLocation[i] with the amount of cookies sold this hour at this location
      // if the index[i] of hourlyTotalsEveryLocation array is NaN, assign it the value 0
      if (isNaN(hourlyTotalsEveryLocation[i]))
      {
        hourlyTotalsEveryLocation[i] = 0;
      }
      hourlyTotalsEveryLocation[i] = (cookiesSoldThisHour + hourlyTotalsEveryLocation[i]);

      console.log(`${hourlyTotalsEveryLocation[i]}`);
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  };

  this.renderSalesDataRows = function(CookieStand)
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (table with id 'salesTable')
    let salesTableBody = document.getElementById('salesData');

    let salesTableRow = document.createElement('tr');
    salesTableRow.setAttribute('id', this.location);
    salesTableBody.appendChild(salesTableRow);

    let locationCell = document.createElement('td');
    locationCell.textContent = this.location;
    salesTableRow.appendChild(locationCell);

    // todo: make a for loop to render sales data
    for (let i = 0; i < businessHours.length; i++)
    {
      // create element
      let hourlySalesCell = document.createElement('td');
      // give content
      hourlySalesCell.textContent = this.cookiesSoldEachHour[i];
      salesTableRow.appendChild(hourlySalesCell);
    }
    // create cell for total sales that day

    let totalCookiesSoldTodayCell = document.createElement('td');
    totalCookiesSoldTodayCell.textContent = this.totalCookiesSoldToday;
    salesTableRow.appendChild(totalCookiesSoldTodayCell);
  };
}



// global function to create <table> and <thead> and render using the array of business hour
function renderSalesTableHeader()
{
  // 0. grab the document
  let salesSection = document.getElementById('salesLists');

  // 1. create the element (<table>)
  let salesDataTable = document.createElement('table');
  salesDataTable.setAttribute('id', 'salesTable');
  // 3. append it to the DOM
  salesSection.appendChild(salesDataTable);

  // 1. create the element (<thead>)
  let businessHoursHead = document.createElement('thead');
  // 3. append it to the DOM
  salesDataTable.appendChild(businessHoursHead);

  // create a <tr>
  let businessHoursRow = document.createElement('tr');
  businessHoursRow.setAttribute('id', 'businessHours');
  // append tr to dom
  businessHoursHead.appendChild(businessHoursRow);



  // create an empty <th> and append to <thead>
  let emptyHoursDataRow = document.createElement('th');
  businessHoursRow.appendChild(emptyHoursDataRow);
  for(let i = 0; i < businessHours.length; i++)
  {
    // create a <td> for each business hour
    let businessHoursDataRow = document.createElement('th');

    // give it content (the hours from 6am to 7pm)
    businessHoursDataRow.textContent = `${businessHours[i]}`;

    // append to dom
    businessHoursRow.appendChild(businessHoursDataRow);
  }

  // create Daily Location Total Header row
  let dailyLocationTotal = document.createElement('th');

  dailyLocationTotal.textContent = 'Daily Location Total';

  businessHoursRow.appendChild(dailyLocationTotal);

  // create <tbody> for the sales data rows to go into
  let salesTableBody = document.createElement('tbody');
  salesTableBody.setAttribute('id', 'salesData');
  salesDataTable.appendChild(salesTableBody);
}

// global function that renders footer (<tfoot>) with total sales at the bottom of each hour for all locations
function renderSalesTableFooter()
{
  console.log('this is the table footer');

  // grab salesTable
  let salesTable = document.getElementById('salesTable');

  // make a <tfoot> element
  let totalsFooter = document.createElement('tfoot');
  salesTable.appendChild(totalsFooter);

  // make a table row for the totals
  let totalsRow = document.createElement('tr');
  totalsRow.setAttribute('id', 'hourlyTotalSales');
  totalsFooter.appendChild(totalsRow);

  // make a table cell to display 'Totals'
  let totalsLeadCell = document.createElement('td');
  totalsLeadCell.textContent = 'Totals';
  totalsRow.appendChild(totalsLeadCell);

  // grandTotalSales default value is 0;
  let grandTotalSales = 0;

  for (let i = 0; i < businessHours.length; i++)
  {
    // makes cells with total hourly sales data across all branches
    let hourlyTotalsEveryLocationCell = document.createElement('td');
    hourlyTotalsEveryLocationCell.textContent = hourlyTotalsEveryLocation[i];
    totalsRow.appendChild(hourlyTotalsEveryLocationCell);

    // accumulate grandTotalSales
    grandTotalSales += hourlyTotalsEveryLocation[i];
  }

  // make a cell for 'Totals'
  let grandTotalCell = document.createElement('td');
  grandTotalCell.textContent = grandTotalSales;
  totalsRow.appendChild(grandTotalCell);
}


// instantiate each CookieStand branch
let seattleBranch = new CookieStand(
  'Seattle',
  23,
  65,
  6.3);
let tokyoBranch = new CookieStand(
  'Tokyo',
  3,
  24,
  1.2
);
let dubaiBranch = new CookieStand(
  'Dubai',
  11,
  38,
  3.7
);
let parisBranch = new CookieStand(
  'Paris',
  20,
  38,
  2.3
);
let limaBranch = new CookieStand(
  'Lima',
  2,
  16,
  4.6
);

// render the business hours header

renderSalesTableHeader();
// render data rows for seattle
seattleBranch.renderSalesDataRows();
tokyoBranch.renderSalesDataRows();
dubaiBranch.renderSalesDataRows();
parisBranch.renderSalesDataRows();
limaBranch.renderSalesDataRows();
// render footer rows
renderSalesTableFooter();
