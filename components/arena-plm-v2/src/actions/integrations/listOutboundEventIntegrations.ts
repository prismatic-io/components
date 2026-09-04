import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listOutboundEventIntegrationsExamplePayload } from "../../examplePayloads";
import { listOutboundEventIntegrationsInputs } from "../../inputs";
import { listOutboundEventIntegrationsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listOutboundEventIntegrations = action({
  display: {
    label: "List Outbound Event Integrations",
    description: "Get outbound event integrations from Arena PLM system.",
  },
  inputs: listOutboundEventIntegrationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOutboundEventIntegrationsOutputSchema,
  }),
  examplePayload: listOutboundEventIntegrationsExamplePayload,
  perform: async (
    context,
    { connection, name, enable, pagination, fetchAll },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        name,
        enable,
        offset: pagination?.offset,
        limit: pagination?.limit,
      };
      const endpoint = "/outboundevents";
      const integrations = await fetchArenaList(
        client,
        endpoint,
        params,
        fetchAll,
      );
      context.logger.info("Retrieved outbound event integrations", {
        count: integrations.count || 0,
      });
      return { data: integrations };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Outbound Event Integrations",
      );
    }
  },
});
