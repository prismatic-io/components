import { action, outputSchema } from "@prismatic-io/spectral";
import { cancelImportOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { cancelImportExamplePayload } from "../../examplePayloads";
import { cancelImportInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";

export const cancelImport = action({
  display: {
    label: "Cancel Import",
    description: "Cancels an active import.",
  },
  performSafety: "notAllowed",
  perform: async (context, { timeout, hubspotConnection, importId }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
      headers: { "Content-Type": "application/json" },
    });

    const { data } = await client.post(
      hubspotPaths.imports(`/${importId}/cancel`),
    );

    return { data };
  },
  inputs: cancelImportInputs,
  examplePerform: async () => ({
    data: cancelImportExamplePayload.data,
  }),
  examplePayload: cancelImportExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: cancelImportOutputSchema,
  }),
});
