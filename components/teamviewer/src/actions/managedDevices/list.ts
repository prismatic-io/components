import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listManagedDevicesInputs } from "../../inputs/managedDevices";
import { listManagedDevicesExamplePayload } from "../../examplePayloads/managedDevices";
import { paginateWithPaginationToken } from "../../util";

export const listManagedDevices = action({
  display: {
    label: "List Managed Devices",
    description: "Returns a list of managed devices.",
  },
  perform: async (
    context,
    { connection, queryParams, paginationToken, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateWithPaginationToken(
      client,
      "/managed/devices",
      fetchAll,
      {
        ...queryParams,
        paginationToken,
      },
    );

    return {
      data,
    };
  },
  inputs: listManagedDevicesInputs,
  examplePayload: listManagedDevicesExamplePayload,
});
