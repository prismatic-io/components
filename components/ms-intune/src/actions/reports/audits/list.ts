import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { listDirectoryAuditExamplePayload } from "../../../examplePayloads";
import { paginateResults } from "../../../util";
import { odataAuditParams } from "../../../inputs/reports/general";

export const listDirectoryAudits = action({
  display: {
    label: "List Directory Audits",
    description: "Retrieve a list of directory audits.",
  },
  perform: async (
    context,
    { connection, $filter, $orderBy, $skipToken, $top, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $filter,
      $orderBy,
      $skipToken,
      $top,
    };

    const data = await paginateResults(
      client,
      "/auditLogs/directoryaudits",
      fetchAll,
      params,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...odataAuditParams,
  },
  examplePayload: listDirectoryAuditExamplePayload,
});
