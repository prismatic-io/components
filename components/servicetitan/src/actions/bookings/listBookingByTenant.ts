import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBookingByTenantExamplePayload } from "../../examplePayloads";
import { listBookingByTenantInputs } from "../../inputs";
import { listBookingByTenantOutputSchema } from "../../outputSchemas";
import type { Booking } from "../../types";
import { fetchAllRecords } from "../../util";
export const listBookingByTenant = action({
  display: {
    label: "List Bookings by Tenant",
    description: "Retrieves a list of bookings for the tenant.",
  },
  inputs: listBookingByTenantInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listBookingByTenantOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => listBookingByTenantExamplePayload,
  examplePayload: listBookingByTenantExamplePayload,
});
