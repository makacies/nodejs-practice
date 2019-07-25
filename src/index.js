const express = require('express');
const postsRouter = require('./routers/posts.js');
const userRouter = require('./routers/user.js');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Listening on port ${port}.`));

// const statisticCollector = require('./statisticCollector.js');
// const user = require('./resources/user.json');
// const { ENVIRONMENT_VARIABLE, VIEW_PHOTOS } = require('./helpers/constants.js');
// const { Auth } = require('./auth.js');

// const statistic = statisticCollector.getPostsFrequency();
// console.log(statistic.postsPerDay);
// console.log(statistic.postsPerWeek);
// console.log(statistic.postsPerMonth);

// //environment variable example could be found in the permissions.json file
// const authenticator = new Auth(process.env[ENVIRONMENT_VARIABLE]);
// console.log(authenticator.hasAccess(VIEW_PHOTOS, user));