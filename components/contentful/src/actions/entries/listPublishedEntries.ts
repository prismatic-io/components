import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { listPublishedEntriesExamplePayload } from "../../examplePayloads";
import { listPublishedEntriesInputs } from "../../inputs";
import { listPublishedEntriesOutputSchema } from "../../outputSchemas";
import { getAllPaginatedItems, getEnvironment } from "../../util";
export const listPublishedEntries = action({
  display: {
    label: "List Published Entries",
    description: "Retrieves all published entries of a space.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listPublishedEntriesExamplePayload,
  inputs: listPublishedEntriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPublishedEntriesOutputSchema,
  }),
  examplePayload: listPublishedEntriesExamplePayload,
});
