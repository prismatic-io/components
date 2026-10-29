import { connection, input } from "@prismatic-io/spectral";

export const jamfBearerToken = connection({
  key: "jamfBearerToken",
  display: {
    label: "Basic Authentication",
    description: "Authenticate using username and password.",
  },
  inputs: {
    baseUrl: input({
      label: "Jamf Pro URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The base URL of the Jamf Pro instance (e.g., https://acme.jamfcloud.com).",
      placeholder: "Enter Jamf Pro URL (e.g., https://acme.jamfcloud.com)",
      example: "https://acme.jamfcloud.com",
    }),
    username: input({
      label: "Username",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Jamf Pro user account username. SSO accounts cannot be used for API authentication.",
      placeholder: "Enter Jamf Pro username",
      example: "admin",
    }),
    password: input({
      label: "Password",
      type: "password",
      required: true,
      shown: true,
      comments: "The Jamf Pro user account password.",
    }),
  },
});
