import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateInvoiceCustomFieldsExamplePayload } from "../../examplePayloads";
import { updateInvoiceCustomFieldsInputs } from "../../inputs";
export const updateInvoiceCustomFields = action({
  display: {
    label: "Update Invoice Custom Fields",
    description: "Update custom fields for specified Invoices",
  },
  inputs: updateInvoiceCustomFieldsInputs,
  perform: async (context, { connection, operations }) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.patch(`/invoices/custom-fields`, {
      operations,
    });
    return {
      data,
    };
  },
  examplePayload: updateInvoiceCustomFieldsExamplePayload,
});
