import { action, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { getToken } from "../client";
import {
  handleErrors,
  sendRawRequest,
  inputs as httpClientInputs,
} from "@prismatic-io/spectral/dist/clients/http";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Docs",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/v1/documents/{documentId}), The base URL is already included (https://docs.googleapis.com). For example, to connect to https://docs.googleapis.com/v1/documents/{documentId}, only /v1/documents/{documentId} is entered in this field.",
      example: "/v1/documents/{documentId}",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const token = getToken(connection);
    try {
      const { data } = await sendRawRequest(
        "https://docs.googleapis.com",
        httpClientInputs,
        { Authorization: `Bearer ${token}` }
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
