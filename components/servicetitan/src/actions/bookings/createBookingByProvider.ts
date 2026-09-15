import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingByProviderExamplePayload } from "../../examplePayloads";
import { createBookingByProviderInputs } from "../../inputs";
import { createBookingByProviderOutputSchema } from "../../outputSchemas";
export const createBookingByProvider = action({
  display: {
    label: "Create Booking by Provider",
    description: "Create a booking for a booking provider.",
  },
  inputs: createBookingByProviderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBookingByProviderOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createBookingByProviderExamplePayload,
  examplePayload: createBookingByProviderExamplePayload,
});
