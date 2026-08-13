import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDirectoryAuditExamplePayload } from "../../examplePayloads";
import { listDirectoryAuditsInputs } from "../../inputs";
import { paginateResults } from "../../util";
export const listDirectoryAudits = action({
  display: {
    label: "List Directory Audits",
    description: "Retrieve a list of directory audits.",
  },
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $orderBy: filters.$orderBy,
      $skipToken: pagination.$skipToken,
      $top: pagination.$top,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.DIRECTORY_AUDITS,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: listDirectoryAuditsInputs,
  examplePayload: listDirectoryAuditExamplePayload,
});
