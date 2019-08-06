var express = require('express');
var router = express.Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    } else res.status(403).send('Forbidden');
});

router
    .route('/:username')
    .get(function (req, res) {
        res.send('Not implemented yet')
    })
    .put(function (req, res) {
        res.send('Not implemented yet')
    })
    .delete(function (req, res) {
        res.send('Not implemented yet')
    });

module.exports = router;