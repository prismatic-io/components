import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { getOneJobExamplePayload as examplePayload } from "../../examplePayloads";
import { getOneJobInputs as inputs } from "../../inputs/job";

export const getOneJob = action({
  display: {
    label: "Get One Job",
    description:
      "Returns a Job object containing information about one employee job at a restaurant.",
  },
  perform: async (context, { connection, restaurantExternalId, jobId }) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.get(`/labor/v1/jobs/${jobId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
