import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { searchDriveExamplePayload } from "../../examplePayloads";
import { searchDriveInputs } from "../../inputs";
import { searchDriveOutputSchema } from "../../outputSchemas";

export const searchDrive = action({
  display: {
    label: "Search Drive",
    description: "Searches the current drive for a string of text.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, search }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/me/drive/root/search(q='${search}')`),
      ),
    };
  },
  examplePerform: async () => searchDriveExamplePayload,
  inputs: searchDriveInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchDriveOutputSchema,
  }),
  examplePayload: searchDriveExamplePayload,
});
