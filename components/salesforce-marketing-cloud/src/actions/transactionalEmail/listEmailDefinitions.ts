import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { listEmailDefinitionsExamplePayload } from "../../examplePayloads";
import { listEmailDefinitionsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listEmailDefinitions = action({
  examplePayload: listEmailDefinitionsExamplePayload,
  display: {
    label: "List Email Definitions",
    description:
      "List transactional email send definitions with optional pagination.",
  },
  inputs: listEmailDefinitionsInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      EMAIL_DEFINITIONS_PATH,
      fetchAll,
      params,
      {
        itemsField: "definitions",
        preserveFields: ["requestId"],
      },
    );

    return { data };
  },
});
