import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomAccountingFieldResponse as updateCustomAccountingFieldResponse } from "../../examplePayloads/customAccountingFields";
import {
  connection,
  customAccountingFieldId,
  isSplittable,
  name,
} from "../../inputs";
import { updateCustomAccountingFieldOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomAccountingFieldOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customAccountingFieldId, name, isSplittable },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(
      `/accounting/fields/${customAccountingFieldId}`,
      {
        name,
        is_splittable: isSplittable,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { customAccountingFieldId, name, isSplittable },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateCustomAccountingFieldResponse,
      id: customAccountingFieldId,
      is_splittable:
        isSplittable ?? updateCustomAccountingFieldResponse.is_splittable,
      name: name ?? updateCustomAccountingFieldResponse.name,
    },
  }),
  examplePayload: {
    data: updateCustomAccountingFieldResponse,
  },
});
