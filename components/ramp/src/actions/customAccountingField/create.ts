import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomAccountingFieldResponse as createCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import {
  connection,
  customAccountingFieldId,
  inputType,
  isSplittable,
  name,
} from "../../inputs";
import { createCustomAccountingFieldOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomAccountingFieldOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (
    _context,
    { customAccountingFieldId, inputType, isSplittable, name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createCustomAccountingFieldResponse,
      id: customAccountingFieldId,
      input_type: inputType,
      is_splittable:
        isSplittable ?? createCustomAccountingFieldResponse.is_splittable,
      name: name ?? createCustomAccountingFieldResponse.name,
    },
  }),
  examplePayload: {
    data: createCustomAccountingFieldResponse,
  },
});
