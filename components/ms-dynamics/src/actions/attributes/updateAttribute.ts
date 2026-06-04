import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { updateAttributeExamplePayload } from "../../examplePayloads";
import { updateAttributeInputs } from "../../inputs";

export const updateAttribute = action({
  display: {
    label: "Update Attribute",
    description: "Updates an existing CRM attribute on an entity.",
  },
  inputs: updateAttributeInputs,
  examplePayload: updateAttributeExamplePayload,
  perform: async (context, params) => {
    const client = await createCrmClient(params.connection, context.debug.enabled);

    const result = await client.updateAttribute({
      entityKey: params.entityId,
      data: params.attributeBody,
    });

    return { data: result };
  },
});
