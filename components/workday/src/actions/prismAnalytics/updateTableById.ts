import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateTableByIdExamplePayload } from "../../examplePayloads";
import { updateTableByIdInputs } from "../../inputs";
export const updateTableById = action({
  display: {
    label: "Update Table by ID",
    description: "Updates an existing table with the specified name.",
  },
  perform: async (
    context,
    {
      connection,
      tenant,
      displayName,
      additionalFields,
      name,
      fields,
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
      tags: additionalFields.tags,
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
  inputs: updateTableByIdInputs,
  examplePayload: updateTableByIdExamplePayload,
});
