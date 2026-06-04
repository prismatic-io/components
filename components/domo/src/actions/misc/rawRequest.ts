import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getToken } from "../../client";
import { BASE_URL } from "../../constants";
import { connection } from "../../inputs";
import { rawRequestExamplePayload } from "../../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the Domo API.",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: connection,
    ...rawRequestInputs,
    url: { ...rawRequestInputs.url, example: "/datasets" },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const domoToken = await getToken(connection, context.debug.enabled);
    const { data } = await sendRawRequest(
      BASE_URL,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${domoToken}`,
      },
    );
    return { data };
  },
});

export default { rawRequest };
