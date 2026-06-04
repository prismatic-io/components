import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { batchRequestPayload } from "../../examplePayloads";
import { batchRequestItems, connectionInput } from "../../inputs";

export const batchRequest = action({
  display: {
    label: "Batch Request",
    description: "Perform a batch request against the QuickBooks API.",
  },
  perform: async (context, { connection, batchRequestItems }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const body = {
      BatchItemRequest: batchRequestItems,
    };

    const { data } = await client.post("/batch", body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    batchRequestItems,
  },
  examplePayload: batchRequestPayload,
});
