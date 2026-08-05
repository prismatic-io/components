import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBookingByProviderExamplePayload as listBookingByTenantExamplePayload } from "../../examplePayloads";
import { listByTenantInputs } from "../../inputs";
import type { Booking } from "../../types";
import { fetchAllRecords } from "../../util";
export const listBookingByTenant = action({
  display: {
    label: "List Bookings by Tenant",
    description: "Retrieves a list of bookings",
  },
  inputs: listByTenantInputs,
  perform: async (
    context,
    { connection, includeTotal, pagination, sort, fetchAll, customQueryParams },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Booking>(client, "/bookings", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/bookings`, {
      params: {
        includeTotal,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listBookingByTenantExamplePayload,
});
