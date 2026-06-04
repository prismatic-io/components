import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPatchManagementDevicesExamplePayload } from "../../examplePayloads/patchManagement";
import { listPatchManagementDevicesInputs } from "../../inputs/patchManagement";
import { paginateWithContinuationToken } from "../../util";

export const listPatchMagementDevices = action({
  display: {
    label: "List Patch Management Device",
    description: "Returns a list of patch management devices.",
  },
  perform: async (
    context,
    { connection, continuationToken, queryParams, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateWithContinuationToken(
      client,
      "/patchmanagement/devices",
      fetchAll,
      {
        ...queryParams,
        continuationToken,
      },
    );

    return {
      data,
    };
  },
  inputs: listPatchManagementDevicesInputs,
  examplePayload: listPatchManagementDevicesExamplePayload,
});
