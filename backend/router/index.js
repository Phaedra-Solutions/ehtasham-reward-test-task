const express = require("express");
const router = express.Router();

const rewardRoutes = require("./reward.routes");

router.use("/", rewardRoutes);

module.exports = router;
