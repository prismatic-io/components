import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getJobFunctionExamplePayload } from "../../../examplePayloads";
import { getJobFunctionInputs } from "../../../inputs";

export const getJobFunction = action({
  display: {
    label: "Get Job Function (V2)",
    description: "Retrieve a specific job function by ID.",
  },
  inputs: getJobFunctionInputs,
  examplePayload: getJobFunctionExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/job-functions/${id}`);
    return { data };
  },
});
