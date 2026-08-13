import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBusinessEntitiesResponse } from "../../examplePayloads/businessEntities";
import { defaultListInputs } from "../../inputs";
import type { BusinessEntity } from "../../interfaces/businessEntities";
import { listBusinessEntitiesOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listBusinessEntities = action({
  display: {
    label: "List Business Entities",
    description: "Retrieve a list of all business entities",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBusinessEntitiesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<BusinessEntity>(
      client,
      "entities",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { fetchAll },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...listBusinessEntitiesResponse,
      page: fetchAll ? null : listBusinessEntitiesResponse.page,
    },
  }),
  examplePayload: {
    data: listBusinessEntitiesResponse,
  },
});
