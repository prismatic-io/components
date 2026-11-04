import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../../client";
import { BASE_URL } from "../../constants";
import { rawRequestInputs } from "../../inputs";
import { generatePayload } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to the Expensify API.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, ...rawRequestInputs }) => {
    validateConnection(connectionInput);
    const { data: inputData } = rawRequestInputs;
    const jobDescription: Record<string, unknown> =
      typeof inputData === "string"
        ? inputData.trim()
          ? JSON.parse(inputData)
          : {}
        : ((inputData as Record<string, unknown>) ?? {});

    const generatedJson = generatePayload(jobDescription, connectionInput);
    const { data } = await sendRawRequest(
      BASE_URL,
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
