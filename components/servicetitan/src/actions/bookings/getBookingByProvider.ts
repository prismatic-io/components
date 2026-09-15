import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBookingByProviderExamplePayload } from "../../examplePayloads";
import { getBookingByProviderInputs } from "../../inputs";
import { getBookingByProviderOutputSchema } from "../../outputSchemas";
export const getBookingByProvider = action({
  display: {
    label: "Get Booking by Provider",
    description: "Retrieve a booking by ID for a booking provider.",
  },
  inputs: getBookingByProviderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBookingByProviderOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, bookingId, bookingProvider }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(
      `/booking-provider/${bookingProvider}/bookings/${bookingId}`,
    );
    return {
      data,
    };
  },
  examplePayload: getBookingByProviderExamplePayload,
});
