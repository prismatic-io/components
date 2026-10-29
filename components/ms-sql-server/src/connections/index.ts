import { onPremConnection } from "@prismatic-io/spectral";

export const msSQLServerConnection = onPremConnection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description:
      "Authenticate requests to a Microsoft SQL Server using a username and password.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Enter host address",
      type: "string",
      required: true,
      shown: true,
      comments: "The address of the database server.",
      example: "192.168.0.1",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port",
      type: "string",
      required: true,
      shown: true,
      comments: "The port the database server is exposing.",
      default: "1433",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Enter database name",
      type: "string",
      example: "msdb",
      required: true,
      comments: "The name of the database.",
      shown: true,
    },
    connectionTimeout: {
      label: "Connection Timeout",
      placeholder: "Enter connection timeout in milliseconds",
      type: "string",
      required: false,
      default: "15000",
      shown: true,
      comments:
        "The number of milliseconds before the attempt to connect is considered failed.",
      example: "15000",
    },
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "string",
      required: false,
      shown: true,
      comments: "The SQL Server login username for authentication.",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: false,
      shown: true,
      comments: "The SQL Server login password for authentication.",
    },
  },
});

export const msSQLServerAzureADConnection = onPremConnection({
  key: "azureAd",
  display: {
    label: "Azure Active Directory",
    description:
      "Authenticate requests to a Microsoft SQL Server or Azure SQL Database using Azure Active Directory service principal credentials. Compatible with Microsoft Fabric.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Enter host address",
      type: "string",
      required: true,
      shown: true,
      comments: "The address of the SQL Server or Fabric warehouse endpoint.",
      example: "my-server.database.windows.net",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port",
      type: "string",
      required: true,
      shown: true,
      comments: "The port the database server is exposing.",
      default: "1433",
      onPremControlled: true,
    },
    database: {
      label: "Database",
      placeholder: "Enter database name",
      type: "string",
      required: true,
      shown: true,
      comments: "The name of the database or Fabric warehouse.",
      example: "my-fabric-warehouse",
    },
    tenantId: {
      label: "Tenant ID",
      placeholder: "Enter tenant ID",
      type: "string",
      required: true,
      shown: true,
      comments: "The Directory (Tenant) ID from the Azure AD App Registration.",
      example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
    clientId: {
      label: "Client ID",
      placeholder: "Enter client ID",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Application (Client) ID from the Azure AD App Registration.",
      example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
    clientSecret: {
      label: "Client Secret",
      placeholder: "Enter client secret",
      type: "password",
      required: true,
      shown: true,
      comments: "The Client Secret from the Azure AD App Registration.",
    },
    connectionTimeout: {
      label: "Connection Timeout",
      placeholder: "Enter connection timeout in milliseconds",
      type: "string",
      required: false,
      default: "15000",
      shown: true,
      comments:
        "The number of milliseconds before the attempt to connect is considered failed.",
      example: "15000",
    },
  },
});

export default [msSQLServerConnection, msSQLServerAzureADConnection];
