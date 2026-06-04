import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import { connection, customAccountingFieldId } from "../../inputs";

export const deleteCustomAccountingField = action({
  display: {
    label: "Delete Custom Accounting Field",
    description: "Delete a custom accounting field",
  },
  inputs: {
    customAccountingFieldId: {
      ...customAccountingFieldId,
      comments: "The ID of the custom accounting field to delete",
    },
    connection,
  },
  perform: async (context, { connection, customAccountingFieldId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/accounting/fields/${customAccountingFieldId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
