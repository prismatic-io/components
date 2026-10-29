import { onPremConnection, util } from "@prismatic-io/spectral";

export const postgresConnection = onPremConnection({
  key: "postgres",
  display: {
    label: "On-Premise Connection",
    description: "Authenticate requests to a PostgreSQL server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Enter the server host",
      type: "string",
      required: true,
      shown: true,
      comments: "The hostname or IP address of the PostgreSQL server.",
      example: "192.168.0.1",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter the server port",
      type: "string",
      default: "5432",
      required: true,
      shown: true,
      comments: "The port of the PostgreSQL server.",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Enter the database name",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of the database to connect to.",
      example: "admin",
    },
    username: {
      label: "Username",
      placeholder: "Enter the username",
      type: "string",
      required: false,
      shown: true,
      comments: "The username used to authenticate to the PostgreSQL server.",
    },
    password: {
      label: "Password",
      placeholder: "Enter the password",
      type: "password",
      required: false,
      shown: true,
      comments: "The password used to authenticate to the PostgreSQL server.",
    },
    requireSSL: {
      label: "Require SSL",
      comments:
        "When true, requires an SSL connection to the PostgreSQL server.",
      type: "boolean",
      required: true,
      default: "false",
    },
    timeout: {
      label: "Connection Timeout",
      type: "string",
      required: false,
      comments:
        "The amount of time (in milliseconds) to wait for a connection to be" +
        " established before timing out. Default is 5000ms.",
      default: "5000",
      clean: util.types.toNumber,
    },
  },
});

export default [postgresConnection];
