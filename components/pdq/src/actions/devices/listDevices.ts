import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { DEVICES_ENDPOINT } from "../../constants";
import { listDevicesExamplePayload } from "../../examplePayloads/devices";
import { listDevicesInputs } from "../../inputs";
import { listDevicesOutputSchema } from "../../outputSchemas";
import { fetchAllData } from "../../util";
export const listDevices = action({
  display: {
    label: "List Devices",
    description: "Retrieve a list of devices.",
  },
  inputs: listDevicesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDevicesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      filters = {},
      group,
      includes,
      pagination = {},
    },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const data = await fetchAllData(
      client,
      DEVICES_ENDPOINT,
      {
        ...customQueryParams,
        filter: filters.filter,
        group,
        includes,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort: filters.sort,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listDevicesExamplePayload.data,
  }),
  examplePayload: listDevicesExamplePayload,
});
