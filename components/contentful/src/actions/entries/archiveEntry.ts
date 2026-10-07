import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { archiveEntryExamplePayload } from "../../examplePayloads";
import { archiveEntryInputs } from "../../inputs";
import { archiveEntryOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const archiveEntry = action({
  display: {
    label: "Archive Entry",
    description: "Archives an existing entry.",
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
      await entry.archive()
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => archiveEntryExamplePayload,
  inputs: archiveEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: archiveEntryOutputSchema,
  }),
  examplePayload: archiveEntryExamplePayload,
});
