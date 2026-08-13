import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { GENERIC_DELETE_RESPONSE } from "../../../constants";
import { connection, customAccountingFieldOptionId } from "../../../inputs";
import { deleteCustomAccountingFieldOptionOutputSchema } from "../../../outputSchemas";
export const deleteCustomAccountingFieldOption = action({
  display: {
    label: "Delete Custom Accounting Field Option",
    description: "Delete a custom accounting field option",
  },
  inputs: {
    customAccountingFieldOptionId: {
      ...customAccountingFieldOptionId,
      comments: "The ID of the custom accounting field option to delete",
    },
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCustomAccountingFieldOptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, customAccountingFieldOptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `/accounting/field-options/${customAccountingFieldOptionId}`,
    );
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: GENERIC_DELETE_RESPONSE,
  }),
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
