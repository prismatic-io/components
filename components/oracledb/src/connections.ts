import { onPremConnection } from "@prismatic-io/spectral";

export const oracledbConnection = onPremConnection({
  key: "oracledbConnection",
  display: {
    label: "OracleDB Connection",
    description: "Authenticate requests to an OracleDB server.",
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
      default: "1521",
      required: true,
      shown: true,
      comments: "The port of the Oracle DB server.",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Database",
      type: "string",
      required: true,
      shown: true,
      comments: "The database SID in Oracle DB",
      example: "xe",
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
    timeout: {
      label: "Connection Timeout",
      type: "string",
      required: false,
      comments:
        "The amount of time (in seconds) to wait for a connection to be established before timing out. Default is 10 seconds.",
      default: "10",
    },
  },
});

export default [oracledbConnection];
