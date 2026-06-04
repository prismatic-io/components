import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection } from "../inputs/general";
import { paginateResults } from "../util";

export const selectDirectoryAudit = dataSource({
  display: {
    label: "Select Directory Audit",
    description:
      "Select a directory audit entry from the list of directory audits.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateResults(
      client,
      "/auditLogs/directoryaudits",
      true,
    );

    const result = (data.value as { id: string; activityDisplayName: string }[])
      .map<Element>((audit) => ({
        label: audit.activityDisplayName,
        key: audit.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Add member to group",
        key: "audit-id-123",
      },
    ],
  },
});
