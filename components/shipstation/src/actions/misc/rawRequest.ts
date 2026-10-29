import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthorization, validateConnection } from "../../client";
import { BASE_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to the ShipStation API.",
  },
  inputs: {
    ...rawRequestInputs,
    connectionInput,
    url: {
      ...httpClientInputs.url,
      example: "/stores",
      placeholder: "/stores",
    },
  },
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connectionInput, ...httpClientInputs }) => {
    validateConnection(connectionInput);
    const authorization = getAuthorization(connectionInput);

    const { data } = await sendRawRequest(
      BASE_URL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    );
    return { data };
  },
});
