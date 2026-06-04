import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { updateEntryExamplePayload } from "../../examplePayloads";
import { updateEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const updateEntry = action({
  display: {
    label: "Update Entry",
    description: "Updates an existing entry.",
  },
  perform: async (
    context,
    { connection, environmentId, spaceId, entryId, entryTitle, entryBody },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const entry: Entry = await environment.getEntry(entryId);

    if (entryTitle) {
      const locale = Object.keys(entryTitle)[0];
      entry.fields.title[locale] = (
        entryTitle as EntryProps["fields"]["title"]
      )[locale];
    }

    if (entryBody) {
      const locale = Object.keys(entryBody)[0];
      entry.fields.body[locale] = (entryBody as Record<string, string>)[locale];
    }

    const data: EntryProps<KeyValueMap> = (
      await entry.update()
    ).toPlainObject();

    return {
      data: data as unknown, 
    };
  },
  inputs: updateEntryInputs,
  examplePayload: updateEntryExamplePayload,
});
