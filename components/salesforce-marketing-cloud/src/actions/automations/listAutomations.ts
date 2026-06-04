import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { listAutomationsExamplePayload } from "../../examplePayloads";
import { listAutomationsInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listAutomations = action({
  examplePayload: listAutomationsExamplePayload,
  display: {
    label: "List Automations",
    description: "List Automation Studio automations with optional pagination.",
  },
  inputs: listAutomationsInputs,
  perform: async (context, { connection, fetchAll, pageSize, page }) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
    };

    const data = await paginateResults(
      client,
      AUTOMATIONS_PATH,
      fetchAll,
      params,
    );

    return { data };
  },
});
