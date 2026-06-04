import { connection } from "@prismatic-io/spectral";
import { API_VERSION } from "./constants";

export const authentication = connection({
  key: "sap-business-one-auth",
  display: {
    description: "Authentication for SAP Business One",
    label: "SAP Business One Authentication",
  },
  inputs: {
    username: {
      label: "Username",
      type: "string",
      required: true,
      placeholder: "Enter SAP Business One username",
      example: "TestUser",
      comments: "The SAP Business One username for authentication.",
    },
    password: {
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter SAP Business One password",
      example: "Password",
      comments: "The SAP Business One password for authentication.",
    },
    serverAddress: {
      label: "Server Address",
      type: "string",
      required: false,
      placeholder: "Enter server address with port",
      example: "https://sapb1-server.example.com:50000",
      comments:
        "The URL of the SAP Business One Service Layer server, including the port (e.g., https://sapb1-server.example.com:50000). Required for non-OnPrem connections. See [SAP Business One Service Layer documentation](https://help.sap.com/doc/0d2533ad95ba4ad7a702e83570a21c32/9.3/en-US/Working_with_SAP_Business_One_Service_Layer.pdf) for details.",
    },
    dbInstance: {
      label: "Database Instance",
      type: "string",
      required: false,
      placeholder: "Enter database instance",
      example: "C200@10.58.114.200:30013",
      comments:
        "The SAP HANA database instance to connect to, in the format DatabaseName@Host:Port.",
    },
    companyName: {
      label: "Company Name",
      type: "string",
      required: false,
      placeholder: "Enter company name",
      example: "SBODEMOUS",
      comments: "The company database name to connect to in SAP Business One.",
    },
    host: {
      label: "Host",
      placeholder: "Enter host address",
      type: "string",
      required: false,
      shown: false,
      comments: "The IP address or hostname of your On-Prem server.",
      example: "sapb1-onprem.example.io",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port number",
      type: "string",
      required: false,
      shown: false,
      comments: "The port number of your On-Prem server.",
      example: "50000",
      onPremControlled: true,
    },
    apiVersion: {
      label: "API Version",
      type: "string",
      required: false,
      default: API_VERSION.V1,
      model: [
        { label: "v2 (OData 4.0)", value: API_VERSION.V2 },
        { label: "v1 (OData 3.0)", value: API_VERSION.V1 },
      ],
      comments:
        "The Service Layer API version to use. v2 (OData 4.0) is recommended for new integrations and provides improved functionality. v1 (OData 3.0) is available for backwards compatibility with existing integrations.",
    },
  },
});

export default [authentication];
