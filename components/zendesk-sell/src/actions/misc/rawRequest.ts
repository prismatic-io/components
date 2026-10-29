import { action, input, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL, BASE_URL_V3 } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connection } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Zendesk Sell API.",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: { ...rawRequestInputs.url, example: "/tasks" },
    version: input({
      label: "API Version",
      comments: "The version of the API to use.",
      type: "string",
      required: true,
      clean: util.types.toString,
      default: "v2",
      model: [
        { label: "v2", value: "v2" },
        { label: "v3", value: "v3" },
      ],
    }),
  },
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    try {
      const { data } = await sendRawRequest(
        version === "v2" ? BASE_URL : BASE_URL_V3,
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        { Authorization: `Bearer ${connection?.token?.access_token}` },
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
