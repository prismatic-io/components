import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { unpublishEntryExamplePayload } from "../../examplePayloads";
import { unpublishEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const unpublishEntry = action({
  display: {
    label: "Unpublish Entry",
    description: "Unpublishes an entry.",
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
      await entry.unpublish()
    ).toPlainObject();
    return {
      data: data as unknown, 
    };
  },
  inputs: unpublishEntryInputs,
  examplePayload: { data: unpublishEntryExamplePayload },
});
