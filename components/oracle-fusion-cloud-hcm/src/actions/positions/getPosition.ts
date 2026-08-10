import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPositionExamplePayload } from "../../examplePayloads/positions";
import { getPositionInputs } from "../../inputs";
import { positionOutputSchema } from "../../outputSchemas";
import type { Position } from "../../types";
export const getPosition = action({
  display: {
    label: "Get Position",
    description:
      "Retrieve a single position by Position ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getPositionExamplePayload,
  inputs: getPositionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: positionOutputSchema,
  }),
  perform: async (
    context,
    { connection, positionId, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Position>(`/positions/${positionId}`, {
      params: {
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
