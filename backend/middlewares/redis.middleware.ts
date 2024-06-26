import Redis from "ioredis";
import log from "../logger/log";
import config from "config";

const REDIS_PORT: number = config.get<number>("REDIS_PORT");
const REDIS_HOST: string = config.get<string>("REDIS_HOST");
const REDIS_USER: string = config.get<string>("REDIS_USER");
const REDIS_PASS: string = config.get<string>("REDIS_PASS");

const connection = new Redis({
  port: REDIS_PORT || 6379,
  host: REDIS_HOST || "localhost",
  username: REDIS_USER || "default",
  password: REDIS_PASS,
});

const redisGetToken = async (email: string): Promise<string | null> => {
  try {
    const token = await connection.get(email);
    return token;
  } catch (error) {
    log.error(
      `Error retrieving token from Redis for email ${email}:`,
      (error as Error).message
    );
    throw new Error(`Error retrieving token from Redis for email ${email}.`);
  }
};

export { connection, redisGetToken };
