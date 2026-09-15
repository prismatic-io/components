import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBookingByTenantExamplePayload } from "../../examplePayloads";
import { getBookingByTenantInputs } from "../../inputs";
import { getBookingByTenantOutputSchema } from "../../outputSchemas";
export const getBookingByTenant = action({
  display: {
    label: "Get Booking by Tenant",
    description: "Retrieve a booking by ID for the tenant.",
  },
  inputs: getBookingByTenantInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getBookingByTenantOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, bookingId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/bookings/${bookingId}`);
    return {
      data,
    };
  },
  examplePayload: getBookingByTenantExamplePayload,
});
