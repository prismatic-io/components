import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getCustomFieldExamplePayload } from "../../examplePayloads";
import { getCustomFieldInputs } from "../../inputs";
import { customFieldResponseSchema } from "../../outputSchemas";
export const getCustomField = action({
  display: {
    label: "Get Custom Field",
    description: "Get the information and metadata of a custom field.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/custom_fields/${params.fieldId}`, {
      params: {
        opt_fields: params.optFields,
        opt_pretty: true,
      },
    });
    return { data };
  },
  inputs: getCustomFieldInputs,
  examplePayload: getCustomFieldExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: customFieldResponseSchema,
  }),
});
