import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { listEmailDefinitionsExamplePayload } from "../../examplePayloads";
import { listEmailDefinitionsInputs } from "../../inputs";
import { listEmailDefinitionsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listEmailDefinitions = action({
  examplePayload: listEmailDefinitionsExamplePayload,
  display: {
    label: "List Email Definitions",
    description:
      "List transactional email send definitions with optional pagination.",
  },
  inputs: listEmailDefinitionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEmailDefinitionsOutputSchema,
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listEmailDefinitionsExamplePayload.data,
  }),
});
