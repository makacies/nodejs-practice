const postsJson = require('./resources/posts.json');

const DAY_MS = 8.64e+7;
const WEEK_MS = 6.048e+8;
const MONTH_MS = 2.628e+9;

function getPostsForThePeriod(posts, period, today) {
    return posts.filter(post => new Date(today - period) < post.createdAt).length;
}

function getPostsFrequency(date) {
    const today = Date.now();
    const posts = postsJson.map(post => {
        return {
            ...post,
            createdAt: new Date(post.createdAt)
        }
    });
    return {
        postsPerDay: getPostsForThePeriod(posts, DAY_MS, today),
        postsPerWeek: getPostsForThePeriod(posts, WEEK_MS, today),
        postsPerMonth: getPostsForThePeriod(posts, MONTH_MS, today)
    };
}

module.exports = {
    getPostsFrequency
};