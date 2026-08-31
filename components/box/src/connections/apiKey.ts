import { connection } from "@prismatic-io/spectral";
export const apiKey = connection({
  key: "apiKey",
  display: {
    label: "Developer Token",
    description: "Authenticate requests using a developer token.",
  },
  inputs: {
    apiKey: {
      label: "Developer Token",
      placeholder: "Enter developer token",
      type: "password",
      required: true,
      shown: true,
      comments:
        "A short-lived developer token for testing purposes. Obtain from [Box Developer Console](https://app.box.com/developers/console).",
      example: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
    },
  },
});
