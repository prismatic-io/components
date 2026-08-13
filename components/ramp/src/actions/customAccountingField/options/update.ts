import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getCustomAccountingFieldOptionResponse as updateCustomAccountingFieldOptionResponsev } from "../../../examplePayloads/customAccountingFieldOption";
import {
  connection,
  customAccountingFieldOptionId,
  reactivate,
  value,
} from "../../../inputs";
import { updateCustomAccountingFieldOptionOutputSchema } from "../../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomAccountingFieldOptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customAccountingFieldOptionId, reactivate, value },
  ) => {
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
  examplePerform: async (
    _context,
    { value },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateCustomAccountingFieldOptionResponsev,
      value: value ?? updateCustomAccountingFieldOptionResponsev.value,
    },
  }),
  examplePayload: {
    data: updateCustomAccountingFieldOptionResponsev,
  },
});
