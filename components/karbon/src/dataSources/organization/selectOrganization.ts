import { createKarbonClient } from "../../client";
import { dataSource, type Element } from "@prismatic-io/spectral";
import type { KarbonOrganization } from "../../interfaces/KarbonOrganization";
import { connection } from "../../inputs/shared";
import { getPaginatedData } from "../../utils";

export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "Select an Organization from a dropdown menu",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, false);
    const data = await getPaginatedData<KarbonOrganization>({
      client,
      endpoint: "/v3/Organizations/",
      getAllData: true,
      pagination: {},
    });
    const organizations = data.value || [];
    

    
    const objects = organizations.map<Element>((organization) => ({
      key: organization.OrganizationKey,
      label: organization.FullName,
    }));

    return { result: objects };
  },
});
