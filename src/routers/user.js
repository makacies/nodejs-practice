var express = require('express');
var router = express.Router();
const handler = require('../helpers/storageObjectsHandler');
const { USERS_FILE_PATH, AUTH_COOKIE_NAME } = require('../constants.js');

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    } else res.status(403).send('Forbidden');
});

router
    .route('/:id')
    .get(function (req, res) {
        res.send(handler.getElementFromCollection(USERS_FILE_PATH, req.params.id));
    })
    .post(function (req, res) {
        handler.addElementToCollection(USERS_FILE_PATH, req.body);
        res.send('Posted');
    })
    .put(function (req, res) {
        handler.updateElementInCollection(USERS_FILE_PATH, req.params.id, req.body);
        res.send('Updated');
    })
    .delete(function (req, res) {
        handler.deleteElementFromCollection(USERS_FILE_PATH, req.params.id);
        res.send('Removed');
    });

module.exports = router;
