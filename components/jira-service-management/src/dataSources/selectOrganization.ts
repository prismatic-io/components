import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectOrganizationExamplePayload } from "../examplePayloads";
import { selectOrganizationInputs } from "../inputs";
import type { Organization, PagedResponse } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "Fetches organizations and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectOrganizationInputs,
  perform: async (_context, { connection }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<Organization> } =
      await getPaginatedData<Organization>(client, "/organization", true);
    const result = toSortedPicklist(
      data.values,
      (org) => org.name,
      (org) => org.id,
    );
    return { result };
  },
  examplePayload: selectOrganizationExamplePayload,
});
