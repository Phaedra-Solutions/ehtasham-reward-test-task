const express = require("express");

const { rewardController } = require("../controller");

const router = express.Router();

router.get("/rewards", rewardController.calculateRewardsPoints);

module.exports = router;
