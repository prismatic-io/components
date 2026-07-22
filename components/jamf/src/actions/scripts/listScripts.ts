import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listScriptsExamplePayload } from "../../examplePayloads";
import { listScriptsInputs } from "../../inputs";
import type { Script } from "../../types";
import { paginateResults } from "../../util";
export const listScripts = action({
  display: {
    label: "List Scripts",
    description: "List all scripts with optional filtering and pagination.",
  },
  inputs: listScriptsInputs,
  perform: async (
    context,
    { connection, pagination, sort, filter, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateResults<Script>(
      client,
      "/v1/scripts",
      fetchAll,
      { page: pagination.page, "page-size": pagination.pageSize, sort, filter },
    );
    return { data };
  },
  examplePayload: listScriptsExamplePayload,
});
