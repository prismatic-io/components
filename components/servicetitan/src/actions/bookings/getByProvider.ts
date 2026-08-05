import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingExamplePayload as getBookingExamplePayload } from "../../examplePayloads";
import { getByProviderInputs } from "../../inputs";
export const getBookingByProvider = action({
  display: {
    label: "Get Booking by Provider",
    description: "Retrieve a booking by ID",
  },
  inputs: getByProviderInputs,
  perform: async (context, { connection, bookingId, bookingProvider }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(
      `/booking-provider/${bookingProvider}/bookings/${bookingId}`,
    );
    return {
      data,
    };
  },
  examplePayload: getBookingExamplePayload,
});
