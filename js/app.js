/* eslint-disable no-unused-vars */
'use strict';
console.log('hello there');
// create object literals for every shop

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

// call seattle stuff to test
seattleBranch.renderSalesList();

let tokyoBranch =
{
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookiesPerSale: 1.2,
};

let dubaiBranch =
{
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookiesPerSale: 3.7,
};

let parisBranch =
{
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookiesPerSale: 2.3,
};

let limaBranch =
{
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookiesPerSale: 4.6,
};
