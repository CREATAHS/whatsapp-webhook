const express = require('express');
const router = express.Router();
const serviceRoute = require("./service.route")

router.use('/api', serviceRoute);

router.use('*', async (req, res, next) => {
    return res
        .status(404)
        .json({
            statusCode: 404
        });
});

module.exports = router;