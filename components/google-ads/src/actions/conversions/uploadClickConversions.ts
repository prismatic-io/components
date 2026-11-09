import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { uploadClickConversionsExamplePayload } from "../../examplePayloads";
import { uploadClickConversionsInputs } from "../../inputs";
import { uploadClickConversionsOutputSchema } from "../../outputSchemas";

export const uploadClickConversions = action({
  display: {
    label: "Upload Click Conversions",
    description:
      "Uploads offline click conversions into Google Ads to track ads that led to sales. Since June 15, 2026, Google rejects these requests from API clients that had not uploaded offline conversions before that date; new integrations should use Ingest Offline Conversions (Data Manager API) instead.",
  },
  inputs: uploadClickConversionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadClickConversionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      managerCustomerId,
      conversions,
      validateOnly,
      linkedCustomerId,
    },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
      linkedCustomerId,
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
  examplePerform: async (): Promise<{ data: unknown }> =>
    uploadClickConversionsExamplePayload,
  examplePayload: uploadClickConversionsExamplePayload,
});
