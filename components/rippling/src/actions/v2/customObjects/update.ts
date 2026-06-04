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
    {
      connection,
      customObjectApiName,
      name,
      description,
      category,
      pluralLabel,
      ownerRole,
    },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.patch(
      `/custom-objects/${customObjectApiName}/`,
      {
        name,
        description,
        category,
        plural_label: pluralLabel,
        owner_role: ownerRole,
      },
    );
    return { data };
  },
});
