import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listIntegrationAdministratorsExamplePayload } from "../../examplePayloads";
import { listIntegrationAdministratorsInputs } from "../../inputs";
import { userCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listIntegrationAdministrators = action({
  display: {
    label: "List Integration Administrators",
    description:
      "Returns all the integration administrators of a specific outbound integrations object matching the given GUID from Arena PLM system.",
  },
  inputs: listIntegrationAdministratorsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userCompactListSchema,
  }),
  examplePayload: listIntegrationAdministratorsExamplePayload,
  perform: async (context, { connection, integrationGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/outboundintegrations/${integrationGuid}/administrators`,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "List Integration Administrators",
      );
    }
  },
});
