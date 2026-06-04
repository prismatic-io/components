import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  connectionProperties,
  createSession,
  defaultDataset,
  dryRun,
  kind,
  labels,
  location,
  maximumBytesBilled,
  maxResults,
  parameterMode,
  projectId,
  query,
  queryParameters,
  requestId,
  timeoutMs,
  useLegacySql,
  useQueryCache,
} from "../../inputs";

export const queryJob = action({
  display: {
    description:
      "Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout.",
    label: "Query Job",
  },
  inputs: {
    connectionInput,
    projectId,
    kind,
    query,
    maxResults,
    defaultDataset,
    timeoutMs,
    dryRun,
    useQueryCache,
    useLegacySql,
    parameterMode,
    queryParameters,
    location,
    connectionProperties,
    labels,
    maximumBytesBilled,
    requestId,
    createSession,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      kind,
      query,
      maxResults,
      defaultDataset,
      timeoutMs,
      dryRun,
      useQueryCache,
      useLegacySql,
      parameterMode,
      queryParameters,
      location,
      connectionProperties,
      labels,
      maximumBytesBilled,
      requestId,
      createSession,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.query({
      projectId: projectId || undefined,
      requestBody: {
        kind: kind || undefined,
        query: query || undefined,
        maxResults: maxResults || undefined,
        defaultDataset: defaultDataset || undefined,
        timeoutMs: timeoutMs || undefined,
        dryRun,
        useQueryCache,
        useLegacySql,
        parameterMode: parameterMode || undefined,
        queryParameters: queryParameters || undefined,
        location: location || undefined,
        connectionProperties: connectionProperties || undefined,
        labels: labels || undefined,
        maximumBytesBilled: maximumBytesBilled || undefined,
        requestId: requestId || undefined,
        createSession,
      },
    });
    return {
      data,
    };
  },
});
