const { rewardHelper } = require("../helper");

/**
 * This function will return the 3 things in reponse object when a transactions list is give to this function
 * 1- Total Number of customer points per month
 * 2- Total Number of points per customer from last 3 month
 * 3- List of transactions with the points for each transaction
 *
 * @param customerTransactions
 * @returns
 */
const calculateRewardsPoints = (customerTransactions) => {
  try {
    // Calculate points per transaction
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const last3MonthsTransactions = rewardHelper.getLastThreeMonthsTransactions(customerTransactions);

    // Get the points of each customer transaction
    const allTransactionsWithPoints = last3MonthsTransactions.map((transaction) => ({
      ...transaction,
      points: rewardHelper.getPoints(transaction.transactionAmount),
      monthNumber: new Date(transaction.transactionDate).getMonth(),
      year: new Date(transaction.transactionDate).getFullYear(),
    }));

    let customerPointsPerMonth = {};
    let pointsPerCustomer = {};

    // Main Logic
    allTransactionsWithPoints.forEach((transaction) => {
      let { customerId, customerName, points, monthNumber, year } = transaction;

      customerPointsPerMonth[customerId] = !customerPointsPerMonth[customerId]
        ? []
        : customerPointsPerMonth[customerId];

      // Count the total point of a customer from last 3 month against the customer name
      pointsPerCustomer[customerName] = !pointsPerCustomer[customerName]
        ? 0
        : pointsPerCustomer[customerName];
      pointsPerCustomer[customerName] += points;

      if (customerPointsPerMonth[customerId][monthNumber]) {
        // if customerId key exist in the customerPointsPerMonth then add the customer records
        // in the array month wise
        customerPointsPerMonth[customerId][monthNumber].points += points;
        customerPointsPerMonth[customerId][monthNumber].totalTransactions++;
      } else {
        customerPointsPerMonth[customerId][monthNumber] = {
          customerId,
          customerName,
          points,
          monthNumber,
          monthName: monthNames[monthNumber] + ", " + year,
          totalTransactions: 1,
        };
      }
    });

    // Get the record of customers with total points per month from the customerPointsPerMonth
    // where customerPointsPerMonth is the object with key value pair where key is the customer id
    // and value will be the array of customer records according to month
    let totalCustomerPointsPerMonth = [];
    for (let custKey in customerPointsPerMonth) {
      customerPointsPerMonth[custKey].forEach((data) => totalCustomerPointsPerMonth.push(data));
    }

    // Get the total last 3 month points records of customers from the pointsPerCustomer
    // pointsPerCustomer is the object with key value pair where key is the customer name
    // and value will be the total points of the customer from last 3 month
    let totalPointsPerCustomer = [];
    for (let [customerName, points] of Object.entries(pointsPerCustomer)) {
      totalPointsPerCustomer.push({ customerName, points });
    }

    // Get the transactions of a customer against each month
    for (let ctran of totalCustomerPointsPerMonth) {
      ctran.transactions = rewardHelper.getlTransactionsOfCustomerWithSpecificMonth(
        allTransactionsWithPoints,
        ctran.customerId,
        ctran.monthNumber
      );
      delete ctran.monthNumber;
    }

    return {
      totalPointsPerCustomer,
      totalCustomerPointsPerMonth,
      allTransactionsWithPoints,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  calculateRewardsPoints,
};
