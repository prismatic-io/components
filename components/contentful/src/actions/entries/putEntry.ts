import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { updateEntryExamplePayload } from "../../examplePayloads";
import { putEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const putEntry = action({
  display: {
    label: "Put Entry",
    description:
      "Replaces all fields of an existing entry with the provided data.",
  },
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

    entry.fields = (entryData as { fields: KeyValueMap }).fields;

    if ((entryData as { metadata?: unknown }).metadata) {
      entry.metadata = (entryData as { metadata: Entry["metadata"] }).metadata;
    }

    const data: EntryProps<KeyValueMap> = (
      await entry.update()
    ).toPlainObject();

    return {
      data: data as unknown,
    };
  },
  inputs: putEntryInputs,
  examplePayload: { data: updateEntryExamplePayload },
});
