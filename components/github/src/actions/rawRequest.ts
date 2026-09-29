import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl } from "../client";
import { rawRequestExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;
const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to GitHub.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/octocat), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/octocat, only /octocat is entered in this field.`,
      example: "/octocat",
    },
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...rawRequestInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection.token?.access_token}`,
        },
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});
export default {
  rawRequest,
};
