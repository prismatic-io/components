import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  EntryProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { createEntryExamplePayload } from "../../examplePayloads";
import { createEntryInputs } from "../../inputs";
import { createEntryOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const createEntry = action({
  display: {
    label: "Create Entry",
    description: "Creates a new entry in a space.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, contentTypeId, environmentId, spaceId, entryData },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const data: EntryProps<KeyValueMap> = (
      await environment.createEntry(
        contentTypeId,
        entryData as Omit<EntryProps, "sys">,
      )
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createEntryExamplePayload,
  inputs: createEntryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEntryOutputSchema,
  }),
  examplePayload: createEntryExamplePayload,
});
