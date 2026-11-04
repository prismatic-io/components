import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { createAemClient, getAemBaseUrl } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Adobe Experience Manager.",
  },
  performSafety: "notAllowed",
  inputs: rawRequestInputs,
  perform: async ({ debug: { enabled: debug } }, { connection, ...params }) => {
    const client = createAemClient(connection, debug);
    const { data } = await sendRawRequest(
      getAemBaseUrl(connection),
      { ...params, debugRequest: debug },
      (client.defaults?.headers ?? {}) as Record<string, string>,
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
