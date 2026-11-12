import { action, outputSchema } from "@prismatic-io/spectral";
import { createTemplateOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createTemplateInputs } from "../../inputs";
import { createTemplateExamplePayload } from "../../examplePayloads";

export const createTemplate = action({
  display: {
    label: "Create Template",
    description:
      "Creates one or more template definitions, using a multipart request for each template.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/templates`, jsonInput);
    return { data };
  },
  examplePerform: async () => createTemplateExamplePayload,
  inputs: createTemplateInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTemplateOutputSchema,
  }),
  examplePayload: createTemplateExamplePayload,
});
