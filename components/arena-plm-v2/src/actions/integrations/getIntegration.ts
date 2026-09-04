import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getIntegrationExamplePayload } from "../../examplePayloads";
import { getIntegrationInputs } from "../../inputs";
import { getIntegrationOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getIntegration = action({
  display: {
    label: "Get Integration",
    description:
      "Returns a specific outbound integrations object matching the given GUID from Arena PLM system.",
  },
  inputs: getIntegrationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getIntegrationOutputSchema,
  }),
  examplePayload: getIntegrationExamplePayload,
  perform: async (context, { connection, integrationGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/outboundintegrations/${integrationGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Integration");
    }
  },
});
