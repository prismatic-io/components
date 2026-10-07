import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { listEntriesExamplePayload } from "../../examplePayloads";
import { listEntriesInputs } from "../../inputs";
import { listEntriesOutputSchema } from "../../outputSchemas";
import { getAllPaginatedItems, getEnvironment } from "../../util";
export const listEntries = action({
  display: {
    label: "List Entries",
    description: "Retrieves all entries of a space.",
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
    >(environment.getEntries.bind(environment));
    return {
      data: allItems as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listEntriesExamplePayload,
  inputs: listEntriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEntriesOutputSchema,
  }),
  examplePayload: listEntriesExamplePayload,
});
