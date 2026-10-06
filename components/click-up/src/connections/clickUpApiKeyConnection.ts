import { connection } from "@prismatic-io/spectral";
export const clickUpApiKeyConnection = connection({
  key: "apiKey",
  display: {
    label: "Personal Access Token",
    description: "Authenticate using a personal access token.",
  },
  inputs: {
    apiKey: {
      label: "Personal Access Token",
      placeholder: "Enter Personal Access Token",
      type: "password",
      required: true,
      shown: true,
      example: "pk_123456_ABC123DEF456GHI789",
      comments:
        "The ClickUp Personal Access Token used to authenticate API requests. Generate one in ClickUp Settings > Apps > API Token. See the [ClickUp Authentication docs](https://developer.clickup.com/docs/authentication) for details.",
    },
  },
});
