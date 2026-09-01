import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { updateCustomObjectExamplePayload } from "../../../examplePayloads";
import { updateCustomObjectInputs } from "../../../inputs";
export const updateCustomObject = action({
  display: {
    label: "Update Custom Object (V2)",
    description: "Update an existing custom object.",
  },
  inputs: updateCustomObjectInputs,
  examplePayload: updateCustomObjectExamplePayload,
  perform: async (
    context,
    { connection, customObjectApiName, additionalFields },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.patch(
      `/custom-objects/${customObjectApiName}/`,
      {
        name: additionalFields.name,
        description: additionalFields.description,
        category: additionalFields.category,
        plural_label: additionalFields.pluralLabel,
        owner_role: additionalFields.ownerRole,
      },
    );
    return { data };
  },
});
