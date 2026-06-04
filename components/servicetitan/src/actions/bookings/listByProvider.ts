import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBookingByProviderResponse } from "../../examplePayloads";
import {
  bookingProvider,
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

export const listBookingByProvider = action({
  display: {
    label: "List Bookings by Provider",
    description: "Retrieves a list of bookings",
  },
  inputs: {
    connection,
    bookingProvider: bookingProvider,
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
      bookingProvider,
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
      const data = await fetchAllRecords<Booking>(
        client,
        `/booking-provider/${bookingProvider}/bookings`,
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
    const { data } = await client.get(
      `/booking-provider/${bookingProvider}/bookings`,
      {
        params: {
          includeTotal,
          page,
          pageSize,
          sort,
          ...customQueryParams,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listBookingByProviderResponse,
  },
});
