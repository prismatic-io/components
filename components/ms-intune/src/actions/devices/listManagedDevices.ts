import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listManagedDevicesExamplePayload } from "../../examplePayloads";
import { listManagedDevicesInputs } from "../../inputs";
import { listManagedDevicesOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";

export const listManagedDevices = action({
  display: {
    label: "List Managed Devices",
    description:
      "List properties and relationships of the Managed Device objects.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listManagedDevicesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top: pagination.$top,
      $skip: pagination.$skip,
      $count: filters.$count,
      $search: filters.$search,
      $format: filters.$format,
      $skipToken: pagination.$skipToken,
    };
    const data = await paginateResults(
      client,
      ENDPOINTS.MANAGED_DEVICES,
      fetchAll,
      params,
    );
    return {
      data,
    };
  },
  examplePerform: async () => listManagedDevicesExamplePayload,
  inputs: listManagedDevicesInputs,
  examplePayload: listManagedDevicesExamplePayload,
});
