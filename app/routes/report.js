const express = require("express");
const router = express.Router();

const { list } = require("../controllers/report");

router.get("/report", list);

module.exports = router;
