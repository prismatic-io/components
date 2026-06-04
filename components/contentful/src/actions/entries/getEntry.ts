import { action } from "@prismatic-io/spectral";
import type {
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { getEntryExamplePayload } from "../../examplePayloads";
import { getEntryInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const getEntry = action({
  display: {
    label: "Get Entry",
    description: "Retrieves a single entry by ID.",
  },
  perform: async (context, { connection, environmentId, spaceId, entryId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const entry: EntryProps<KeyValueMap> = (
      await environment.getEntry(entryId)
    ).toPlainObject();

    return {
      data: entry as unknown, 
    };
  },
  inputs: getEntryInputs,
  examplePayload: { data: getEntryExamplePayload },
});
