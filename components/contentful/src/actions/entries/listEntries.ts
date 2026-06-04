import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { listEntriesInputs } from "../../inputs";
import { getAllPaginatedItems, getEnvironment } from "../../util";

export const listEntries = action({
  display: {
    label: "List Entries",
    description: "Retrieves all entries of a space.",
  },
  perform: async (context, { connection, environmentId, spaceId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const allItems: EntryProps<KeyValueMap>[] = await getAllPaginatedItems<
      Entry,
      EntryProps<KeyValueMap>
    >(environment.getEntries.bind(environment));

    return {
      data: allItems as unknown, 
    };
  },
  inputs: listEntriesInputs,
  examplePayload: { data: listEntriesExamplePayload },
});
