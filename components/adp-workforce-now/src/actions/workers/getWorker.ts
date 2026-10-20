import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkerExamplePayload } from "../../examplePayloads";
import { getWorkerInputs } from "../../inputs";
import { getWorkerOutputSchema } from "../../outputSchemas";
export const getWorker = action({
  display: {
    label: "Get Worker",
    description: "Retrieve a worker by their Associate OID",
  },
  inputs: getWorkerInputs,
  performSafety: "safe",
  perform: async (context, { connection, $select, aoid }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(`/hr/v2/workers/${aoid}`, {
      params: {
        $select,
      },
    });
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerOutputSchema,
  }),
  examplePayload: getWorkerExamplePayload,
});
