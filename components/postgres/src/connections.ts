import { onPremConnection, util } from "@prismatic-io/spectral";

export const postgresConnection = onPremConnection({
  key: "postgres",
  display: {
    label: "PostgreSQL Connection",
    description: "Authenticate requests to a PostgreSQL server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Host",
      type: "string",
      required: true,
      shown: true,
      comments: "Provide the string value for the host of the server.",
      example: "192.168.0.1",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Port",
      type: "string",
      default: "5432",
      required: true,
      shown: true,
      comments: "The port of the PostgreSQL server.",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Database",
      type: "string",
      required: true,
      shown: true,
      comments: "The database in PostgreSQL",
      example: "admin",
    },
    username: {
      label: "Username",
      placeholder: "Username",
      type: "string",
      required: false,
      shown: true,
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      required: false,
      shown: true,
    },
    requireSSL: {
      label: "Require SSL",
      comments: "Require SSL for the connection to the PostgreSQL server",
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
