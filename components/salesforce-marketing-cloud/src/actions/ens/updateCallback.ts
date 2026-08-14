import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { updateCallbackExamplePayload } from "../../examplePayloads";
import { updateCallbackInputs } from "../../inputs";
import { updateCallbackOutputSchema } from "../../outputSchemas";
export const updateCallback = action({
  examplePayload: updateCallbackExamplePayload,
  display: {
    label: "Update ENS Callback",
    description:
      "Update an Event Notification Service (ENS) callback endpoint. Changes may take up to 2 minutes to become active.",
  },
  inputs: updateCallbackInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCallbackOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, callbackId, callbackName, callbackUrl, maxBatchSize },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body: Record<string, unknown> = { callbackId };
    if (callbackName) body.callbackName = callbackName;
    if (callbackUrl) body.url = callbackUrl;
    if (maxBatchSize) body.maxBatchSize = maxBatchSize;
    const { data } = await client.put(ENS_CALLBACKS_PATH, [body]);
    return { data };
  },
  examplePerform: async (
    _context,
    { callbackId, callbackName, callbackUrl, maxBatchSize },
  ): Promise<{
    data: unknown;
  }> => ({
    data: [
      {
        ...updateCallbackExamplePayload.data[0],
        callbackId,
        callbackName:
          callbackName ?? updateCallbackExamplePayload.data[0].callbackName,
        url: callbackUrl ?? updateCallbackExamplePayload.data[0].url,
        maxBatchSize:
          maxBatchSize ?? updateCallbackExamplePayload.data[0].maxBatchSize,
      },
    ],
  }),
});
