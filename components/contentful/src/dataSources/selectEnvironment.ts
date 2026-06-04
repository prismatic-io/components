import { dataSource, type Element } from "@prismatic-io/spectral";
import type {
  Environment,
  EnvironmentProps,
  Space,
} from "contentful-management";
import { createClient } from "../client";
import { selectEnvironmentInputs } from "../inputs";
import { getAllPaginatedItems, mapItemsForPicklist } from "../util";

export const selectEnvironment = dataSource({
  display: {
    label: "Select Environment",
    description: "Select an environment from a dropdown menu.",
  },
  inputs: selectEnvironmentInputs,
  perform: async (_context, { connection, spaceId, dataSourceReturn }) => {
    const client = createClient(connection);
    const space: Space = await client.getSpace(spaceId);

    const allItems: EnvironmentProps[] = await getAllPaginatedItems<
      Environment,
      EnvironmentProps
    >(space.getEnvironments.bind(space));

    const result: Element[] = mapItemsForPicklist(allItems, dataSourceReturn);
    return { result };
  },
  dataSourceType: "picklist",
});
