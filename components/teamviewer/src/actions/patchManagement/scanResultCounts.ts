import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { scanResultsCountExamplePayload } from "../../examplePayloads/patchManagement";
import { scanResultsCountInputs } from "../../inputs/patchManagement";

export const scanResultsCount = action({
  display: {
    label: "Scan Results Count",
    description:
      "Retrieves the number of scan results for the specified devices.",
  },
  perform: async (
    context,
    { connection, continuation_token, device_id_list },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/patchmanagement/scanresultcounts`, {
      device_id_list,
      continuation_token,
    });

    return {
      data,
    };
  },
  inputs: scanResultsCountInputs,
  examplePayload: scanResultsCountExamplePayload,
});
