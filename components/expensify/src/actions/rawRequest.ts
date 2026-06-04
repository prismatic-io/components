import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { baseUrl, validateConnection } from "../client";
import { generatePayload } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the Expensify API",
  },
  inputs: {
    connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "This input is not required as the Expensify API is a single endpoint.",
      example: "",
      required: false,
    },
  },
  perform: async (context, { connectionInput, ...rawRequestInputs }) => {
    validateConnection(connectionInput);
    const { data: inputData } = rawRequestInputs;

    const generatedJson = generatePayload(
      inputData as Record<string, unknown>,
      connectionInput,
    );
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        data: generatedJson,
        debugRequest: context.debug.enabled,
      },
      {
        Accept: "application/json",
      },
    );
    return { data };
  },
});
