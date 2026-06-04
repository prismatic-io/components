import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomAccountingFieldsResponse } from "../../examplePayloads/customAccountingFields";
import { defaultListInputs } from "../../inputs";
import type { CustomAccountingField } from "../../interfaces/customAccountingField";
import { fetchAllData } from "../../util";

export const listCustomAccountingField = action({
  display: {
    label: "List Custom Accounting Field",
    description: "List custom accounting fields",
  },
  inputs: {
    ...defaultListInputs,
  },
  perform: async (context, { connection, customQueryParams, fetchAll, pageSize, start }) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await fetchAllData<CustomAccountingField>(
      client,
      "/accounting/fields",
      {
        ...customQueryParams,
        page_size: pageSize,
        start,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listCustomAccountingFieldsResponse,
  },
});
