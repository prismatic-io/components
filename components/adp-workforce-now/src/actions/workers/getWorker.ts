import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWorkerResponse } from "../../examplePayloads";
import { $select, aoid, connection } from "../../inputs";

export const getWorker = action({
  display: {
    label: "Get Worker",
    description: "Retrieve a worker by their Associate OID",
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
    const { data } = await axiosClient.get(`/hr/v2/workers/${aoid}`, {
      params: {
        $select,
      },
    });
    return { data };
  },
  examplePayload: {
    data: getWorkerResponse,
  },
});
