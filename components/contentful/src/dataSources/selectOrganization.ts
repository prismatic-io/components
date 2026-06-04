import { dataSource, type Element } from "@prismatic-io/spectral";
import type { Organization, OrganizationProp } from "contentful-management";
import { createClient } from "../client";
import { selectOrganizationInputs } from "../inputs";
import { getAllPaginatedItems, mapItemsForPicklist } from "../util";

export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "Select an organization from a dropdown menu.",
  },
  inputs: selectOrganizationInputs,
  perform: async (_context, { connection, dataSourceReturn }) => {
    const client = createClient(connection);

    const allItems: OrganizationProp[] = await getAllPaginatedItems<
      Organization,
      OrganizationProp
    >(client.getOrganizations.bind(client));

    const result: Element[] = mapItemsForPicklist(allItems, dataSourceReturn);
    return { result };
  },
  dataSourceType: "picklist",
});
