import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateInvoiceCustomFieldsExamplePayload } from "../../examplePayloads";
import { updateInvoiceCustomFieldsInputs } from "../../inputs";
export const updateInvoiceCustomFields = action({
  display: {
    label: "Update Invoice Custom Fields",
    description: "Update custom fields for specified invoices.",
  },
  inputs: updateInvoiceCustomFieldsInputs,
  performSafety: "notAllowed",
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
  examplePerform: async () => updateInvoiceCustomFieldsExamplePayload,
  examplePayload: updateInvoiceCustomFieldsExamplePayload,
});
