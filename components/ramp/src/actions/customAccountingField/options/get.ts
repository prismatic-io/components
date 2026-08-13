import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import { connection, customAccountingFieldOptionId } from "../../../inputs";
import { getCustomAccountingFieldOptionOutputSchema } from "../../../outputSchemas";
export const getCustomAccountingFieldOption = action({
  display: {
    label: "Get Custom Accounting Field Option",
    description: "Retrieve a custom accounting field option by ID",
  },
  inputs: {
    customAccountingFieldOptionId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomAccountingFieldOptionOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, customAccountingFieldOptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/accounting/field-options/${customAccountingFieldOptionId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getCustomAccountingFieldOptionResponse,
  },
});
