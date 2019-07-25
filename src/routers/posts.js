const express = require('express');
const router = express.Router();
const handler = require('../handlers/posts');
const { POSTS_FILE_PATH, COMMENTS_FILE_PATH } = require('../constants.js');
const IdFieldName = 'id';

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

router
    .route('/')
    .get(function (req, res) {
        res.send(handler.getAllElements(POSTS_FILE_PATH));
    })
    .post(function (req, res) {
        //check body value
        handler.addElementToCollection(POSTS_FILE_PATH, req.body);
        res.send('Posted');
    });

router
    .route('/:id')
    .get(function (req, res) {
        //check params value in 0
        res.send(handler.getElementFromCollection(POSTS_FILE_PATH, IdFieldName, req.params[0]));
    })
    .put(function (req, res) {
        handler.updateElementToCollection(POSTS_FILE_PATH, IdFieldName, req.params[0], req.body);
        res.send('Updated');
    })
    .delete(function (req, res) {
        handler.updateElementToCollection(POSTS_FILE_PATH, IdFieldName, req.params[0]);
        res.send('Removed');
    });

router
    .route('/:id/comments')
    .get(function (req, res) {
        res.send(handler.getAllElements(COMMENTS_FILE_PATH));
    })
    .put(function (req, res) {
        handler.updateElementToCollection(COMMENTS_FILE_PATH, IdFieldName, req.params[0], req.body);
        res.send('Updated');
    })
    .delete(function (req, res) {
        handler.updateElementToCollection(COMMENTS_FILE_PATH, IdFieldName, req.params[0]);
        res.send('Removed');
    });

module.exports = router;
