import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listCategoriesExamplePayload } from "../../examplePayloads";
import { listCategoriesInputs } from "../../inputs";
import { listCategoriesOutputSchema } from "../../outputSchemas";
import type {
  CategoryFullResultRep,
  CategoryResponse,
  ChangeCategoryResultRep,
  RequestCategoryResultRep,
} from "../../types";
import { handleArenaError } from "../../util";
export const listCategories = action({
  display: {
    label: "List Categories",
    description:
      "List all categories for a specified object type (items, files, changes, requests) in Arena PLM system with optional filtering.",
  },
  inputs: listCategoriesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCategoriesOutputSchema,
  }),
  examplePayload: listCategoriesExamplePayload,
  perform: async (
    context,
    { connection, objectType, path, includeDeleted, assignable, user, action },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        path,
        includeDeleted,
        assignable,
        user,
        action,
      };
      context.logger.info(`Fetching ${objectType} categories from Arena`, {
        objectType,
        queryParamNames: Object.keys(queryParams),
      });
      const { data } = await client.get(`/settings/${objectType}/categories`, {
        params: queryParams,
      });
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} ${objectType} categories`,
      );
      let responseData: CategoryResponse;
      switch (objectType) {
        case "changes":
          responseData = data as ChangeCategoryResultRep;
          break;
        case "requests":
          responseData = data as RequestCategoryResultRep;
          break;
        case "items":
        case "files":
        default:
          responseData = data as CategoryFullResultRep;
          break;
      }
      return { data: responseData };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `List Categories (${objectType})`,
      );
    }
  },
});
