const express = require("express");
const { Protect } = require("../middleware/auth");
const router = express.Router();
const {create} = require("../controller/whatsapp.controller");



router.route("/create").get(create);


module.exports = router;
