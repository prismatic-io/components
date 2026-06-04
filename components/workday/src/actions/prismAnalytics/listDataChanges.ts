import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listDataChangesExamplePayload } from "../../examplePayloads";
import { listDataChangesInputs } from "../../inputs";

export const listDataChanges = action({
  display: {
    label: "List Data Changes",
    description:
      "Returns the collection of data changes accessible to the authenticated user. Supports offset and limit query parameters. Response type is determined by the 'type' query parameter. The default response includes id, name, and displayName.",
  },
  perform: async (context, { connection, tenant, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/dataChanges`,
      { params: { limit, offset, ...params } },
    );
    return {
      data,
    };
  },
  inputs: listDataChangesInputs,
  examplePayload: listDataChangesExamplePayload,
});
