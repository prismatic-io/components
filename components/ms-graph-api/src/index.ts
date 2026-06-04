import { action, component, input } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

import connections from "./connections";
import { rawRequestExamplePayload } from "./examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Graph API.",
  },
  inputs: {
    connection: input({
      type: "connection",
      label: "Connection",
      required: true,
      comments: "The Microsoft Graph API connection to use.",
    }),
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/me/joinedTeams), The base URL is already included (https://graph.microsoft.com/v1.0). For example, to connect to https://graph.microsoft.com/v1.0/me/joinedTeams, only /me/joinedTeams is entered in this field.",
      example: "/me/joinedTeams",
      placeholder: "Enter API path (e.g., /me/joinedTeams)",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      "https://graph.microsoft.com/v1.0",
      {
        ...rawRequestInputs,
        headers: [
          ...rawRequestInputs.headers,
          { key: "Accepts", value: "application/json" },
          { key: "Content-type", value: "application/json" },
        ],
        debugRequest: context.debug.enabled,
      },
      { Authorization: `Bearer ${connection.token.access_token}` },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});

export default component({
  key: "ms-graph-api",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-graph-api/",
  display: {
    label: "Microsoft Graph API",
    description: "Access Microsoft 365 services and data through the Microsoft Graph API.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: { error: handleErrors },
  actions: { rawRequest },
  connections,
});
