import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { uploadClickConversionsExamplePayload } from "../../examplePayloads";
import { uploadClickConversionsInputs } from "../../inputs";
import { uploadClickConversionsOutputSchema } from "../../outputSchemas";
export const uploadClickConversions = action({
  display: {
    label: "Upload Click Conversions",
    description:
      "Upload offline click conversions into Google Ads in order to track ads that led to sales. This action will stop working after June 15, 2026. Use Ingest Offline Conversions instead.",
  },
  inputs: uploadClickConversionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadClickConversionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, managerCustomerId, conversions, validateOnly },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/customers/${customerId}:uploadClickConversions`,
      {
        conversions,
        partialFailure: true,
        validateOnly,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => uploadClickConversionsExamplePayload,
  examplePayload: uploadClickConversionsExamplePayload,
});
