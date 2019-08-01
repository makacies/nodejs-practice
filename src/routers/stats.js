var express = require('express');
var router = express.Router();
const reader = require('../helpers/fileReader.js');
const { POSTS_FILE_PATH, COMMENTS_FILE_PATH, AUTH_COOKIE_NAME } = require('../constants.js');
const { Worker } = require('worker_threads')
let stats = {};

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    } else res.status(403).send('Forbidden');
});

router
    .route('/')
    .get(function (req, res) {
        res.send(stats)
    });

function getSingleArrayOfComments(comments) {
    return comments.reduce((item, item1) => item.comments.concat(item1.comments))
}

function calculateStats() {
    const rawData = {
        posts: JSON.parse(reader.readFile(POSTS_FILE_PATH)),
        comments: getSingleArrayOfComments(JSON.parse(reader.readFile(COMMENTS_FILE_PATH)))
    }
    const worker = new Worker('./src/statistic/worker.js', {
        workerData: rawData
    });
    worker.on('message', m => stats = m);
}

setInterval(calculateStats, 2500);

module.exports = router;