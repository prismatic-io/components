import { action } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { queryAttributesExamplePayload } from "../../examplePayloads";
import { queryAttributesInputs } from "../../inputs";

export const queryAttributes = action({
  display: {
    label: "Query Attributes",
    description: "Queries CRM attributes that satisfy the filter expression.",
  },
  inputs: queryAttributesInputs,
  examplePayload: queryAttributesExamplePayload,
  perform: async (context, params) => {
    const client = await createCrmClient(params.connection, context.debug.enabled);

    const result = await client.retrieveAttributes({
      entityKey: params.entityId,
      castType: params.attributeType,
      select: params.fieldNames,
      filter: params.filterExpression,
      expand: params.expandPropertyNames,
    });

    return { data: result };
  },
});
