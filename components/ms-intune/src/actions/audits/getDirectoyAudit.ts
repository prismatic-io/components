import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDirectoyAuditExamplePayload } from "../../examplePayloads";
import { getDirectoyAuditInputs } from "../../inputs";
import { getDirectoryAuditOutputSchema } from "../../outputSchemas";

export const getDirectoyAudit = action({
  display: {
    label: "Get Directory Audit",
    description: "Get a specific Microsoft Entra audit log item.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDirectoryAuditOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, microsoftEntraId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.DIRECTORY_AUDITS}/${microsoftEntraId}`,
    );

    return {
      data,
    };
  },
  inputs: getDirectoyAuditInputs,
  examplePayload: getDirectoyAuditExamplePayload,
});
