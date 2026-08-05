import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listInstalledEquipmentExamplePayload } from "../../examplePayloads";
import { listInstalledEquipmentInputs } from "../../inputs";
import type { InstalledEquipment } from "../../types";
import { fetchAllRecords } from "../../util";
export const listInstalledEquipment = action({
  display: {
    label: "List Installed Equipment",
    description: "Retrieve a list of installed equipment",
  },
  inputs: listInstalledEquipmentInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(
      connection,
      "equipmentsystems",
      context.debug.enabled,
    );
    if (fetchAll) {
      const data = await fetchAllRecords<InstalledEquipment>(
        client,
        "/installed-equipment",
        {
          includeTotal,
          sort,
          ...customQueryParams,
        },
      );
      return {
        data,
      };
    }
    const { data } = await client.get(`/installed-equipment`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listInstalledEquipmentExamplePayload,
});
