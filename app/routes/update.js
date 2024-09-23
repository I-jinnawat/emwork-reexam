const express = require("express");
const router = express.Router();

const { list } = require("../controllers/update");

router.get("/test/update/:id", list);

module.exports = router;
