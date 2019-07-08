const statisticCollector = require('./statisticCollector.js');
const permissionsConfig = require('./resources/permissions.json');
const user = require('./resources/user.json');
const { Auth } = require('./auth.js');

const statistic = statisticCollector.getPostsFrequency();

console.log(statistic.postsPerDay);
console.log(statistic.postsPerWeek);
console.log(statistic.postsPerMonth);

const authenticator = new Auth(permissionsConfig); 
console.log(authenticator.hasAccess('VIEW_PHOTOS', user));