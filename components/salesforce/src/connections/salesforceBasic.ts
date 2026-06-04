import { connection } from "@prismatic-io/spectral";

export const salesforceBasic = connection({
  key: "basic",
  display: {
    label: "Basic Authentication",
    description: "Authenticate requests using Basic Authentication.",
  },
  inputs: {
    username: {
      label: "Username",
      placeholder: "Enter username",
      example: "myUser",
      type: "string",
      required: true,
      shown: true,
      comments: "The username of the Salesforce account",
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      shown: true,
      comments: "The password of the Salesforce account",
    },
    loginUrl: {
      label: "Login URL",
      placeholder: "Enter login URL",
      type: "string",
      required: true,
      shown: true,
      comments:
        "The Salesforce Login URL for Basic Authentication (e.g., https://login.salesforce.com or a custom My Domain URL).",
      example: "https://my-company.my.salesforce.com/",
    },
  },
});
