const router = require('express').Router();
const CookieName = "blogCookie";

router
    .get('/login', (req, res) => {
        res.cookie(CookieName, 'logged in')
        res.send('Cookie is set')
    })
    .get('/logout', (req, res) => {
        res.clearCookie(CookieName);
        res.send('Cookie is removed')
    });

module.exports = router;