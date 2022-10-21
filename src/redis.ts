import {Env} from "./index";
import Redis from "ioredis";


let _redis: Redis;

export function getRedis(): Redis {
    return _redis;
}

export function setRedis(env: Env) {
    _redis = new Redis(env.REDIS_URL);
}
