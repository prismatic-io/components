import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getCustomAccountingFieldOptionResponse as createCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import {
  connection,
  customAccountingFieldOptionId,
  options,
} from "../../../inputs";
import { uploadCustomAccountingFieldOptionOutputSchema } from "../../../outputSchemas";
export const uploadCustomAccountingFieldOption = action({
  display: {
    label: "Upload Custom Accounting Field Option",
    description: "Upload a new custom accounting field option",
  },
  inputs: {
    customAccountingFieldOptionId: {
      ...customAccountingFieldOptionId,
      comments:
        "The ID of the custom accounting field option for which to upload options",
    },
    options,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadCustomAccountingFieldOptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customAccountingFieldOptionId, options },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/accounting/field-options`, {
      field_id: customAccountingFieldOptionId,
      options,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createCustomAccountingFieldOptionResponse,
  }),
  examplePayload: {
    data: createCustomAccountingFieldOptionResponse,
  },
});
