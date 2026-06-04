import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { listSmsDefinitionsExamplePayload } from "../../examplePayloads";
import { listSmsDefinitionsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listSmsDefinitions = action({
  examplePayload: listSmsDefinitionsExamplePayload,
  display: {
    label: "List SMS Definitions",
    description:
      "List transactional SMS send definitions with optional pagination.",
  },
  inputs: listSmsDefinitionsInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      SMS_DEFINITIONS_PATH,
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
