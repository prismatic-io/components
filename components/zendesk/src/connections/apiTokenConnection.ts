import { connection, templateConnectionInputs } from "@prismatic-io/spectral";
export const apiTokenConnection = connection({
  key: "apiToken",
  display: {
    label: "API Token",
    description: "Authenticate requests using an API token.",
  },
  inputs: templateConnectionInputs(
    {
      zendeskDomain: {
        label: "Zendesk Sub Domain",
        placeholder: "acme-inc",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Zendesk sub domain. For example, if the Zendesk URL is https://acme-inc.zendesk.com, the sub domain is acme-inc.",
        example: "acme-inc",
      },
      username: {
        label: "Username",
        placeholder: "john.doe@example.com",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The Zendesk username. This is the email address used to sign in to Zendesk.",
        example: "john.doe@example.com",
      },
      apiToken: {
        label: "API Token",
        placeholder: "your-api-token",
        type: "password",
        required: true,
        shown: true,
        comments: "The API token generated in Zendesk.",
        example: "your-api-token",
      },
    },
    {
      domain: {
        label: "Zendesk Domain",
        type: "template",
        templateValue: "https://{{#zendeskDomain}}.zendesk.com",
      },
    },
  ),
});
