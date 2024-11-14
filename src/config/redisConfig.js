const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://localhost:6379', // URL par défaut de Redis
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Could not connect to Redis:', error);
  }
};

module.exports = { redisClient, connectRedis };
