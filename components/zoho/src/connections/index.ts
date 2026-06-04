import {
  input,
  OAuth2Type,
  oauth2Connection,
  templateConnectionInputs,
} from "@prismatic-io/spectral";

const zohoRegions = [
  {
    tld: "https://accounts.zoho.eu",
    location: "Europe",
  },
  { tld: "https://accounts.zoho.ae", location: "United Arab Emirates" },
  { tld: "https://accounts.zoho.com.au", location: "Australia" },
  { tld: "https://accounts.zoho.in", location: "India" },
  { tld: "https://accounts.zoho.jp", location: "Japan" },
  { tld: "https://accounts.zoho.uk", location: "United Kingdom" },
  { tld: "https://accounts.zoho.com", location: "United States" },
  { tld: "https://accounts.zohocloud.ca", location: "Canada" },
  { tld: "https://accounts.zoho.sa", location: "Saudi Arabia" },
];

export const clientId = input({
  label: "Client ID",
  placeholder: "Enter Client ID",
  type: "string",
  required: true,
  shown: true,
  comments:
    "The Client ID for the Zoho API application. Generate this in the [Zoho API Console](https://api-console.zoho.com/).",
  example: "1000.ABC123XYZ456DEF789",
});

export const clientSecret = input({
  label: "Client Secret",
  placeholder: "Enter Client Secret",
  type: "password",
  required: true,
  shown: true,
  comments:
    "The Client Secret for the Zoho API application. Generate this in the [Zoho API Console](https://api-console.zoho.com/).",
  example: "1234567890abcdef1234567890abcdef12345678",
});

export const scopes = input({
  label: "Scopes",
  placeholder: "Enter space-separated scopes",
  type: "string",
  required: true,
  shown: true,
  comments:
    "Space-separated OAuth 2.0 permission scopes for the Zoho API. Can combine [Zoho CRM](https://www.zoho.com/crm/developer/docs/api/v8/scopes.html) and [Zoho Books](https://www.zoho.com/books/api/v3/oauth/#overview) scopes.",
  default: [
    
    "ZohoCRM.coql.READ",
    "ZohoCRM.notifications.ALL",
    "ZohoCRM.users.ALL",
    "ZohoCRM.org.ALL",
    "ZohoCRM.settings.ALL",
    "ZohoCRM.modules.ALL",
    "ZohoCRM.bulk.ALL",
    
    "ZohoBooks.fullaccess.all",
  ].join(" "),
  example: "ZohoCRM.modules.ALL ZohoBooks.fullaccess.all",
});

export const ZohoConnection = oauth2Connection({
  key: "oauth2",
  display: {
    label: "OAuth 2.0 (Deprecated)",
    description: "Authenticate using OAuth 2.0. (Deprecated)",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: {
    authorizeUrl: {
      label: "Authorize URL",
      placeholder: "Authorize URL",
      type: "string",
      required: true,
      shown: true,
      model: zohoRegions.map(({ tld, location }) => ({
        label: `${location} (${tld}/oauth/v2/auth)`,
        value: `${tld}/oauth/v2/auth?access_type=offline&prompt=consent`,
      })),
      comments: "The OAuth 2.0 Authorization URL for the Zoho region.",
    },
    tokenUrl: {
      label: "Token URL",
      placeholder: "Token URL",
      type: "string",
      required: true,
      shown: true,
      model: zohoRegions.map(({ tld, location }) => ({
        label: `${location} (${tld}/oauth/v2/token)`,
        value: `${tld}/oauth/v2/token`,
      })),
      comments: "The OAuth 2.0 Token URL for the Zoho region.",
    },
    scopes,
    revokeUrl: {
      label: "Refresh Token Revoke URL",
      placeholder: "Revoke URL",
      type: "string",
      required: false,
      shown: true,
      model: zohoRegions.map(({ tld, location }) => ({
        label: `${location} (${tld}/oauth/v2/token/revoke)`,
        value: `${tld}/oauth/v2/token/revoke`,
      })),
      comments: "The OAuth 2.0 Token Revocation URL for the Zoho region.",
    },
    clientId,
    clientSecret,
  },
});

export const zohoTemplatedConnection = oauth2Connection({
  key: "zohoTemplatedConnection",
  display: {
    label: "OAuth 2.0",
    description: "Authenticate using OAuth 2.0.",
  },
  oauth2Type: OAuth2Type.AuthorizationCode,
  inputs: templateConnectionInputs(
    {
      zohoRegion: {
        label: "Region URL",
        placeholder: "Enter Zoho region URL",
        example: "https://accounts.zoho.com",
        type: "string",
        required: true,
        shown: true,
        comments:
          "The base [URL](https://accounts.zoho.com/oauth/serverinfo) of the Zoho region to connect to.",
      },
      scopes,
      clientId,
      clientSecret,
    },
    {
      authorizeUrl: {
        label: "Authorize URL",
        placeholder: "Authorize URL",
        type: "template",
        required: true,
        shown: false,
        templateValue: "{{#zohoRegion}}/oauth/v2/auth?access_type=offline&prompt=consent",
        example: "https://accounts.zoho.com/oauth/v2/auth?access_type=offline&prompt=consent",
        comments: "The OAuth 2.0 Authorization URL for the selected Zoho region.",
      },
      tokenUrl: {
        label: "Token URL",
        placeholder: "Token URL",
        type: "template",
        required: true,
        shown: false,
        templateValue: "{{#zohoRegion}}/oauth/v2/token",
        example: "https://accounts.zoho.com/oauth/v2/token",
        comments:
          "The OAuth 2.0 Token [URL](https://accounts.zoho.com/oauth/serverinfo) for the selected Zoho region.",
      },
      revokeUrl: {
        label: "Refresh Token Revoke URL",
        placeholder: "Revoke URL",
        type: "template",
        required: false,
        shown: false,
        templateValue: "{{#zohoRegion}}/oauth/v2/token/revoke",
        example: "https://accounts.zoho.com/oauth/v2/token/revoke",
        comments: "The OAuth 2.0 Token Revocation URL for the selected Zoho region.",
      },
    },
    OAuth2Type.AuthorizationCode,
  ),
});

export default [zohoTemplatedConnection, ZohoConnection];
