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
      placeholder: "qualys-api-user",
      type: "string",
      required: true,
      shown: true,
      comments: "Qualys platform username.",
      example: "qualys-api-user",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments: "Qualys platform password.",
      example: "s3cur3P@ss",
    },
    gatewayUrl: {
      label: "Gateway API URL",
      placeholder: "https://gateway.qg1.apps.qualys.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Base URL for the Qualys Gateway (CSAM/GAV) API. Find the pod URL at [Platform Identification](https://www.qualys.com/platform-identification).",
      example: "https://gateway.qg1.apps.qualys.com",
    },
    classicUrl: {
      label: "Classic API URL",
      placeholder: "https://qualysapi.qg1.apps.qualys.com",
      type: "string",
      required: true,
      shown: true,
      comments:
        "Base URL for the Qualys Classic (VM/PC) API. Find the pod URL at [Platform Identification](https://www.qualys.com/platform-identification).",
      example: "https://qualysapi.qg1.apps.qualys.com",
    },
  },
});
