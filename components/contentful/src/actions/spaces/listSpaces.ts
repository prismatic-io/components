import { action } from "@prismatic-io/spectral";
import type { Space, SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { listSpacesInputs } from "../../inputs";
import { getAllPaginatedItems } from "../../util";

export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "Retrieves all spaces the account has access to.",
  },
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
  inputs: listSpacesInputs,
  examplePayload: { data: listSpacesExamplePayload },
});
