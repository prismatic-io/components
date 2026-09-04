import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { changeCategoryRoutingsPicklistExamplePayload } from "../examplePayloads";
import { changeCategoryRoutingsPicklistInputs } from "../inputs";
import type { ChangeRoutingMiniResultRep } from "../types";
import { handleArenaError } from "../util";
export const changeCategoryRoutingsPicklist = dataSource({
  display: {
    label: "Select Change Category Routing",
    description:
      "Select from available routings for the specified change category.",
  },
  dataSourceType: "picklist",
  inputs: changeCategoryRoutingsPicklistInputs,
  perform: async (context, { connection, categoryGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching routings for change category datasource: ${categoryGuid}`,
        {
          categoryGuid,
        },
      );
      const response = await client.get(
        `/settings/changes/categories/${categoryGuid}/routings`,
      );
      context.logger.info(
        `Successfully retrieved ${response.data?.count || 0} routings for category ${categoryGuid} datasource`,
      );
      const responseData = response.data as ChangeRoutingMiniResultRep;
      const results =
        responseData.results?.map((routing) => ({
          label: routing.name || "Unnamed Routing",
          key: routing.guid,
        })) || [];
      return { result: results };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `Get Change Category Routings Datasource for category ${categoryGuid}`,
      );
      return { result: [] };
    }
  },
  examplePayload: changeCategoryRoutingsPicklistExamplePayload,
});
