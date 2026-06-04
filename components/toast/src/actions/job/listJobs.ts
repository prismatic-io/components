import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listJobsExamplePayload as examplePayload } from "../../examplePayloads";
import { listJobsInputs as inputs } from "../../inputs/job";
import { serializeRepeatedParam } from "../../utils";

export const listJobs = action({
  display: {
    label: "List Jobs",
    description:
      "Returns an array of Job objects containing information about the employee jobs configured at a restaurant.",
  },
  perform: async (context, { connection, restaurantExternalId, jobIds }) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const serializedjobIds = serializeRepeatedParam(jobIds || [], "jobIds");

    const { data } = await client.get(`/labor/v1/jobs?${serializedjobIds}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
