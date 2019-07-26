const express = require('express');
const router = express.Router();
const handler = require('../helpers/storageObjectsHandler');
const { POSTS_FILE_PATH, COMMENTS_FILE_PATH, AUTH_COOKIE_NAME } = require('../constants.js');
const IdFieldName = 'id';

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    }
    res.status(403).send('Forbidden');
});

router
    .route('/')
    .get(function (req, res) {
        res.send(handler.getAllElements(POSTS_FILE_PATH));
    })
    .post(function (req, res) {
        handler.addElementToCollection(POSTS_FILE_PATH, req.body);
        res.send('Posted');
    });

router
    .route('/:id')
    .get(function (req, res) {
        res.send(handler.getElementFromCollection(POSTS_FILE_PATH, IdFieldName, req.params.id));
    })
    .put(function (req, res) {
        handler.updateElementInCollection(POSTS_FILE_PATH, IdFieldName, req.params.id, req.body);
        res.send('Updated');
    })
    .delete(function (req, res) {
        handler.deleteElementFromCollection(POSTS_FILE_PATH, IdFieldName, req.params.id);
        res.send('Removed');
    });

router
    .route('/:id/comments')
    .get(function (req, res) {
        res.send(handler.getElementFromCollection(COMMENTS_FILE_PATH, IdFieldName, req.params.id));
    })
    .post(function (req, res) {
        handler.addElementToCollection(COMMENTS_FILE_PATH, req.body, 'comments', IdFieldName, req.params.id);
        res.send('Posted');
    })
    .delete(function (req, res) {
        handler.deleteElementFromCollection(COMMENTS_FILE_PATH, IdFieldName, req.params.id);
        res.send('Removed');
    });

module.exports = router;