import { onPremConnection } from "@prismatic-io/spectral";

export const mySQLConnection = onPremConnection({
  key: "mySQL",
  display: {
    label: "On-Premise Connection",
    description: "Authenticate requests to a MySQL server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Enter hostname",
      type: "string",
      required: true,
      shown: true,
      comments: "The publicly-accessible address of the MySQL server.",
      default: "my-server.example.com",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port number",
      type: "string",
      required: true,
      shown: true,
      comments: "The port the database server is exposing.",
      default: "3306",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Enter database name",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of the MySQL database to connect to.",
    },
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "string",
      required: false,
      shown: true,
      comments: "The username for authenticating with the MySQL server.",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: false,
      shown: true,
      comments: "The password for authenticating with the MySQL server.",
    },
  },
});

export default [mySQLConnection];
