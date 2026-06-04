import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { publishEntryExamplePayload } from "../../examplePayloads";
import { publishEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const publishEntry = action({
  display: {
    label: "Publish Entry",
    description: "Publishes an entry.",
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
      await entry.publish()
    ).toPlainObject();
    return {
      data: data as unknown, 
    };
  },
  inputs: publishEntryInputs,
  examplePayload: { data: publishEntryExamplePayload },
});
