const express = require("express");
const router = express.Router();
const user = require("./signup.route.js")
const whatsapp = require('./whatsapp.route')

router.use("/user", user);
router.use("/whatsapp", whatsapp);

module.exports = router