import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../../inputs";
import { LIVE_API_URL, MOCK_API_URL } from "../../constants";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Calendly",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/users/me), The base URL is already included (${LIVE_API_URL}). For example, to connect to ${LIVE_API_URL}/users/me, only /users/me is entered in this field.`,
      example: "/users/me",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      util.types.toBool(connection.fields.useLiveServer)
        ? LIVE_API_URL
        : MOCK_API_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
});

export default rawRequest;
