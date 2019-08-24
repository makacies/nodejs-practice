const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');
const { Connection } = require('../db/connection.js');
const POSTS_COLLECTION_NAME = 'posts';
const COMMENTS_COLLECTION_NAME = 'comments';

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    } else res.status(403).send('Forbidden');
});

router
    .route('/')
    .get(async function (req, res) {
        try {
            var documents = await Connection.db.collection(POSTS_COLLECTION_NAME).find().toArray();

            if (documents.length === 0) {
                return res.status(404).json({});
            }

            res.status(200).json(documents);
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .post(async function (req, res) {
        try {
            await Connection.db.collection(POSTS_COLLECTION_NAME).insertOne({
                ...req.body,
                createdAt: new Date()
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    });

router
    .route('/:id')
    .get(async function (req, res) {
        try {
            var documents = await Connection.db.collection(POSTS_COLLECTION_NAME).find({
                id: req.params.id
            }).toArray();

            if (documents.length === 0) {
                return res.status(404).json({});
            }

            res.status(200).json(documents[0]);
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .put(async function (req, res) {
        try {
            await Connection.db.collection(POSTS_COLLECTION_NAME).updateOne({
                id: req.params.id
            }, {
                $set: {
                    postBody: req.body.postBody
                },
                $currentDate: {
                    updatedAt: true
                }
            }, {
                upsert: true
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .delete(async function (req, res) {
        try {
            await Connection.db.collection(POSTS_COLLECTION_NAME).deleteOne({
                id: req.params.id
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    });

router
    .route('/:id/comments')
    .get(async function (req, res) {
        try {
            var documents = await Connection.db.collection(COMMENTS_COLLECTION_NAME).find({
                postId: req.params.id
            }).toArray();

            if (documents.length === 0) {
                return res.status(404).json({});
            }

            res.status(200).json(documents);
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .post(async function (req, res) {
        try {
            await Connection.db.collection(COMMENTS_COLLECTION_NAME).insertOne({
                ...req.body,
                createdAt: new Date()
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .put(async function (req, res) {
        try {
            await Connection.db.collection(COMMENTS_COLLECTION_NAME).updateOne({
                postId: req.params.id
            }, {
                $set: {
                    body: req.body.body
                },
                $currentDate: {
                    updatedAt: true
                }
            }, {
                upsert: true
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .delete(async function (req, res) {
        try {
            await Connection.db.collection(COMMENTS_COLLECTION_NAME).deleteOne({
                postId: req.params.id
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    });

module.exports = router;
