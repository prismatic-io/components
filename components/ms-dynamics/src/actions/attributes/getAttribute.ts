import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { getAttributeExamplePayload } from "../../examplePayloads";
import { getAttributeInputs } from "../../inputs";

export const getAttribute = action({
  display: {
    label: "Get Attribute",
    description: "Retrieves a single CRM attribute.",
  },
  inputs: getAttributeInputs,
  examplePayload: getAttributeExamplePayload,
  perform: async (context, params) => {
    const client = await createCrmClient(params.connection, context.debug.enabled);

    const result = await client.retrieveAttribute({
      entityKey: params.entityId,
      attributeKey: params.attributeType,
      select: params.fieldNames,
      expand: params.expandPropertyNames,
    });

    return { data: result };
  },
});
