import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import { connection, customAccountingFieldOptionId } from "../../../inputs";

export const getCustomAccountingFieldOption = action({
  display: {
    label: "Get Custom Accounting Field Option",
    description: "Retrieve a custom accounting field option by ID",
  },
  inputs: {
    customAccountingFieldOptionId,
    connection,
  },
  perform: async (context, { connection, customAccountingFieldOptionId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/accounting/field-options/${customAccountingFieldOptionId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getCustomAccountingFieldOptionResponse,
  },
});
