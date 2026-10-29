import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectOrganizationExamplePayload } from "../examplePayloads";
import { selectOrganizationInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { toSortedPicklist } from "../util";

export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "A picklist of organizations in the Workday tenant.",
  },
  inputs: selectOrganizationInputs,
  perform: async (_context, { connection, organizationTypeId }) => {
    const client = getClient(connection, false);
    const { data } = await client.get(`${SERVICES.common}/organizations`, {
      params: { organizationType: organizationTypeId },
    });

    return {
      result: toSortedPicklist(data.data, (item: WorkdayInstanceSummary) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectOrganizationExamplePayload,
});
