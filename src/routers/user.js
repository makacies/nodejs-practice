const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');
const { Connection } = require('../db/connection.js');
const COLLECTION_NAME = 'users';

router.use(function timeLog(req, res, next) {
    if (req.cookies[AUTH_COOKIE_NAME]) {
        next();
    } else res.status(403).send('Forbidden');
});

router
    .route('/:id')
    .get(async function (req, res) {
        try {
            var documents = await Connection.db.collection(COLLECTION_NAME).find({
                '_id_': req.body.id
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
    .post(async function (req, res) {
        try {
            await Connection.db.collection(COLLECTION_NAME).insertOne(req.body);
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    })
    .put(async function (req, res) {
        try {
            await Connection.db.collection(COLLECTION_NAME).updateOne({
                '_id_': req.body.id
            }, {
                $set: {
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email
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
            await Connection.db.collection(COLLECTION_NAME).deleteOne({
                '_id_': req.body.id
            });
            res.status(200).json({});
        } catch (err) {
            console.log(err);
            res.status(500).json({});
        }
    });

module.exports = router;