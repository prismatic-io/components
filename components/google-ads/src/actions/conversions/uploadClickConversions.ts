import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { uploadConversionGenericResponseExamplePayload } from "../../examplePayloads";
import { uploadClickConversionsInputs } from "../../inputs";

export const uploadClickConversions = action({
  display: {
    label: "Upload Click Conversions",
    description:
      "Upload offline click conversions into Google Ads in order to track ads that led to sales. This action will stop working after June 15, 2026. Use Ingest Offline Conversions instead.",
  },
  inputs: uploadClickConversionsInputs,
  perform: async (
    context,
    { connection, customerId, managerCustomerId, conversions, validateOnly },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
      managerCustomerId,
    );
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
  examplePayload: uploadConversionGenericResponseExamplePayload,
});
