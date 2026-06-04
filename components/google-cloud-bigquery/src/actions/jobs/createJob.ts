import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  configuration,
  connectionInput,
  etag,
  id,
  jobReference,
  kind,
  projectId,
  selfLink,
  statistics,
  status,
  userEmail,
} from "../../inputs";

export const createJob = action({
  display: {
    description: "Starts a new asynchronous job.",
    label: "Create Job",
  },
  inputs: {
    connectionInput,
    projectId,
    configuration,
    kind,
    etag,
    id,
    selfLink,
    userEmail,
    jobReference,
    statistics,
    status,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      kind,
      etag,
      id,
      selfLink,
      userEmail,
      configuration,
      jobReference,
      statistics,
      status,
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.jobs.insert({
      projectId: projectId || undefined,
      requestBody: {
        kind: kind || undefined,
        etag: etag || undefined,
        id: id || undefined,
        selfLink: selfLink || undefined,
        user_email: userEmail || undefined,
        configuration: configuration || undefined,
        jobReference: jobReference || undefined,
        statistics: statistics || undefined,
        status: status || undefined,
      },
    });
    return {
      data,
    };
  },
});
