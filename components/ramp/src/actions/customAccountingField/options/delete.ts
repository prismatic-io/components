import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { GENERIC_DELETE_RESPONSE } from "../../../constants";
import { connection, customAccountingFieldOptionId } from "../../../inputs";

export const deleteCustomAccountingFieldOption = action({
  display: {
    label: "Delete Custom Accounting Field Option",
    description: "Delete a custom accounting field option",
  },
  inputs: {
    customAccountingFieldOptionId: {
      ...customAccountingFieldOptionId,
      comments: "The ID of the custom accouting field option to delete",
    },
    connection,
  },
  perform: async (context, { connection, customAccountingFieldOptionId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/accounting/field-options/${customAccountingFieldOptionId}`);
    return {
      data: GENERIC_DELETE_RESPONSE,
    };
  },
  examplePayload: {
    data: GENERIC_DELETE_RESPONSE,
  },
});
