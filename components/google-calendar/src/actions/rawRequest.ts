import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAccessToken } from "../client";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Calendar",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/colors), The base URL is already included (https://www.googleapis.com/calendar/v3). For example, to connect to https://www.googleapis.com/calendar/v3/colors, only /colors is entered in this field.",
      example: "/colors",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const accessToken = getAccessToken({ connection });
    try {
      const { data } = await sendRawRequest(
        "https://www.googleapis.com/calendar/v3",
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        { Authorization: `Bearer ${accessToken}` }
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
