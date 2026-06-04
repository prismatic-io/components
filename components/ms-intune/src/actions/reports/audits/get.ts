import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { getDirectoryAuditExamplePayload } from "../../../examplePayloads";
import { getMicrosoftEntraInputs } from "../../../inputs/reports/audits/get";

export const getDirectoyAudit = action({
  display: {
    label: "Get Directory Audit",
    description: "Get a specific Microsoft Entra audit log item.",
  },
  perform: async (context, { connection, microsoftEntraId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/auditLogs/directoryAudits/${microsoftEntraId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...getMicrosoftEntraInputs,
  },
  examplePayload: getDirectoryAuditExamplePayload,
});
