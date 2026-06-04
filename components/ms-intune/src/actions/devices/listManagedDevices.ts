import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, odataParams, fetchAll } from "../../inputs/general";
import { listManagedDevicesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listManagedDevices = action({
  display: {
    label: "List Managed Devices",
    description:
      "List properties and relationships of the Managed Device objects.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    };
    const data = await paginateResults(
      client,
      "/deviceManagement/managedDevices",
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listManagedDevicesExamplePayload,
});
