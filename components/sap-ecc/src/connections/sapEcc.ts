import { onPremConnection } from "@prismatic-io/spectral";

export const sapEcc = onPremConnection({
  key: "sapEcc",
  display: {
    label: "On-Premise Connection",
    description: "Authenticate requests to an SAP ECC server.",
  },
  inputs: {
    host: {
      label: "Host",
      placeholder: "Enter host",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The hostname or IP address of the SAP ECC server (e.g., sap-ecc.internal).",
      example: "sap-ecc.internal",
      onPremControlled: true,
    },
    port: {
      label: "Port",
      placeholder: "Enter port",
      type: "string",
      required: true,
      shown: true,
      comments: "The HTTPS port of the SAP ECC server.",
      default: "44300",
      onPremControlled: true,
    },
    sapClient: {
      label: "SAP Client",
      placeholder: "Enter SAP client number",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The SAP client number to connect to (e.g., 100). This is sent as the sap-client query parameter.",
      example: "100",
    },
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "string",
      required: true,
      shown: true,
      comments: "The SAP username for authentication.",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments: "The SAP password for authentication.",
    },
  },
});
