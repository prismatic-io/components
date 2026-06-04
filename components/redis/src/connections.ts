import { connection } from "@prismatic-io/spectral";

export const redisConnection = connection({
  key: "redis",
  display: {
    label: "Redis Connection",
    description: "Authenticate requests to a Redis server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Host",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the string value for the host of the server.",
      default: "192.168.0.1",
    },
    port: {
      label: "Port",
      placeholder: "Port",
      type: "string",
      required: true,
      shown: true,
      comments: "The port of the redis server.",
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: true,
      shown: true,
    },
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: false,
      shown: true,
    },
    db: {
      label: "Database",
      placeholder: "Database",
      type: "string",
      required: false,
      shown: true,
      comments: "Select a logical database to connect to.",
      example: "0",
    },
    useTls: {
      label: "Use TLS",
      type: "boolean",
      required: false,
      shown: true,
      comments: "Set to true to enable TLS for the connection.",
    },
    key: {
      label: "Client Key",
      type: "text",
      required: false,
      shown: true,
      comments: "Provide the client key for the TLS connection.",
    },
    cert: {
      label: "Client Certificate",
      type: "text",
      required: false,
      shown: true,
      comments: "Provide the client certificate for the TLS connection.",
    },
    ca: {
      label: "CA Certificate",
      type: "text",
      required: false,
      shown: true,
      comments:
        "Provide the CA certificate for the TLS connection. If not provided, the connection will not be verified.",
    },
  },
});

export default [redisConnection];
