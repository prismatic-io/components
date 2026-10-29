import { connection } from "@prismatic-io/spectral";

export const mongoConnection = connection({
  key: "mongo",
  display: {
    label: "Mongo Connection",
    description: "Authenticate requests to a MongoDB server.",
  },
  comments: "Authenticate requests to a MongoDB server.",
  inputs: {
    connectionString: {
      label: "Cluster Connection String",
      type: "string",
      required: true,
      shown: true,
      comments:
        'The connection string to use for connecting to a Mongo cluster. From the "Database Deployments" screen, click "Connect" next to a cluster to view the connection string. Refer to https://www.mongodb.com/docs/manual/reference/connection-string/ for details on format and configuration options.',
      example:
        "mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    },
    database: {
      label: "Database",
      placeholder: "Database",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of your database.",
      example: "admin",
    },
    collection: {
      label: "Collection",
      placeholder: "Collection",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of your collection.",
      example: "customers",
    },
    useV4: {
      label: "Use Mongo v4",
      comments:
        "Use the older NodeJS v4 driver which is compatible with older MongoDB installations. This component defaults to using the v6 NodeJS driver.",
      type: "boolean",
      default: "false",
      shown: true,
      required: false,
    },
  },
});

export default [mongoConnection];
