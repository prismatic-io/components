import { connection, input } from "@prismatic-io/spectral";
export const basicAuthConnection = connection({
  key: "basicAuth",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and password.",
  },
  inputs: {
    serverUrl: input({
      label: "Server URL",
      type: "string",
      required: true,
      shown: true,
      comments: "The Oracle HCM Cloud instance URL.",
      placeholder: "Enter server URL",
      example: "https://acme.fa.us2.oraclecloud.com",
    }),
    username: input({
      label: "Username",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Oracle HCM Cloud username with Integration Specialist or HCM Integration Role.",
      placeholder: "Enter username",
      example: "integration.user@example.com",
    }),
    password: input({
      label: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "The password for the Oracle HCM Cloud user account.",
      placeholder: "Enter password",
    }),
  },
});
