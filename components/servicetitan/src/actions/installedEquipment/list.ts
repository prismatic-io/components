import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listInstalledEquipmentResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { InstalledEquipment } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listInstalledEquipment = action({
  display: {
    label: "List Installed Equipment",
    description: "Retrieve a list of installed equipment",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
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
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listInstalledEquipmentResponse,
  },
});
