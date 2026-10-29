import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { updateFieldExamplePayload } from "../../examplePayloads";
import { updateFieldInputs } from "../../inputs";

export const updateField = action({
  display: {
    label: "Update Field",
    description: "Updates an existing custom field in HiBob.",
  },
  perform: async (context, { connection, fieldId, name, description }) => {
    const client = getClient(connection, context.debug.enabled);

    await client.put(`/company/people/fields/${fieldId}`, {
      name,
      description,
    });
    return {
      data: {
        success: true,
        message: "Field updated successfully",
      },
    };
  },
  inputs: updateFieldInputs,
  examplePayload: updateFieldExamplePayload,
});
