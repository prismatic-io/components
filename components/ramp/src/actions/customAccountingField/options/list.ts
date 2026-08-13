import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { lisCustomAccountingFieldOptionsResponse } from "../../../examplePayloads/customAccountingFieldOption";
import { customAccountingFieldId, defaultListInputs } from "../../../inputs";
import type { CustomAccountingFieldOption } from "../../../interfaces/customAccountingFieldOption";
import { listCustomAccountingFieldOptionsOutputSchema } from "../../../outputSchemas";
import { fetchAllData } from "../../../util";
export const listCustomAccountingFieldOptions = action({
  display: {
    label: "List Custom Accounting Field Options",
    description: "List options for a given custom accounting field",
  },
  inputs: {
    customAccountingFieldId: {
      ...customAccountingFieldId,
      comments: "The ID of the custom accounting field to list options for",
    },
    ...defaultListInputs,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomAccountingFieldOptionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      pagination,
      customAccountingFieldId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await fetchAllData<CustomAccountingFieldOption>(
      client,
      "/accounting/field-options",
      {
        ...customQueryParams,
        page_size: pagination.pageSize,
        start: pagination.start,
        field_id: customAccountingFieldId,
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
      ...lisCustomAccountingFieldOptionsResponse,
      page: fetchAll ? null : lisCustomAccountingFieldOptionsResponse.page,
    },
  }),
  examplePayload: {
    data: lisCustomAccountingFieldOptionsResponse,
  },
});
