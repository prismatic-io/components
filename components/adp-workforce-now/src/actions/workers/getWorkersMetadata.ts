import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWorkersMetadataResponse } from "../../examplePayloads";
import { $filter, connection } from "../../inputs";

export const getWorkersMetadata = action({
  display: {
    label: "Get Worker Metadata",
    description: "Retrieves a meta on workers",
  },
  inputs: {
    $filter,
    connection,
  },
  perform: async (context, { connection, $filter }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get("/hr/v2/workers/meta", {
      params: {
        $filter,
      },
    });
    return { data };
  },
  examplePayload: {
    data: listWorkersMetadataResponse,
  },
});
