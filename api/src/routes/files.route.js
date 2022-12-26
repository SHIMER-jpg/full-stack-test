const express = require("express");
const router = express.Router();
const filesController = require("../controllers/files.controller");

router.get("/data", filesController.getParsedData);

router.get("/list", filesController.getRawList);

module.exports = router;
