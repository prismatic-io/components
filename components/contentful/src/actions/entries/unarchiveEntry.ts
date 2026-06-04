import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { createEntryExamplePayload } from "../../examplePayloads";
import { unarchiveEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const unarchiveEntry = action({
  display: {
    label: "Unarchive Entry",
    description: "Unarchives an existing entry.",
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
      await entry.unarchive()
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  inputs: unarchiveEntryInputs,
  examplePayload: { data: createEntryExamplePayload },
});
