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

  // list of cookies sold from business opening to close
  // starts out empty and fills with calcCookiesPerHour() function
  cookiesSoldEachHour: [],

  // method to get how many customers there were at this hour, between minCust and maxCust
  getCustomersThisHour: function()
  {
    return Math.floor(Math.random() * (this.maxCust - this.minCust +1) + this.minCust);
  },

  // method to calculate how many many cookies were sold at any given hour
  calcCookiesPerHour: function()
  {
    for(let i = 0; i < this.businessHours.length; i++)
    {
      let customersThisHour = this.getCustomersThisHour(); // gets the number of customers/sales at a given hour

      // calculates the cookie sales and rounds up to nearest integer
      console.log(`cookies sold so far: ${this.totalCookiesSoldToday}`);
      let cookiesSoldThisHour = Math.ceil(customersThisHour * this.avgCookiesPerSale);
      console.log(`customers at ${this.businessHours[i]}: ${customersThisHour} * ${this.avgCookiesPerSale} =`);
      console.log(`cookies sold this hour: ${cookiesSoldThisHour}\n\n`);

      this.cookiesSoldEachHour[i] = cookiesSoldThisHour; // appends the cookies sold each hour to an array
      this.totalCookiesSoldToday += cookiesSoldThisHour; // accumulate total sales by cookies sold this hour
    }
    console.log(`total cookies sold today: ${this.totalCookiesSoldToday}`);
    /*return cookiesSoldThisHour;// returns the value of how many cookies sold in that hour*/
  },

  // method to create html elements and fill them with content in a <ul> with <li>
  // use template literatal to make a string for the content of eat
  renderSalesList: function()
  {
    this.calcCookiesPerHour(); // fills the

    // grab the element in the DOM I want to add stuff to (<section id="salesLists">)
    let listContainer = document.getElementById('salesLists');

    // 1. create the element
    let list = document.createElement('ul'); // create a variable for the <ul> I want to make

    // set the <ul> to have the attribute 'class' and the class being the location
    // ex: <ul class="Seattle">
    list.setAttribute('class', this.location);

    // 2. give it content; we'll do this later kinda with the li
    // 3. append it to the DOM
    // take the ul we just made and append it as a child to the element we grabbed in listContainer
    listContainer.appendChild(list);

    let unorderedList = document.getElementsByClassName(this.location);

    for(let i = 0; i < this.businessHours.length; i++)
    {
      // 1. create the element
      let listItem = document.createElement('li');

      // 2. give it content
      // todo: write a template literal using business Hours[i] and cookiesSoldEachHour[i] in series to be the content of the list item

      // 3. append it to the DOM
      unorderedList.appendChild(listItem);
    }

    // todo: at the end of the for loop, make make a li for totalCookiesSoldToday
  }

};

// call seattle stuff to test
seattleBranch.calcCookiesPerHour();

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
