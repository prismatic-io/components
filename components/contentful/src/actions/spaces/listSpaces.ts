import { action, outputSchema } from "@prismatic-io/spectral";
import type { Space, SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { listSpacesInputs } from "../../inputs";
import { listSpacesOutputSchema } from "../../outputSchemas";
import { getAllPaginatedItems } from "../../util";
export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "Retrieves all spaces the account has access to.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context);
    const allItems: SpaceProps[] = await getAllPaginatedItems<
      Space,
      SpaceProps
    >(client.getSpaces.bind(client));
    return {
      data: allItems,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listSpacesExamplePayload,
  inputs: listSpacesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSpacesOutputSchema,
  }),
  examplePayload: listSpacesExamplePayload,
});
