import { ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createRedisClient } from "redis";
import { redisConnection as connectionType } from "./connections";
import type { CreateClientProps, RedisOptions } from "./interfaces";

export const getClientOptions = ({ redisConnection }: CreateClientProps) => {
  if (redisConnection.key !== connectionType.key) {
    throw new ConnectionError(
      redisConnection,
      `Unsupported authorization method ${redisConnection.key}.`,
    );
  }
  const redisObject: RedisOptions = {
    host: util.types.toString(redisConnection.fields.host),
    port: util.types.toNumber(redisConnection.fields.port),
    password: util.types.toString(redisConnection.fields.password),
    useTls: util.types.toBool(redisConnection.fields.useTls),
    cert: util.types
      .toString(redisConnection.fields.cert)
      .replace(/\\n/g, "\n"),
    key: util.types.toString(redisConnection.fields.key).replace(/\\n/g, "\n"),
    ca: util.types.toString(redisConnection.fields.ca).replace(/\\n/g, "\n"),
  };
  if (redisConnection.fields.username) {
    redisObject.user = util.types.toString(redisConnection.fields.username);
  }
  if (redisConnection.fields.db) {
    redisObject.database = util.types.toNumber(redisConnection.fields.db);
  }

  return redisObject;
};

export const createClient = async (
  { redisConnection }: CreateClientProps,
  debug: boolean,
) => {
  const clientOptions = getClientOptions({ redisConnection });

  const socket: Record<string, unknown> = {
    host: clientOptions.host,
    port: clientOptions.port,
    reconnectStrategy: (retries: number) => {
      if (retries > 5) {
        return new Error(
          "Unable to connect to the Redis Cluster, please check your credentials and configuration.",
        );
      } else {
        return retries * 500;
      }
    },
  };

  if (clientOptions.useTls) {
    socket.tls = true;
    if (clientOptions.key) {
      socket.key = clientOptions.key;
    }
    if (clientOptions.cert) {
      socket.cert = clientOptions.cert;
    }
    if (clientOptions.ca) {
      socket.ca = clientOptions.ca;
    }
  }

  const client = createRedisClient({
    username: clientOptions.user,
    password: clientOptions.password,
    database: clientOptions.database,
    socket,
  });

  client.on("error", (err) => console.log("Redis Cluster Error", err));
  client.on("connect", () => console.log("Redis Cluster Connected"));

  if (debug) {
    client.on("ready", () => console.log("Redis client ready"));
    client.on("reconnecting", () => console.log("Redis client reconnecting"));
    client.on("end", () => console.log("Redis client connection closed"));
  }

  return await client.connect();
};
