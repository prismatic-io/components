import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { HARVEST_BASE_URL } from "../../../constants";
import { rawRequestExamplePayload } from "../../../examplePayloads";
import { connectionInput, version } from "../../../inputs";
import { generateBasicAuth } from "../../../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request (Harvest v1/v2)",
    description: "Sends a raw HTTP request to Greenhouse.",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments: `Input the path only (/jobs), The base URL is already included (${HARVEST_BASE_URL}/{version}). For example, to connect to ${HARVEST_BASE_URL}/v1/jobs, only /jobs is entered in this field.`,
      example: "/jobs",
    },
  },
  perform: async (context, { connection, version, ...httpClientInputs }) => {
    const url = `${HARVEST_BASE_URL}/${version}`;
    const authorization = generateBasicAuth(connection);
    const { data } = await sendRawRequest(
      url,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
