import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listIntegrationsExamplePayload } from "../../examplePayloads";
import { listIntegrationsInputs } from "../../inputs";
import { listIntegrationsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listIntegrations = action({
  display: {
    label: "List Integrations",
    description:
      "Returns a collection of outbound integrations objects matching the given search criteria from Arena PLM system.",
  },
  inputs: listIntegrationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIntegrationsOutputSchema,
  }),
  examplePayload: listIntegrationsExamplePayload,
  perform: async (
    context,
    { connection, name, enabled, pagination = {}, fetchAll },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        name,
        enabled,
        offset: pagination.offset,
        limit: pagination.limit,
      };
      const path = "/outboundintegrations";
      const data = await fetchArenaList(client, path, params, fetchAll);
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Integrations");
    }
  },
});
