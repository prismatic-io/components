import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { listAutomationsExamplePayload } from "../../examplePayloads";
import { listAutomationsInputs } from "../../inputs";
import { listAutomationsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listAutomations = action({
  examplePayload: listAutomationsExamplePayload,
  display: {
    label: "List Automations",
    description: "List Automation Studio automations with optional pagination.",
  },
  inputs: listAutomationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAutomationsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
    };
    const data = await paginateResults(
      client,
      AUTOMATIONS_PATH,
      fetchAll,
      params,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listAutomationsExamplePayload.data,
  }),
});
