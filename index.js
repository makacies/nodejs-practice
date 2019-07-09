const statisticCollector = require('./statisticCollector.js');
const user = require('./resources/user.json');
const { ENVIRONMENT_VARIABLE, VIEW_PHOTOS } = require('./helpers/constants.js');
const { Auth } = require('./auth.js');

const statistic = statisticCollector.getPostsFrequency();
console.log(statistic.postsPerDay);
console.log(statistic.postsPerWeek);
console.log(statistic.postsPerMonth);

//environment variable example could be found in the permissions.json file
const authenticator = new Auth(process.env[ENVIRONMENT_VARIABLE]);
console.log(authenticator.hasAccess(VIEW_PHOTOS, user));