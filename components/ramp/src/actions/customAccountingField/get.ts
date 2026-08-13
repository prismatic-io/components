import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import { connection, customAccountingFieldId } from "../../inputs";
import { getCustomAccountingFieldOutputSchema } from "../../outputSchemas";
export const getCustomAccountingField = action({
  display: {
    label: "Get Custom Accounting Field",
    description: "Retrieve a custom accounting field by ID",
  },
  inputs: {
    customAccountingFieldId,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomAccountingFieldOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, customAccountingFieldId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/accounting/fields/${customAccountingFieldId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getCustomAccountingFieldResponse,
  },
});
