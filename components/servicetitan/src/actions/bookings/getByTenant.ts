import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingExamplePayload as getBookingExamplePayload } from "../../examplePayloads";
import { getByTenantInputs } from "../../inputs";
export const getBookingByTenant = action({
  display: {
    label: "Get Booking by Tenant",
    description: "Retrieve a booking by ID",
  },
  inputs: getByTenantInputs,
  perform: async (context, { connection, bookingId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/bookings/${bookingId}`);
    return {
      data,
    };
  },
  examplePayload: getBookingExamplePayload,
});
