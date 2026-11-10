import { input } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: input({
    type: "connection",
    label: "Connection",
    required: true,
    comments: "The Microsoft Outlook connection to use.",
  }),
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "The path of the Microsoft Graph endpoint to call (e.g., `/me/calendars`). The base URL `https://graph.microsoft.com/v1.0` is added automatically. For example, to call `https://graph.microsoft.com/v1.0/me/calendars`, enter `/me/calendars`.",
    example: "/me/calendars",
  },
};
