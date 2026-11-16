import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDriveExamplePayload } from "../../examplePayloads";
import { getDriveInputs } from "../../inputs";
import { getDriveOutputSchema } from "../../outputSchemas";

export const getDrive = action({
  display: {
    label: "Get Drive",
    description: "Returns the information and metadata of a SharePoint drive.",
  },
  inputs: getDriveInputs,
  performSafety: "safe",
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/drives/${params.driveId}`);
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDriveOutputSchema,
  }),
  examplePayload: getDriveExamplePayload,
});
