import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postTableExamplePayload } from "../../examplePayloads";
import { postTableInputs } from "../../inputs";
import { postTableOutputSchema } from "../../outputSchemas";
import { compactRows } from "../../util";
export const postTable = action({
  display: {
    label: "Create Table",
    description: "Creates a new table with the specified name.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      tenant,
      displayName,
      additionalFields = {},
      name,
      fields,
      tags,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      displayName,
      description: additionalFields.description,
      documentation: additionalFields.documentation,
      enableForAnalysis: additionalFields.enableForAnalysis,
      name,
      tags: compactRows(tags),
      fields,
    };
    const { data } = await client.post(
      `${SERVICES.prismAnalytics}/${tenant}/tables`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postTableExamplePayload,
  inputs: postTableInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postTableOutputSchema,
  }),
  examplePayload: postTableExamplePayload,
});
