/* eslint-disable no-unused-vars */
'use strict';
console.log('hello there');
// create object literals for every shop


// global variable for business hours
// since each branch has the same hours
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
  this.getCustomersThisHour = function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  };

  // method to calculate how many many cookies were sold at any given hour
  this.calcCookiesPerHour = function()
  {
    for(let i = 0; i < businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // assign the cookies sold each hour to an cookiesSoldEachHour[i]
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
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



  // create an empty <td> and append to <thead>
  let emptyHoursDataRow = document.createElement('td');
  businessHoursRow.appendChild(emptyHoursDataRow);
  for(let i = 0; i < businessHours.length; i++)
  {
    // create a <td> for each business hour
    let businessHoursDataRow = document.createElement('td');

    // give it content (the hours from 6am to 7pm)
    businessHoursDataRow.textContent = `${businessHours[i]}`;

    // append to dom
    businessHoursRow.appendChild(businessHoursDataRow);
  }

  // create Daily Location Total Header row
  let dailyLocationTotal = document.createElement('td');

  dailyLocationTotal.textContent = 'Daily Location Total';

  businessHoursRow.appendChild(dailyLocationTotal);

  // create <tbody> for the sales data rows to go into
  let salesTableBody = document.createElement('tbody');
  salesTableBody.setAttribute('id', 'salesData');
  salesDataTable.appendChild(salesTableBody);
}

// todo: global function to render footer <thead> with total sales at the bottom of each hour for all locations

function renderSalesTableFooter()
{
  console.log('this is the table footer');
}



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

// debug log
console.log(seattleBranch.location);

// render the business hours header
renderSalesTableHeader();
seattleBranch.renderSalesDataRows();
// render data rows for seattle


// todo: make a table header render'er function to list business hours
// todo: give each instance of CookieStore its own render() function for sales data
// render function will build a table for cookie sales by location and time
// todo: the table's footer will contain the total cookie sales for that time and place
// note: I already have this in calcCookiesPerHour and can grab and store it each cycle of the for loop
// todo: make a table footer rendering function to store the accumulated totals of cookie sales each hour
// note: I'm not sure if that's the top or bottom of each hour, yet
/*
  I forgor
*/

// todo: standalone functions that the CookieStores objects can use to get random customers and calculate cookies per hour

/*
// put attributes(properties), arrays, methods and such in each
// remember to use the 'this.' keyword to reference an object in place
let seattleBranch =
{
  location: 'Seattle', // the city the branch is in
  minCust: 23, // minimum customers per hour
  maxCust: 65, // maximum customers per hour
  avgCookiesPerSale: 6.3, // average cookies sold per customer/sale
  totalCookiesSoldToday: 0, //accumulator! // how many cookies have been sold today

  // array that lists each business hours for this location
  // same business hours for each location currently, but this may change as the business expands...
  businessHours:
  [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm'
  ],

  // array to list cookies sold each hour from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // assign the cookies sold each hour to an cookiesSoldEachHour[i]
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  },

  // method to create list elements for cookie sales data
  // used template literals to make strings for the textContent of each
  renderSalesList: function()
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // create an article for this location
    let article = document.createElement('article');
    article.setAttribute('id', this.location);
    listContainer.appendChild(article);


    // creates an h3 for Seattle
    // 1. create an element
    let h3 = document.createElement('h3');
    // 2. give it content
    h3.textContent = this.location;
    // 3. append it to the DOM
    article.appendChild(h3);


    // 1. create the element
    // creates a variable for the <ul> I want to make
    let unorderedList = document.createElement('ul');

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul id="Seattle">
    unorderedList.setAttribute('class', 'salesData');

    // 2. give it content; we'll do this later kinda with the list items

    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    article.appendChild(unorderedList);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item
      listItem.textContent = `${this.businessHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;

      // 3. append it to the DOM
      // append the <li> to the <ul>
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a <li> for totalCookiesSoldToday and append to end of the above <ul>
    let totalLi = document.createElement('li');
    totalLi.textContent = `Total: ${this.totalCookiesSoldToday} cookies`;
    unorderedList.appendChild(totalLi);
  }
};



let tokyoBranch =
{
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookiesPerSale: 1.2,
  totalCookiesSoldToday: 0, //accumulator! // how many cookies have been sold today

  // array that lists each business hours for this location
  // same business hours for each location currently, but this may change as the business expands...
  businessHours:
  [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm'
  ],

  // array to list cookies sold each hour from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // appends the cookies sold each hour to an array
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  },

  // method to create list elements for cookie sales data
  // used template literals to make strings for the textContent of each
  renderSalesList: function()
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // create an article for this location
    let article = document.createElement('article');
    article.setAttribute('id', this.location);
    listContainer.appendChild(article);


    // creates an h3 for Seattle
    // 1. create an element
    let h3 = document.createElement('h3');
    // 2. give it content
    h3.textContent = this.location;
    // 3. append it to the DOM
    article.appendChild(h3);


    // 1. create the element
    // creates a variable for the <ul> I want to make
    let unorderedList = document.createElement('ul');

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul id="Seattle">
    unorderedList.setAttribute('class', 'salesData');

    // 2. give it content; we'll do this later kinda with the list items

    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    article.appendChild(unorderedList);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item
      listItem.textContent = `${this.businessHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;

      // 3. append it to the DOM
      // append the <li> to the <ul>
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a <li> for totalCookiesSoldToday and append to end of the above <ul>
    let totalLi = document.createElement('li');
    totalLi.textContent = `Total: ${this.totalCookiesSoldToday} cookies`;
    unorderedList.appendChild(totalLi);
  }
};

let dubaiBranch =
{
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookiesPerSale: 3.7,
  totalCookiesSoldToday: 0, //accumulator! // how many cookies have been sold today

  // array that lists each business hours for this location
  // same business hours for each location currently, but this may change as the business expands...
  businessHours:
  [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm'
  ],

  // array to list cookies sold each hour from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // appends the cookies sold each hour to an array
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  },

  // method to create list elements for cookie sales data
  // used template literals to make strings for the textContent of each
  renderSalesList: function()
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // create an article for this location
    let article = document.createElement('article');
    article.setAttribute('id', this.location);
    listContainer.appendChild(article);


    // creates an h3 for Seattle
    // 1. create an element
    let h3 = document.createElement('h3');
    // 2. give it content
    h3.textContent = this.location;
    // 3. append it to the DOM
    article.appendChild(h3);


    // 1. create the element
    // creates a variable for the <ul> I want to make
    let unorderedList = document.createElement('ul');

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul id="Seattle">
    unorderedList.setAttribute('class', 'salesData');

    // 2. give it content; we'll do this later kinda with the list items

    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    article.appendChild(unorderedList);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item
      listItem.textContent = `${this.businessHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;

      // 3. append it to the DOM
      // append the <li> to the <ul>
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a <li> for totalCookiesSoldToday and append to end of the above <ul>
    let totalLi = document.createElement('li');
    totalLi.textContent = `Total: ${this.totalCookiesSoldToday} cookies`;
    unorderedList.appendChild(totalLi);
  }
};

let parisBranch =
{
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookiesPerSale: 2.3,
  totalCookiesSoldToday: 0, //accumulator! // how many cookies have been sold today

  // array that lists each business hours for this location
  // same business hours for each location currently, but this may change as the business expands...
  businessHours:
  [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm'
  ],

  // array to list cookies sold each hour from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // appends the cookies sold each hour to an array
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  },

  // method to create list elements for cookie sales data
  // used template literals to make strings for the textContent of each
  renderSalesList: function()
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // create an article for this location
    let article = document.createElement('article');
    article.setAttribute('id', this.location);
    listContainer.appendChild(article);


    // creates an h3 for Seattle
    // 1. create an element
    let h3 = document.createElement('h3');
    // 2. give it content
    h3.textContent = this.location;
    // 3. append it to the DOM
    article.appendChild(h3);


    // 1. create the element
    // creates a variable for the <ul> I want to make
    let unorderedList = document.createElement('ul');

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul id="Seattle">
    unorderedList.setAttribute('class', 'salesData');

    // 2. give it content; we'll do this later kinda with the list items

    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    article.appendChild(unorderedList);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item
      listItem.textContent = `${this.businessHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;

      // 3. append it to the DOM
      // append the <li> to the <ul>
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a <li> for totalCookiesSoldToday and append to end of the above <ul>
    let totalLi = document.createElement('li');
    totalLi.textContent = `Total: ${this.totalCookiesSoldToday} cookies`;
    unorderedList.appendChild(totalLi);
  }
};

let limaBranch =
{
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookiesPerSale: 4.6,
  totalCookiesSoldToday: 0, //accumulator! // how many cookies have been sold today

  // array that lists each business hours for this location
  // same business hours for each location currently, but this may change as the business expands...
  businessHours:
  [
    '6am',
    '7am',
    '8am',
    '9am',
    '10am',
    '11am',
    '12pm',
    '1pm',
    '2pm',
    '3pm',
    '4pm',
    '5pm',
    '6pm',
    '7pm'
  ],

  // array to list cookies sold each hour from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust (inclusive)
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      // gets the number of customers/sales at a given hour
      let customersThisHour = this.getCustomersThisHour();

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      // appends the cookies sold each hour to an array
      // in hindsight, I could've use .push()
      this.cookiesSoldEachHour[i] = cookiesSoldThisHour;

      // accumulate total sales by cookies sold this hour
      this.totalCookiesSoldToday += cookiesSoldThisHour;
    }
    // shows how many cookies sold at the end of the business day
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
  },

  // method to create list elements for cookie sales data
  // used template literals to make strings for the textContent of each
  renderSalesList: function()
  {
    // fills cookiesSoldEachHour[] with sales data
    this.calcCookiesPerHour();

    // 0. grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // create an article for this location
    let article = document.createElement('article');
    article.setAttribute('id', this.location);
    listContainer.appendChild(article);


    // creates an h3 for Seattle
    // 1. create an element
    let h3 = document.createElement('h3');
    // 2. give it content
    h3.textContent = this.location;
    // 3. append it to the DOM
    article.appendChild(h3);


    // 1. create the element
    // creates a variable for the <ul> I want to make
    let unorderedList = document.createElement('ul');

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul id="Seattle">
    unorderedList.setAttribute('class', 'salesData');

    // 2. give it content; we'll do this later kinda with the list items

    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    article.appendChild(unorderedList);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item
      listItem.textContent = `${this.businessHours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;

      // 3. append it to the DOM
      // append the <li> to the <ul>
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a <li> for totalCookiesSoldToday and append to end of the above <ul>
    let totalLi = document.createElement('li');
    totalLi.textContent = `Total: ${this.totalCookiesSoldToday} cookies`;
    unorderedList.appendChild(totalLi);
  }
};

// instantiate and plop each branch's data into the DOM
seattleBranch.renderSalesList();
tokyoBranch.renderSalesList();
dubaiBranch.renderSalesList();
dubaiBranch.renderSalesList();
parisBranch.renderSalesList();
limaBranch.renderSalesList();
*/
