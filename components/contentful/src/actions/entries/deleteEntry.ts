import { action } from "@prismatic-io/spectral";
import type { Entry, Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const deleteEntry = action({
  display: {
    label: "Delete Entry",
    description: "Deletes an existing entry.",
  },
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
  inputs: deleteEntryInputs,
  examplePayload: { data: {} },
});
