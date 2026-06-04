import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  jobId,
  location,
  maxResults,
  pageToken,
  projectId,
  startIndex,
  timeoutMs,
} from "../../inputs";

export const getQueryJobResult = action({
  display: {
    description: "Receives the results of a query job.",
    label: "Get Query Job Results",
  },
  inputs: {
    connectionInput,
    projectId,
    jobId,
    startIndex,
    pageToken,
    maxResults,
    timeoutMs,
    location,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      jobId,
      startIndex,
      pageToken,
      maxResults,
      timeoutMs,
      location,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.getQueryResults({
      projectId: projectId || undefined,
      jobId: jobId || undefined,
      startIndex: startIndex || undefined,
      pageToken: pageToken || undefined,
      maxResults: maxResults || undefined,
      timeoutMs: timeoutMs || undefined,
      location: location || undefined,
    });
    return {
      data,
    };
  },
});
