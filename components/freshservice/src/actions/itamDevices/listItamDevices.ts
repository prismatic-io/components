import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listItamDevicesExamplePayload as examplePayload } from "../../examplePayloads";
import { listItamDevicesInputs as inputs } from "../../inputs";
import { itamDevicesListOutputSchema } from "../../outputSchemas";
import { getItamListData } from "../../util";
export const listItamDevices = action({
  display: {
    label: "List Devices (ITAM)",
    description: "Returns a list of devices.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, includeCols },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data, meta } = await getItamListData(client, "devices", "devices", {
      fetchAll,
      params: {
        include_cols: includeCols,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return { data: { meta, ...data } };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itamDevicesListOutputSchema,
  }),
  inputs,
  examplePayload,
});
