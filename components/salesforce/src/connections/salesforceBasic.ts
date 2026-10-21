import { connection } from "@prismatic-io/spectral";
export const salesforceBasic = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate requests using Basic Authentication.",
  },
  inputs: {
    loginUrl: {
      label: "Login URL",
      placeholder: "Enter login URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Salesforce Login URL for Basic Authentication (e.g., `https://login.salesforce.com` or a custom My Domain URL).",
      example: "https://my-company.my.salesforce.com/",
      default: "https://login.salesforce.com",
    },
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "string",
      required: true,
      shown: true,
      comments: "The username of the Salesforce account",
      example: "myUser",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments:
        "The Salesforce password, or the password with the security token appended if security tokens are enabled. Reset the security token from **My Settings** > **Personal** > **Reset My Security Token**.",
    },
  },
});
