// src/lib/redis.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: '5.161.100.160',
  port: 5436,
  password: 'lLni710ojYaA2aYekM51zgzhnielsjsbhXLQIhD4tX6YD6ytyUrLwFLhBzDOxffl',
});

export default redis;