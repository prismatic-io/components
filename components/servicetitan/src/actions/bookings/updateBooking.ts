import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingExamplePayload as updateBookingExamplePayload } from "../../examplePayloads";
import { updateBookingInputs } from "../../inputs";
export const updateBooking = action({
  display: {
    label: "Update Booking",
    description: "Update a booking",
  },
  inputs: updateBookingInputs,
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
  examplePayload: updateBookingExamplePayload,
});
