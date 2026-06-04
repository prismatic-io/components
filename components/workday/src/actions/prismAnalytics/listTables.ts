import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listTablesExamplePayload } from "../../examplePayloads";
import { listTablesInputs } from "../../inputs";

export const listTables = action({
  display: {
    label: "List Tables",
    description:
      "Retrieves a collection of tables created by the Workday REST API. Only tables or datasets permitted by the current user's security profile are returned.",
  },
  perform: async (context, { connection, tenant, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/tables`,
      { params: { limit, offset, ...params } },
    );
    return {
      data,
    };
  },
  inputs: listTablesInputs,
  examplePayload: listTablesExamplePayload,
});
