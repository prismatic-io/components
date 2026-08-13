import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";
import { selectDirectoryAuditExamplePayload } from "../examplePayloads";
import { selectDirectoryAuditInputs } from "../inputs";
import type { SelectableDirectoryAudit } from "../types";
import { paginateResults } from "../util";
export const selectDirectoryAudit = dataSource({
  display: {
    label: "Select Directory Audit",
    description:
      "Select a directory audit entry from the list of directory audits.",
  },
  inputs: selectDirectoryAuditInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateResults(
      client,
      ENDPOINTS.DIRECTORY_AUDITS,
      true,
    );
    const result = (data.value as SelectableDirectoryAudit[])
      .map<Element>((audit) => ({
        label: audit.activityDisplayName,
        key: audit.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectDirectoryAuditExamplePayload,
});
