import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { unarchiveEntryExamplePayload } from "../../examplePayloads";
import { unarchiveEntryInputs } from "../../inputs";
import { unarchiveEntryOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const unarchiveEntry = action({
  display: {
    label: "Unarchive Entry",
    description: "Unarchives an existing entry.",
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
    const data: EntryProps<KeyValueMap> = (
      await entry.unarchive()
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => unarchiveEntryExamplePayload,
  inputs: unarchiveEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unarchiveEntryOutputSchema,
  }),
  examplePayload: unarchiveEntryExamplePayload,
});
