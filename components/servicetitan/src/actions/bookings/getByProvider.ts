import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingResponse as getBookingResponse } from "../../examplePayloads";
import { bookingId, bookingProvider, connection } from "../../inputs";

export const getBookingByProvider = action({
  display: {
    label: "Get Booking by Provider",
    description: "Retrieve a booking by ID",
  },
  inputs: {
    connection,
    bookingProvider,
    bookingId,
  },
  perform: async (context, { connection, bookingId, bookingProvider }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(
      `/booking-provider/${bookingProvider}/bookings/${bookingId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getBookingResponse,
  },
});
