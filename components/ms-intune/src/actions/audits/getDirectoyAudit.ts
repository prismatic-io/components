import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getDirectoryAuditExamplePayload } from "../../examplePayloads";
import { getDirectoyAuditInputs } from "../../inputs";
export const getDirectoyAudit = action({
  display: {
    label: "Get Directory Audit",
    description: "Get a specific Microsoft Entra audit log item.",
  },
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
  examplePayload: getDirectoryAuditExamplePayload,
});
