const DAY_MS = 8.64e+7;
const WEEK_MS = 6.048e+8;
const MONTH_MS = 2.628e+9;

function getFrequencyForThePeriod(posts, period, today) {
    return posts.filter(post => new Date(today - period) < post.createdAt).length;
}

function getFrequency(postsJson) {
    const today = Date.now();
    const posts = postsJson.map(post => {
        return {
            ...post,
            createdAt: new Date(post.createdAt)
        }
    });
    return {
        perDay: getFrequencyForThePeriod(posts, DAY_MS, today),
        perWeek: getFrequencyForThePeriod(posts, WEEK_MS, today),
        perMonth: getFrequencyForThePeriod(posts, MONTH_MS, today)
    };
}

function getStats(rawData) {
    return {
        postsStats: getFrequency(rawData.posts),
        commentsStats: getFrequency(rawData.comments)
    }
}

module.exports = {
    getStats
};