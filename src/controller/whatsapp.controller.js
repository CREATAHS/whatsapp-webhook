const asyncHandler = require("express-async-handler");
const sendMail = require("../utils/mailHelper")

exports.create = asyncHandler(async (req, res, next) => {
    console.log('Received webhook payload:', req.body);
    res.status(200).send('Webhook received successfully.');
})