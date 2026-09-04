import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemsExamplePayload } from "../../examplePayloads";
import { listItemsInputs } from "../../inputs";
import { listItemsOutputSchema } from "../../outputSchemas";
import type { ItemFullVo } from "../../types";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listItems = action({
  display: {
    label: "List Items",
    description:
      "Search and return a list of items from Arena PLM system matching the specified criteria with pagination support.",
  },
  inputs: listItemsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemsOutputSchema,
  }),
  examplePayload: listItemsExamplePayload,
  perform: async (
    context,
    {
      connection,
      number,
      name,
      description,
      categoryGuid,
      categoryName,
      revisionNumber,
      lifecyclePhaseGuid,
      lifecyclePhaseStage,
      ownerFullName,
      creatorEmail,
      creatorGuid,
      creatorFullName,
      modifiedBom,
      modifiedFiles,
      modifiedSourcing,
      modifiedSpecs,
      inAssembly,
      assemblyType,
      effectiveDateTime,
      responseView,
      pagination = {},
      includeChildCategories,
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        number,
        name,
        description,
        "category.guid": categoryGuid,
        "category.name": categoryName,
        revisionNumber,
        "lifecyclePhase.guid": lifecyclePhaseGuid,
        "lifecyclePhase.stage": lifecyclePhaseStage,
        "owner.fullName": ownerFullName,
        "creator.email": creatorEmail,
        "creator.guid": creatorGuid,
        "creator.fullName": creatorFullName,
        modifiedBom,
        modifiedFiles,
        modifiedSourcing,
        modifiedSpecs,
        inAssembly,
        assemblyType,
        effectiveDateTime,
        responseview: responseView,
        limit: pagination.limit,
        offset: pagination.offset,
        includeChildCategories,
      };
      context.logger.info("Searching for items in Arena", {
        searchCriteria: {
          byNumber: !!number,
          byName: !!name,
          byDescription: !!description,
          byCategory: !!(categoryGuid || categoryName),
          byCreator: !!(creatorEmail || creatorGuid || creatorFullName),
          byOwner: !!ownerFullName,
          byLifecycle: !!(lifecyclePhaseGuid || lifecyclePhaseStage),
        },
      });
      const itemsResult = await fetchArenaList<ItemFullVo>(
        client,
        "/items",
        queryParams,
        fetchAll,
      );
      context.logger.info("Items retrieved successfully", {
        itemCount: itemsResult.results?.length || 0,
        totalCount: itemsResult.count,
        hasMore: itemsResult.count > (itemsResult.results?.length || 0),
      });
      return { data: itemsResult };
    } catch (error) {
      handleArenaError(error, context.logger, "List Items");
    }
  },
});
