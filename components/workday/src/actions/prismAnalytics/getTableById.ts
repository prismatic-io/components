import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTableByIdExamplePayload } from "../../examplePayloads";
import { getTableByIdInputs } from "../../inputs";

export const getTableById = action({
  display: {
    label: "Get Table by ID",
    description:
      "Retrieves the description of a table or dataset the current user has permission to access.",
  },
  perform: async (context, { connection, tenant, tableId, params }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/tables/${tableId}`,
      { params },
    );
    return {
      data,
    };
  },
  inputs: getTableByIdInputs,
  examplePayload: getTableByIdExamplePayload,
});
