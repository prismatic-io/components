import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listDevicesExamplePayload } from "../../examplePayloads/devices";
import { listDevicesInputs } from "../../inputs/devices/list";
import { connection } from "../../inputs/general";
import { fetchAllData } from "../../util";

export const listDevices = action({
  display: {
    label: "List Devices",
    description: "Retrieve a list of devices",
  },
  inputs: {
    ...listDevicesInputs,
    connection,
  },
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      filter,
      group,
      includes,
      page,
      pageSize,
      sort,
    },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const data = await fetchAllData(
      client,
      "/devices",
      {
        customQueryParams,
        filter,
        group,
        includes,
        page,
        pageSize,
        sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listDevicesExamplePayload,
  },
});
