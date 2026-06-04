import { action } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { listPublishedEntriesInputs } from "../../inputs";
import { getAllPaginatedItems, getEnvironment } from "../../util";

export const listPublishedEntries = action({
  display: {
    label: "List Published Entries",
    description: "Retrieves all published entries of a space.",
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
    >(
      (options) =>
        environment.getEntries({
          ...options,
          "sys.publishedAt[exists]": true,
        }) as ReturnType<typeof environment.getEntries>,
    );

    return {
      data: allItems as unknown,
    };
  },
  inputs: listPublishedEntriesInputs,
  examplePayload: { data: listEntriesExamplePayload },
});
