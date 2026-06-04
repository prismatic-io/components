import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { lisCustomAccountingFieldOptionsResponse } from "../../../examplePayloads/customAccountingFieldOption";
import { customAccountingFieldId, defaultListInputs } from "../../../inputs";
import type { CustomAccountingFieldOption } from "../../../interfaces/customAccountingFieldOption";
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
  perform: async (
    context,
    { connection, customQueryParams, fetchAll, pageSize, start, customAccountingFieldId },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<CustomAccountingFieldOption>(
      client,
      "/accounting/field-options",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
        field_id: customAccountingFieldId,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: lisCustomAccountingFieldOptionsResponse,
  },
});
