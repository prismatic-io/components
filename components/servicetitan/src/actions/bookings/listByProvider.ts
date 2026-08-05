import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listBookingByProviderExamplePayload } from "../../examplePayloads";
import { listByProviderInputs } from "../../inputs";
import type { Booking } from "../../types";
import { fetchAllRecords } from "../../util";
export const listBookingByProvider = action({
  display: {
    label: "List Bookings by Provider",
    description: "Retrieves a list of bookings",
  },
  inputs: listByProviderInputs,
  perform: async (
    context,
    {
      connection,
      bookingProvider,
      includeTotal,
      pagination,
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
          page: pagination.page,
          pageSize: pagination.pageSize,
          sort,
          ...customQueryParams,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: listBookingByProviderExamplePayload,
});
