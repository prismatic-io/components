import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { SERVICES } from "../constants";
import { selectSupervisoryOrganizationExamplePayload } from "../examplePayloads";
import { selectSupervisoryOrganizationInputs } from "../inputs";
import type { WorkdayInstanceSummary } from "../types";
import { paginateResults, toSortedPicklist } from "../util";

export const selectSupervisoryOrganization = dataSource({
  display: {
    label: "Select Supervisory Organization",
    description:
      "A picklist of supervisory organizations in the Workday tenant.",
  },
  inputs: selectSupervisoryOrganizationInputs,
  perform: async (_context, { connection }) => {
    const client = getClient(connection, false);
    const { data } = await paginateResults({
      client,
      endpoint: `${SERVICES.common}/supervisoryOrganizations`,
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
  examplePayload: selectSupervisoryOrganizationExamplePayload,
});
