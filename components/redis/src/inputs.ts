import { input, util } from "@prismatic-io/spectral";

export const host = input({
  label: "Host",
  type: "string",
  example: "192.168.0.1",
  required: true,
  comments: "Provide a string value for the host address of the Redis server.",
  clean: util.types.toString,
});

export const db = input({
  label: "Database",
  type: "string",
  example: "myDatabase",
  required: false,
  comments:
    "Provide a string value for the name of the Redis database. If set, client will run Redis select command on connect.",
  clean: (value) => {
    return value ? util.types.toString(value) : undefined;
  },
});

export const key = input({
  label: "Key",
  type: "string",
  example: "customerId",
  required: true,
  comments: "Provide a string value for key of the item.",
  clean: util.types.toString,
});

export const port = input({
  label: "Port",
  type: "string",
  default: "6379",
  example: "6379",
  required: true,
  comments: "Provide a string value for the port of the Redis server.",
  clean: util.types.toNumber,
});

export const value = input({
  label: "Value",
  type: "string",
  example: "cust#3017",
  required: true,
  comments: "Provide a string for the value to be set.",
  clean: util.types.toString,
});

export const searchPattern = input({
  label: "Search Pattern",
  type: "string",
  example: "h[a-b]llo",
  required: true,
  comments: `Provide a string value for the pattern to search on. For more information about the commands the Redis component uses, see the [Redis documentation](https://redis.io/commands/KEYS).`,
  clean: util.types.toString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});
