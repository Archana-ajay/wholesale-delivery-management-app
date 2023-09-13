const redis = require("redis");

const loggerUtil = require("./logger");

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

(async () => {
    try {
        await client.connect();
    } catch (ex) {
        loggerUtil.error({
            message: ex.toString(),
            level: "error",
        });
    }
})();

const expiry = process.env.REDIS_EXPIRY;

exports.set = async (key, value, isExpiry) => {
    try {
        if (isExpiry) {
            await client.set(key, JSON.stringify(value), "EX", expiry);
        } else {
            await client.set(key, JSON.stringify(value));
        }
        return true;
    } catch (ex) {
        loggerUtil.error({
            message: ex.toString(),
            level: "error",
        });
        return false;
    }
};

exports.get = async (key) => {
    try {
        const redisData = await client.get(key);
        return JSON.parse(redisData);
    } catch (ex) {
        loggerUtil.error({
            message: ex.toString(),
            level: "error",
        });
        return false;
    }
};

exports.del = async (key) => {
    try {
        await client.del(key);
        return true;
    } catch (ex) {
        loggerUtil.error({
            message: ex.toString(),
            level: "error",
        });
        return false;
    }
};
