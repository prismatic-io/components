import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateTableByIdExamplePayload } from "../../examplePayloads";
import { updateTableByIdInputs } from "../../inputs";
import { updateTableByIdOutputSchema } from "../../outputSchemas";
import { compactRows } from "../../util";

export const updateTableById = action({
  display: {
    label: "Update Table by ID",
    description: "Updates an existing table with the specified name.",
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
      tableId,
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
    const { data } = await client.put(
      `${SERVICES.prismAnalytics}/${tenant}/tables/${tableId}`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateTableByIdExamplePayload,
  inputs: updateTableByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTableByIdOutputSchema,
  }),
  examplePayload: updateTableByIdExamplePayload,
});
