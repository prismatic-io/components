import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getCustomAccountingFieldOptionResponse as updateCustomAccountingFieldOptionResponsev } from "../../../examplePayloads/customAccountingFieldOption";
import { connection, customAccountingFieldOptionId, reactivate, value } from "../../../inputs";

export const updateCustomAccountingFieldOption = action({
  display: {
    label: "Update Custom Accounting Field Option",
    description: "Update an existing custom accounting field option",
  },
  inputs: {
    customAccountingFieldOptionId: {
      ...customAccountingFieldOptionId,
      comments: "The ID of the custom accounting field option to update",
    },
    reactivate: {
      ...reactivate,
      comments: "Reactivate a deleted custom field option",
    },
    value,
    connection,
  },
  perform: async (context, { connection, customAccountingFieldOptionId, reactivate, value }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(
      `/accounting/field-options/${customAccountingFieldOptionId}`,
      {
        reactivate,
        value,
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: updateCustomAccountingFieldOptionResponsev,
  },
});
