import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getWorkerDemographicsExamplePayload } from "../../../examplePayloads";
import { getWorkerDemographicsInputs } from "../../../inputs";
import { getWorkerDemographicsOutputSchema } from "../../../outputSchemas";
export const getWorkerDemographics = action({
  display: {
    label: "Get Worker Demographics",
    description: "Returns a worker demographic by Associate OID",
  },
  inputs: getWorkerDemographicsInputs,
  performSafety: "safe",
  perform: async (context, { connection, $select, aoid }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/worker-demographics/${aoid}`,
      {
        params: {
          $select,
        },
      },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerDemographicsOutputSchema,
  }),
  examplePayload: getWorkerDemographicsExamplePayload,
});
