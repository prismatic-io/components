import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBusinessUnitsExamplePayload } from "../../examplePayloads";
import { listBusinessUnitsInputs } from "../../inputs";
import type { BusinessUnits } from "../../types";
import { fetchAllRecords } from "../../util";
export const listBusinessUnits = action({
  display: {
    label: "List Business Units",
    description: "Gets a list of business units",
  },
  inputs: listBusinessUnitsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
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
  examplePayload: listBusinessUnitsExamplePayload,
});
