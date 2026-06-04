import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBookingByProviderResponse as listBookingByTenantResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Booking } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listBookingByTenant = action({
  display: {
    label: "List Bookings by Tenant",
    description: "Retrieves a list of bookings",
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
      includeTotal,
      page,
      pageSize,
      sort,
      fetchAll,
      customQueryParams,
    },
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
        page,
        pageSize,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listBookingByTenantResponse,
  },
});
