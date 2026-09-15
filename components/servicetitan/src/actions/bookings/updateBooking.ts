import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateBookingExamplePayload } from "../../examplePayloads";
import { updateBookingInputs } from "../../inputs";
import { updateBookingOutputSchema } from "../../outputSchemas";
export const updateBooking = action({
  display: {
    label: "Update Booking",
    description: "Update a booking.",
  },
  inputs: updateBookingInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateBookingOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      bookingProvider,
      bookingId,
      summary,
      isFirstTimeClient,
      externalId,
      source,
      name,
      address,
      customerType,
      start,
      campaignId,
      businessUnitId,
      jobTypeId,
      priority,
      uploadedImages,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(
      `/booking-provider/${bookingProvider}/bookings/${bookingId}`,
      {
        summary,
        isFirstTimeClient,
        externalId,
        source,
        name,
        address,
        customerType,
        start,
        campaignId,
        businessUnitId,
        jobTypeId,
        priority,
        uploadedImages,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateBookingExamplePayload,
  examplePayload: updateBookingExamplePayload,
});
