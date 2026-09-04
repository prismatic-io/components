import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { categoriesPicklistExamplePayload } from "../examplePayloads";
import { categoriesPicklistInputs } from "../inputs";
import type {
  CategoryFullResultRep,
  CategoryResponse,
  ChangeCategoryResultRep,
  RequestCategoryResultRep,
} from "../types";
import { handleArenaError } from "../util";
export const categoriesPicklist = dataSource({
  display: {
    label: "Select Category",
    description:
      "Select from available Arena categories for the specified object type.",
  },
  dataSourceType: "picklist",
  inputs: categoriesPicklistInputs,
  perform: async (
    context,
    { connection, objectType, path, includeDeleted, assignable },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = { path, includeDeleted, assignable };
      context.logger.info(`Fetching ${objectType} categories for datasource`, {
        objectType,
        queryParamNames: Object.keys(queryParams),
      });
      const response = await client.get(`/settings/${objectType}/categories`, {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${response.data?.count || 0} ${objectType} categories for datasource`,
      );
      let responseData: CategoryResponse;
      switch (objectType) {
        case "changes":
          responseData = response.data as ChangeCategoryResultRep;
          break;
        case "requests":
          responseData = response.data as RequestCategoryResultRep;
          break;
        case "items":
        case "files":
        default:
          responseData = response.data as CategoryFullResultRep;
          break;
      }
      const results =
        responseData.results?.map((category) => ({
          label: category.name || "Unnamed Category",
          key: category.guid,
        })) || [];
      return { result: results };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `Get ${objectType} Categories Datasource`,
      );
      return { result: [] };
    }
  },
  examplePayload: categoriesPicklistExamplePayload,
});
