import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomAccountingFieldResponse as createCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import { connection, customAccountingFieldId, inputType, isSplittable, name } from "../../inputs";

export const createCustomAccountingField = action({
  display: {
    label: "Create Custom Accounting Field",
    description: "Create a custom accounting field",
  },
  inputs: {
    customAccountingFieldId: {
      ...customAccountingFieldId,
      comments: "The ID of the custom accounting field to create",
    },
    name: {
      ...name,
      comments: "The name of the custom accounting field to create",
      required: true,
    },
    inputType,
    isSplittable,
    connection,
  },
  perform: async (
    context,
    { connection, customAccountingFieldId, inputType, isSplittable, name },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/accounting/fields`, {
      id: customAccountingFieldId,
      name,
      input_type: inputType,
      is_splittable: isSplittable,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createCustomAccountingFieldResponse,
  },
});
