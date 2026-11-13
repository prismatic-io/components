import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getDriveExamplePayload } from "../../examplePayloads";
import { getDriveInputs } from "../../inputs";
import { getDriveOutputSchema } from "../../outputSchemas";

export const getDrive = action({
  display: {
    label: "Get Drive",
    description: "Gets the information and metadata of a drive.",
  },
  performSafety: "safe",
  perform: async (context, { connection, driveId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/drives/${driveId}`)),
    };
  },
  inputs: getDriveInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDriveOutputSchema,
  }),
  examplePayload: getDriveExamplePayload,
});
