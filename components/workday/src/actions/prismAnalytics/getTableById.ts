import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTableByIdExamplePayload } from "../../examplePayloads";
import { getTableByIdInputs } from "../../inputs";
import { getTableByIdOutputSchema } from "../../outputSchemas";
export const getTableById = action({
  display: {
    label: "Get Table by ID",
    description:
      "Retrieves the description of a table or dataset the current user has permission to access.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, tenant, tableId, extraParameters },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/tables/${tableId}`,
      { params: extraParameters },
    );
    return {
      data,
    };
  },
  inputs: getTableByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTableByIdOutputSchema,
  }),
  examplePayload: getTableByIdExamplePayload,
});
