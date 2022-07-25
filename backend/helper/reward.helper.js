/**
 * This functions will returns the all transaction of a customer with specific month number
 * @param{array} transactions
 * @param{number} customerId
 * @param{number} monthNumber
 * @returns
 */
const getTransactionsOfCustomer = (transactions, customerId, monthNumber) => {
  try {
    let transactionsListOfMonth = transactions.filter((transaction) => {
      return customerId === transaction.customerId && monthNumber === transaction.monthNumber;
    });
    return transactionsListOfMonth;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the points of the transaction through the transaction amount
 * @param{number}  price
 * @returns
 */
const getPoints = (price) => {
  try {
    return price >= 50 && price < 100 ? price - 50 : price > 100 ? 2 * (price - 100) + 50 : 0;
  } catch (error) {
    throw error;
  }
};

/**
 * This function will returns the transaction list that are within last 3 month from the current date
 * @param{array} transactions
 * @returns array
 */
const getLastThreeMonthsTransactions = (transactions) => {
  try {
    const threeMonthOldDate = new Date().setMonth(new Date().getMonth() - 3);
    let transactionsList = transactions.filter(
      (trans) => new Date(trans.transactionDate) > new Date(threeMonthOldDate)
    );
    return transactionsList.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTransactionsOfCustomer,
  getPoints,
  getLastThreeMonthsTransactions,
};
