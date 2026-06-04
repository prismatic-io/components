import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { deleteFieldExamplePayload } from "../../examplePayloads";
import { deleteFieldInputs } from "../../inputs";

export const deleteField = action({
  display: {
    label: "Delete Field",
    description: "Deletes an existing custom field from HiBob.",
  },
  perform: async (context, { connection, fieldId }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.delete(`/company/people/fields/${fieldId}`);
    return {
      data: {
        success: true,
        message: `Field ${fieldId} deleted successfully`,
      },
    };
  },
  inputs: deleteFieldInputs,
  examplePayload: deleteFieldExamplePayload,
});
