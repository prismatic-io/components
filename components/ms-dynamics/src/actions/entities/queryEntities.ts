import { action } from "@prismatic-io/spectral";
import type { RetrieveMultipleRequest } from "dynamics-web-api";
import { createCrmClient } from "../../client";
import { queryEntitiesExamplePayload } from "../../examplePayloads";
import { queryEntitiesInputs } from "../../inputs";
import { paginateQueryEntities } from "../../utils/pagination";

export const queryEntities = action({
  display: {
    label: "Query Entities",
    description:
      "Queries Microsoft Dynamics 365 CRM entity records that satisfy the filter expression.",
  },
  examplePayload: queryEntitiesExamplePayload,
  perform: async (
    context,
    {
      entityType,
      fieldNames,
      filterExpression,
      orderByFieldNames,
      expandPropertyNames,
      recordsPerPage,
      nextPageId,
      fetchAll,
      connection,
    }
  ) => {
    const client = await createCrmClient(connection, context.debug.enabled);

    const request: RetrieveMultipleRequest = {
      collection: entityType,
      select: fieldNames,
      filter: filterExpression,
      maxPageSize: recordsPerPage,
    };

    if (Array.isArray(orderByFieldNames) && orderByFieldNames.length) {
      request.orderBy = orderByFieldNames;
    }

    if (Array.isArray(expandPropertyNames) && expandPropertyNames.length) {
      request.expand = expandPropertyNames;
    }

    const retrieveFn = async (pageId?: string) => {
      const result = await client.retrieveMultiple(request, pageId);
      return result as unknown as Record<string, unknown>;
    };

    if (fetchAll) {
      return paginateQueryEntities(retrieveFn, true, nextPageId);
    }

    const result = await client.retrieveMultiple(request, nextPageId);
    return {
      data: {
        ...result,
        
        
        "@odata.nextLink": result?.["@odata.nextLink"],
        oDataNextLink: result?.oDataNextLink,
      },
    };
  },
  inputs: queryEntitiesInputs,
});
