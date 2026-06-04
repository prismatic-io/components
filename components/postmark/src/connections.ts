import { connection } from "@prismatic-io/spectral";

export const postmarkConnection = connection({
  key: "postmark",
  display: {
    label: "Postmark Token Authentication",
    description:
      "Authenticate requests to Postmark using values obtained from the developer console.",
  },
  inputs: {
    accountToken: {
      label: "Account Token",
      placeholder: "Enter Account Token",
      type: "string",
      required: true,
      shown: true,
      example: "12345678-1234-5678-1234-567812345678",
      comments:
        "Account level API token from the [Postmark API Tokens page](https://account.postmarkapp.com/api_tokens). Used for account management operations like creating servers.",
    },
    serverToken: {
      label: "Server Token",
      placeholder: "Enter Server Token",
      type: "string",
      required: false,
      shown: true,
      example: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      comments:
        "Server level API token from your Postmark server settings. Used for sending emails and managing server-specific resources. Find it under Servers > [Your Server] > API Tokens.",
    },
  },
});

export default [postmarkConnection];
