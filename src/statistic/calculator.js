const DAY_MS = 24*60*60*1000;
const WEEK_MS = DAY_MS*7;
const MONTH_MS = WEEK_MS*4.3;

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