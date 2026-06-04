import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomAccountingFieldResponse as updateCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import { connection, customAccountingFieldId, isSplittable, name } from "../../inputs";

export const updateCustomAccountingField = action({
  display: {
    label: "Update Custom Accounting Field",
    description: "Update an existing custom accounting field",
  },
  inputs: {
    customAccountingFieldId: {
      ...customAccountingFieldId,
      comments: "The ID of the custom accounting field to update",
    },
    name: {
      ...name,
      comments: "The name of the custom accounting field",
    },
    isSplittable,
    connection,
  },
  perform: async (context, { connection, customAccountingFieldId, name, isSplittable }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(`/accounting/fields/${customAccountingFieldId}`, {
      name,
      is_splittable: isSplittable,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateCustomAccountingFieldResponse,
  },
});
