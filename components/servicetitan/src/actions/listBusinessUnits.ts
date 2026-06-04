import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listBusinessUnitsResponse } from "../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../inputs";
import type { BusinessUnits } from "../interfaces";
import { fetchAllRecords } from "../util";

export const listBusinessUnits = action({
  display: {
    label: "List Business Units",
    description: "Gets a list of business units",
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
    const client = createClient(connection, "settings", context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords<BusinessUnits>(
        client,
        "/business-units",
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
    const { data } = await client.get(`/business-units`, {
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
    data: listBusinessUnitsResponse,
  },
});
