const { rewardService } = require("../service");
const { transactionsData } = require("../transactionsData");

const calculateRewardsPoints = async (req, res) => {
  try {
    const transactionList = transactionsData;
    const data = await rewardService.calculateRewardsPoints(transactionList);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Internal Server Error", e });
  }
};

module.exports = {
  calculateRewardsPoints,
};
