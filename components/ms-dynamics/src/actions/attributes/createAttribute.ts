import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { createAttributeExamplePayload } from "../../examplePayloads";
import { createAttributeInputs } from "../../inputs";

export const createAttribute = action({
  display: {
    label: "Create Attribute",
    description: "Creates a CRM attribute on an entity.",
  },
  inputs: createAttributeInputs,
  examplePayload: createAttributeExamplePayload,
  perform: async (context, params) => {
    const client = await createCrmClient(params.connection, context.debug.enabled);

    const result = await client.createAttribute({
      entityKey: params.entityId,
      data: params.attributeBody,
    });

    return { data: result };
  },
});
