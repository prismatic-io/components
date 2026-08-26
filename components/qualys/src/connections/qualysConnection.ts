import { connection } from "@prismatic-io/spectral";
export const qualysConnection = connection({
  key: "qualys",
  display: {
    label: "Basic Authentication",
    description: "Authenticate requests to Qualys using username and password.",
  },
  inputs: {
    username: {
      label: "Username",
      type: "string",
      required: true,
      shown: true,
      placeholder: "qualys-api-user",
      example: "qualys-api-user",
      comments: "Qualys platform username.",
    },
    password: {
      label: "Password",
      type: "password",
      required: true,
      shown: true,
      placeholder: "Enter password",
      example: "s3cur3P@ss",
      comments: "Qualys platform password.",
    },
    gatewayUrl: {
      label: "Gateway API URL",
      type: "string",
      required: true,
      shown: true,
      placeholder: "https://gateway.qg1.apps.qualys.com",
      example: "https://gateway.qg1.apps.qualys.com",
      comments:
        "Base URL for the Qualys Gateway (CSAM/GAV) API. Find the pod URL at [Platform Identification](https://www.qualys.com/platform-identification).",
    },
    classicUrl: {
      label: "Classic API URL",
      type: "string",
      required: true,
      shown: true,
      placeholder: "https://qualysapi.qg1.apps.qualys.com",
      example: "https://qualysapi.qg1.apps.qualys.com",
      comments:
        "Base URL for the Qualys Classic (VM/PC) API. Find the pod URL at [Platform Identification](https://www.qualys.com/platform-identification).",
    },
  },
});
