import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSharedDocumentsExamplePayload } from "../../examplePayloads";
import { listSharedDocumentsInputs } from "../../inputs";
import { listSharedDocumentsOutputSchema } from "../../outputSchemas";

export const listSharedDocuments = action({
  display: {
    label: "List Shared Documents",
    description: "Lists documents shared with the user.",
  },
  inputs: listSharedDocumentsInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/me/insights/shared");
    return { data };
  },
  examplePerform: async () => listSharedDocumentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSharedDocumentsOutputSchema,
  }),
  examplePayload: listSharedDocumentsExamplePayload,
});
