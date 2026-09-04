import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFilesExamplePayload } from "../../examplePayloads";
import { listFilesInputs } from "../../inputs";
import { listFilesOutputSchema } from "../../outputSchemas";
import type { FileFullVo } from "../../types";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listFiles = action({
  display: {
    label: "List Files",
    description:
      "Get files from Arena PLM system with search and filtering options.",
  },
  inputs: listFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFilesOutputSchema,
  }),
  examplePayload: listFilesExamplePayload,
  perform: async (
    context,
    {
      connection,
      number,
      title,
      name,
      format,
      categoryGuid,
      pagination = {},
      includeChildCategories,
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        number,
        title,
        name,
        format,
        "category.guid": categoryGuid,
        includeChildCategories,
        limit: pagination.limit,
        offset: pagination.offset,
      };
      context.logger.info("Searching for files in Arena", {
        queryParamCount: Object.keys(queryParams).length,
        hasLimit: !!queryParams.limit,
        hasOffset: !!queryParams.offset,
        searchCriteria: {
          byNumber: !!number,
          byTitle: !!title,
          byName: !!name,
          byFormat: !!format,
          byCategory: !!categoryGuid,
        },
      });
      const filesResult = await fetchArenaList<FileFullVo>(
        client,
        "/files",
        queryParams,
        fetchAll,
      );
      context.logger.info("Files retrieved successfully", {
        fileCount: filesResult.results?.length || 0,
        totalCount: filesResult.count,
        hasMore: filesResult.count > (filesResult.results?.length || 0),
      });
      return { data: filesResult };
    } catch (error) {
      handleArenaError(error, context.logger, "List Files");
    }
  },
});
