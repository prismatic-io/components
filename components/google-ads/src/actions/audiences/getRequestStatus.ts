import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../../client";
import { getRequestStatusExamplePayload } from "../../examplePayloads";
import { getRequestStatusInputs } from "../../inputs";
import { getRequestStatusOutputSchema } from "../../outputSchemas";

export const getRequestStatus = action({
  display: {
    label: "Get Request Status",
    description:
      "Retrieves the processing status of a Data Manager request, per destination, from an audience or offline conversion upload.",
  },
  inputs: getRequestStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRequestStatusOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, requestId }) => {
    const client = createDataManagerClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.get("/requestStatus:retrieve", {
      params: { requestId },
    });
    return { data };
  },
  examplePayload: getRequestStatusExamplePayload,
});
