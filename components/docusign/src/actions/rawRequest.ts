import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs";
import { getBaseUrl } from "../client";
import { DEVELOPMENT_API_URL, LIVE_API_URL } from "../constants";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to DocuSign.",
  },
  inputs: {
    connection,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments: `Input the path only (/ACCOUNT_ID/folders), The base URL is already included (${LIVE_API_URL} for live environment or ${DEVELOPMENT_API_URL} for development). For example, to connect to ${LIVE_API_URL}/ACCOUNT_ID/folders, only /ACCOUNT_ID/folders is entered in this field.`,
      example: "/ACCOUNT_ID/folders",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { data } = await sendRawRequest(
      await getBaseUrl(connection, false),
      httpClientInputs,
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
});
