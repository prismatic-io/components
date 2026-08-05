import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingExamplePayload } from "../../examplePayloads";
import { createBookingByProviderInputs } from "../../inputs";
export const createBookingByProvider = action({
  display: {
    label: "Create Booking by Provider",
    description: "Create a booking",
  },
  inputs: createBookingByProviderInputs,
  perform: async (
    context,
    {
      connection,
      bookingProvider,
      summary,
      isFirstTimeClient,
      externalId,
      source,
      name,
      address,
      contacts,
      customerType,
      start,
      campaignId,
      businessUnitId,
      jobTypeId,
      priority,
      uploadedImages,
      isSendConfirmationEmail,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(
      `/booking-provider/${bookingProvider}/bookings`,
      {
        summary,
        isFirstTimeClient,
        externalId,
        source,
        name,
        address,
        contacts,
        customerType,
        start,
        campaignId,
        businessUnitId,
        jobTypeId,
        priority,
        uploadedImages,
        isSendConfirmationEmail,
      },
    );
    return {
      data,
    };
  },
  examplePayload: createBookingExamplePayload,
});
