import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectOrganizationExamplePayload } from "../examplePayloads";
import { selectOrganizationInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "A picklist of organizations in the Workday tenant.",
  },
  inputs: selectOrganizationInputs,
  perform: async (_context, { connection, organizationTypeId }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.common}/organizations`,
      params: { organizationType: organizationTypeId },
      fetchAll: true,
    });

    return {
      result: toSortedPicklist(data as WorkdayInstanceSummary[], (item) => ({
        key: item.id,
        label: item.descriptor,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: selectOrganizationExamplePayload,
});
