import { dataSource, type Element } from "@prismatic-io/spectral";
import type { Space, SpaceProps } from "contentful-management";
import { createClient } from "../client";
import { selectSpaceInputs } from "../inputs";
import { getAllPaginatedItems, mapItemsForPicklist } from "../util";

export const selectSpace = dataSource({
  display: {
    label: "Select Space",
    description: "Select a space from a dropdown menu.",
  },
  inputs: selectSpaceInputs,
  perform: async (_context, { connection, dataSourceReturn }) => {
    const client = createClient(connection);

    const allItems: SpaceProps[] = await getAllPaginatedItems<
      Space,
      SpaceProps
    >(client.getSpaces.bind(client));

    const result: Element[] = mapItemsForPicklist(allItems, dataSourceReturn);
    return { result };
  },
  dataSourceType: "picklist",
});
