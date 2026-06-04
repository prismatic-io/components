import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listWorkersResponse } from "../../../examplePayloads";
import { $select, aoid, connection } from "../../../inputs";

export const getWorkerDemographics = action({
  display: {
    label: "Get Worker Demographics",
    description: "Returns a worker demographic by Associate OID",
  },
  inputs: {
    aoid,
    $select,
    connection,
  },
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
  examplePayload: {
    data: listWorkersResponse,
  },
});
