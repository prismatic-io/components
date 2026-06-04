import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { getAccessToken } from "../client";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Sheets",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/v4/spreadsheets/{spreadsheetId}), The base URL is already included (https://sheets.googleapis.com). For example, to connect to https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}, only /v4/spreadsheets/{spreadsheetId} is entered in this field.",
      example: "/v4/spreadsheets/{spreadsheetId}",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const accessToken = getAccessToken(connection);

    const { data } = await sendRawRequest(
      "https://sheets.googleapis.com",
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${accessToken}` },
    );
    return { data };
  },
});

export default rawRequest;
