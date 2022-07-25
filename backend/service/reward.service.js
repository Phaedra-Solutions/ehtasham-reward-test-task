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
    let customerPointsPerMonth = {};
    let pointsPerCustomer = {};

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

    const transactionsList = rewardHelper.getLastThreeMonthsTransactions(customerTransactions);

    // Main Logic
    transactionsList.forEach((transaction) => {
      // Get the points and month number of transaction
      transaction.points = rewardHelper.getPoints(transaction.transactionAmount);
      transaction.monthNumber = new Date(transaction.transactionDate).getMonth();

      // Destructure to get the required data from transaction
      let { customerId, customerName, points, monthNumber, transactionDate } = transaction;
      const year = new Date(transactionDate).getMonth();

      customerPointsPerMonth[customerId] = !customerPointsPerMonth[customerId]
        ? []
        : customerPointsPerMonth[customerId];

      // Count the total point of a customer from last 3 month against the customer name
      pointsPerCustomer[customerName] = !pointsPerCustomer[customerName]
        ? 0
        : pointsPerCustomer[customerName];

      pointsPerCustomer[customerName] += points;

      // if customerId key exist in the customerPointsPerMonth then add the customer records
      // in the array month wise
      if (customerPointsPerMonth[customerId][monthNumber]) {
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
          transactions: rewardHelper.getTransactionsOfCustomer(transactionsList, customerId, monthNumber),
        };
      }
    });

    // Get the record of customers with total points per month from the customerPointsPerMonth
    // where customerPointsPerMonth is the object with key value pair where key is the customer id
    // and value will be the array of customer records according to month
    let totalPointsOfCustomerPerMonth = [];
    for (let custKey in customerPointsPerMonth) {
      customerPointsPerMonth[custKey].forEach((data) => totalPointsOfCustomerPerMonth.push(data));
    }

    // Get the total last 3 month points records of customers from the pointsPerCustomer
    // pointsPerCustomer is the object with key value pair where key is the customer name
    // and value will be the total points of the customer from last 3 month
    let totalPointsPerCustomer = [];
    for (let [customerName, points] of Object.entries(pointsPerCustomer)) {
      totalPointsPerCustomer.push({ customerName, points });
    }

    return {
      totalPointsPerCustomer,
      totalPointsOfCustomerPerMonth,
      transactionsList,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  calculateRewardsPoints,
};
