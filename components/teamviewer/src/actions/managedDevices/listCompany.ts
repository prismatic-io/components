import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listManagedDevicesInputs } from "../../inputs/managedDevices";
import { listCompanyManagedDevicesExamplePayload } from "../../examplePayloads/managedDevices";
import { paginateWithPaginationToken } from "../../util";

export const listCompanyManagedDevices = action({
  display: {
    label: "List Company Managed Devices",
    description:
      "Lists one page of company-managed devices of the company that is associated with the currently logged-in session.",
  },
  perform: async (
    context,
    { connection, queryParams, paginationToken, fetchAll },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const data = await paginateWithPaginationToken(
      client,
      "/managed/devices/company",
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
  examplePayload: listCompanyManagedDevicesExamplePayload,
});
