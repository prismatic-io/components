import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { greenhouseUrl } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connectionInput, version } from "../../inputs";
import { generateBasicAuth } from "../../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Greenhouse.",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/jobs), The base URL is already included (https://harvest.greenhouse.io/{version}). For example, to connect to https://harvest.greenhouse.io/v1/jobs, only /jobs is entered in this field.",
      example: "/jobs",
    },
  },
  perform: async (context, { connection, version, ...httpClientInputs }) => {
    const url = `${greenhouseUrl}/${version}`;
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
