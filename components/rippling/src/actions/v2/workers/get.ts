import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getWorkerExamplePayload } from "../../../examplePayloads";
import { getWorkerInputs } from "../../../inputs";

export const getWorker = action({
  display: {
    label: "Get Worker (V2)",
    description: "Retrieve a specific worker by ID.",
  },
  inputs: getWorkerInputs,
  examplePayload: getWorkerExamplePayload,
  perform: async (context, { connection, id, expand }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/workers/${id}`, {
      params: {
        expand,
      },
    });
    return { data };
  },
});
