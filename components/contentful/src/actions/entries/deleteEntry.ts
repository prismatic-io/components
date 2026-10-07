import { action, outputSchema } from "@prismatic-io/spectral";
import type { Entry, Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteEntryExamplePayload } from "../../examplePayloads";
import { deleteEntryInputs } from "../../inputs";
import { deleteEntryOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const deleteEntry = action({
  display: {
    label: "Delete Entry",
    description: "Deletes an existing entry.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, environmentId, spaceId, entryId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const entry: Entry = await environment.getEntry(entryId);
    await entry.delete();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteEntryExamplePayload,
  inputs: deleteEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteEntryOutputSchema,
  }),
  examplePayload: deleteEntryExamplePayload,
});
