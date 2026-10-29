import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { runWqlQueryExamplePayload } from "../../examplePayloads";
import { runWqlQueryInputs } from "../../inputs";
import {
  assertWqlReadComplete,
  buildWqlPath,
  getConnectionTenant,
  queryWqlAll,
  queryWqlPage,
} from "../../util";
import { runWqlQueryOutputSchema } from "../../outputSchemas";

export const runWqlQuery = action({
  display: {
    label: "Run WQL Query",
    description:
      "Runs a Workday Query Language (WQL) query and returns the matching rows.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, query, tenant, fetchAll, pagination = {} },
  ) => {
    const resolvedTenant = tenant || getConnectionTenant(connection);
    if (!resolvedTenant) {
      throw new Error(
        "Tenant is required when the connection doesn't include one. Enter the Workday tenant name.",
      );
    }
    const client = getClient(connection, context.debug.enabled);
    const path = buildWqlPath(resolvedTenant);

    const data = fetchAll
      ? await queryWqlAll(client, path, query, pagination.limit || undefined)
      : await queryWqlPage(client, path, query, {
          limit: pagination.limit,
          offset: pagination.offset,
        });
    if (fetchAll) assertWqlReadComplete(data);
    return { data };
  },
  examplePerform: async () => runWqlQueryExamplePayload,
  inputs: runWqlQueryInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runWqlQueryOutputSchema,
  }),
  examplePayload: runWqlQueryExamplePayload,
});
