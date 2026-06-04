import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getJobResponse } from "../../examplePayloads";
import { connection, externalDataApplicationGuid, jobId } from "../../inputs";

export const getJob = action({
  display: {
    label: "Get Job",
    description: "Retrieve a job by ID",
  },
  inputs: {
    connection,
    jobId,
    externalDataApplicationGuid: {
      ...externalDataApplicationGuid,
      required: false,
    },
  },
  perform: async (
    context,
    { connection, jobId, externalDataApplicationGuid },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    const { data } = await client.get(`/jobs/${jobId}`, {
      params: {
        externalDataApplicationGuid,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getJobResponse,
  },
});
