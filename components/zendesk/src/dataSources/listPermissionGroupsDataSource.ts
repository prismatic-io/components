import { dataSource, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listPermissionGroupsDataSourceExamplePayload } from "../examplePayloads";
import { listPermissionGroupsDataSourceInputs } from "../inputs";
import type { PermissionGroup } from "../types";
import { paginateResults } from "../util";
export const listPermissionGroupsDataSource = dataSource({
  display: {
    label: "Select Management Permission Groups",
    description:
      "Select a management permission group from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as PermissionGroup[];
    const nextUrl = "/guide/permission_groups.json";
    const paginatedResults = await paginateResults<PermissionGroup>(
      client,
      nextUrl,
      results,
      "permission_groups",
    );
    return {
      result: paginatedResults.map((pgroup: PermissionGroup) => ({
        label: pgroup.name,
        key: util.types.toString(pgroup.id),
      })),
    };
  },
  inputs: listPermissionGroupsDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listPermissionGroupsDataSourceExamplePayload,
});
