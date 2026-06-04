import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { createEntryExamplePayload } from "../../examplePayloads";
import { archiveEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const archiveEntry = action({
  display: {
    label: "Archive Entry",
    description: "Archives an existing entry.",
  },
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
  inputs: archiveEntryInputs,
  examplePayload: { data: createEntryExamplePayload },
});
