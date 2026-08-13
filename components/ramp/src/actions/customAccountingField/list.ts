import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomAccountingFieldsResponse } from "../../examplePayloads/customAccountingFields";
import { defaultListInputs } from "../../inputs";
import type { CustomAccountingField } from "../../interfaces/customAccountingField";
import { listCustomAccountingFieldOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listCustomAccountingField = action({
  display: {
    label: "List Custom Accounting Fields",
    description: "List custom accounting fields",
  },
  inputs: {
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomAccountingFieldOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<CustomAccountingField>(
      client,
      "/accounting/fields",
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
      ...listCustomAccountingFieldsResponse,
      page: fetchAll ? null : listCustomAccountingFieldsResponse.page,
    },
  }),
  examplePayload: {
    data: listCustomAccountingFieldsResponse,
  },
});
