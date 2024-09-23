const express = require("express");
const router = express.Router();

const { list, create, update, remove } = require("../controllers/test");

router.get("/test", list);
router.post("/test", create);

router.post("/tests/update/:id", update);
router.post("/tests/delete/:id", remove);

module.exports = router;
