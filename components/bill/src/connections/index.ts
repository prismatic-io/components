import { connection } from "@prismatic-io/spectral";

export const billConnection = connection({
  key: "billConnection",
  display: {
    label: "Client Credentials",
    description: "Authenticate using client credentials",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Enter email address",
      type: "string",
      required: true,
      comments:
        "The username is the email address used to sign in to the API sandbox developer account.",
    },
    password: {
      label: "Password",
      type: "password",
      required: true,
      comments:
        "The password is used to sign in to the API sandbox developer account.",
    },
    organizationId: {
      label: "Organization ID",
      placeholder: "Enter organization ID",
      type: "string",
      required: true,
      comments:
        "The organization ID is a unique alphanumeric value that begins with 008.",
    },
    developerKey: {
      label: "Developer Key",
      type: "password",
      required: true,
      comments:
        "The developer key is used to uniquely identify the developer account in API requests.",
    },
    useProductionUrl: {
      label: "Use Production URL",
      type: "boolean",
      default: "true",
      comments:
        "Turn this On to use the production URL. Turn this Off to use the sandbox URL.",
    },
  },
});

export default [billConnection];
