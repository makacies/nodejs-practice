var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router
    .route('/:username')
    .get(function (req, res) {
        res.send('')
    })
    .put(function (req, res) {
        res.send('')
    })
    .delete(function (req, res) {
        res.send('')
    });

router
    .get('/login', (req, res) => res.send(''))
    .get('/logout', (req, res) => res.send(''));

module.exports = router;
