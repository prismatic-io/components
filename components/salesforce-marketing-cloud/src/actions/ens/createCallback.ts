import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { createCallbackExamplePayload } from "../../examplePayloads";
import { createCallbackInputs } from "../../inputs";
import { createCallbackOutputSchema } from "../../outputSchemas";
export const createCallback = action({
  examplePayload: createCallbackExamplePayload,
  display: {
    label: "Create ENS Callback",
    description:
      "Register a new Event Notification Service (ENS) callback endpoint.",
  },
  inputs: createCallbackInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCallbackOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, callbackName, callbackUrl, maxBatchSize },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = [
      {
        callbackName,
        url: callbackUrl,
        maxBatchSize: maxBatchSize,
      },
    ];
    const { data } = await client.post(ENS_CALLBACKS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { callbackName, callbackUrl, maxBatchSize },
  ): Promise<{
    data: unknown;
  }> => ({
    data: [
      {
        ...createCallbackExamplePayload.data[0],
        callbackName,
        url: callbackUrl,
        maxBatchSize:
          maxBatchSize ?? createCallbackExamplePayload.data[0].maxBatchSize,
      },
    ],
  }),
});
