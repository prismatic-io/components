import {
  type ConnectionInput,
  oauth2Connection,
  OAuth2Type,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

export const oauthClientCredentials = oauth2Connection({
  key: "firstResonanceOauthClientCredentials",
  display: {
    label: "OAuth 2.0 Client Credentials",
    description:
      "Authenticate against the First Resonance ION API using OAuth 2.0 Client Credentials.",
  },
  oauth2Type: OAuth2Type.ClientCredentials,
  inputs: templateConnectionInputs(
    {
      scopes: {
        label: "Scopes",
        placeholder: "Enter scopes separated by commas",
        type: "string",
        required: false,
        shown: false,
        comments:
          "OAuth 2.0 scopes for the ION API. Leave blank to use the default scopes.",
      },
      authEndpoint: {
        label: "Auth Endpoint",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The ION Auth Endpoint URL. Select your environment based on region and whether you're using production or sandbox.",
        model: [
          {
            label: "Production",
            value: "auth.buildwithion.com/auth",
          },
          {
            label: "Sandbox",
            value: "staging-auth.buildwithion.com",
          },
          {
            label: "Production (Gov Cloud)",
            value: "auth.ion-gov.com/auth",
          },
          {
            label: "Sandbox (Gov Cloud)",
            value: "staging-auth.ion-gov.com",
          },
          {
            label: "Australia (Staging)",
            value: "staging-auth.ion-aus.com",
          },
          {
            label: "Australia",
            value: "auth.ion-aus.com/auth",
          },
          {
            label: "Development",
            value: "auth-dev-pub.buildwithion.com",
          },
        ],
      } as ConnectionInput & { model: { label: string; value: string }[] },
      clientId: {
        label: "Client ID",
        placeholder: "Enter Client ID",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The OAuth 2.0 Client ID for ION. Find this in your ION account under Settings > API Keys. [Learn more](https://manual.firstresonance.io/api/api-keys)",
        example: "my-client-id-abc123",
      },
      clientSecret: {
        label: "Client Secret",
        placeholder: "Enter Client Secret",
        type: "password",
        required: true,
        shown: true,
        comments:
          "The OAuth 2.0 Client Secret for ION. This is generated when you create an API key in your ION account under Settings > API Keys. [Learn more](https://manual.firstresonance.io/api/api-keys)",
      },
    },
    {
      tokenUrl: {
        label: "Token URL",
        placeholder: "Enter Token URL",
        type: "template",
        comments:
          "The OAuth 2.0 Token URL for ION. This is automatically constructed from your selected Auth Endpoint.",
        templateValue:
          "https://{{#authEndpoint}}/realms/api-keys/protocol/openid-connect/token",
      },
    },
    OAuth2Type.ClientCredentials,
  ),
});

export default [oauthClientCredentials];
