import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { putEntryExamplePayload } from "../../examplePayloads";
import { putEntryInputs } from "../../inputs";
import { putEntryOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const putEntry = action({
  display: {
    label: "Put Entry",
    description:
      "Replaces all fields of an existing entry with the provided data.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, environmentId, spaceId, entryId, entryData },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const entry: Entry = await environment.getEntry(entryId);
    entry.fields = (
      entryData as {
        fields: KeyValueMap;
      }
    ).fields;
    if (
      (
        entryData as {
          metadata?: unknown;
        }
      ).metadata
    ) {
      entry.metadata = (
        entryData as {
          metadata: Entry["metadata"];
        }
      ).metadata;
    }
    const data: EntryProps<KeyValueMap> = (
      await entry.update()
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => putEntryExamplePayload,
  inputs: putEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: putEntryOutputSchema,
  }),
  examplePayload: putEntryExamplePayload,
});
