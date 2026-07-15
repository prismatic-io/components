import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { queryJobInputs } from "../../inputs";
export const queryJob = action({
  display: {
    description:
      "Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout.",
    label: "Query Job",
  },
  inputs: queryJobInputs,
  perform: async (
    _context,
    { connectionInput, projectId, query, maxResults, additionalFields = {} },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.query({
      projectId: projectId || undefined,
      requestBody: {
        kind: additionalFields.kind || undefined,
        query: query || undefined,
        maxResults: maxResults || undefined,
        defaultDataset: additionalFields.defaultDataset || undefined,
        timeoutMs: additionalFields.timeoutMs || undefined,
        dryRun: additionalFields.dryRun,
        useQueryCache: additionalFields.useQueryCache,
        useLegacySql: additionalFields.useLegacySql,
        parameterMode: additionalFields.parameterMode || undefined,
        queryParameters: additionalFields.queryParameters || undefined,
        location: additionalFields.location || undefined,
        connectionProperties:
          additionalFields.connectionProperties || undefined,
        labels: additionalFields.labels || undefined,
        maximumBytesBilled: additionalFields.maximumBytesBilled || undefined,
        requestId: additionalFields.requestId || undefined,
        createSession: additionalFields.createSession,
      },
    });
    return {
      data,
    };
  },
});
