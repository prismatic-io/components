import { action, input } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft Outlook.",
  },
  inputs: {
    connection: input({
      type: "connection",
      label: "Connection",
      required: true,
      comments: "The Microsoft Outlook connection to use.",
    }),
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "The path of the Microsoft Graph endpoint to call (e.g., `/me/calendars`). The base URL `https://graph.microsoft.com/v1.0` is added automatically. For example, to call `https://graph.microsoft.com/v1.0/me/calendars`, enter `/me/calendars`.",
      example: "/me/calendars",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      "https://graph.microsoft.com/v1.0",
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
        headers: [
          ...rawRequestInputs.headers,
          { key: "Accepts", value: "application/json" },
          { key: "Content-type", value: "application/json" },
        ],
      },
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
