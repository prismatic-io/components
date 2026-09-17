import {
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";
export const clientCredentials = oauth2Connection({
  key: "serviceNowClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description: "OAuth 2.0 Client Credentials flow",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: templateConnectionInputs(
    {
      instanceUrl: {
        label: "Instance URL",
        placeholder: "Instance URL",
        type: "string",
        required: true,
        shown: true,
        example: "https://dev12345.service-now.com",
        comments:
          "The base URL of your ServiceNow instance (e.g., https://dev12345.service-now.com)",
      },
      clientId: {
        label: "Client ID",
        placeholder: "Client ID",
        type: "string",
        required: true,
        shown: true,
        comments: "Client Identifier of your app for ServiceNow",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments: "Client Secret of your app for ServiceNow",
      },
      scopes: {
        label: "Scopes",
        placeholder: "Scopes",
        type: "string",
        required: false,
        shown: true,
        comments: "Space separated OAuth 2.0 permission scopes for ServiceNow",
        default: "",
      },
    },
    {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        templateValue: "{{#instanceUrl}}/oauth_token.do",
      },
    },
    OAuth2Type.ClientCredentials,
  ),
});
