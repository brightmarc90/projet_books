import { createClient } from "redis";

export const redisClient = createClient({
  url: 'redis://localhost:6379', // URL par défaut de Redis
});

redisClient.on('error', (err) => console.error('Errreur redis client', err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connecté à Redis');
  } catch (error) {
    console.error('Erreur de connexion à Redis:', error);
  }
};
