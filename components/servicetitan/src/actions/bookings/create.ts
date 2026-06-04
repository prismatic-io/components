import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingResponse } from "../../examplePayloads";
import {
  address,
  bookingProvider,
  businessUnitId,
  campaignId,
  connection,
  contacts,
  customerType,
  externalId,
  isFirstTimeClient,
  isSendConfirmationEmail,
  jobTypeId,
  name,
  priority,
  source,
  start,
  summary,
  uploadedImages,
} from "../../inputs";

export const createBookingByProvider = action({
  display: {
    label: "Create Booking by Provider",
    description: "Create a booking",
  },
  inputs: {
    connection,
    bookingProvider,
    summary: {
      ...summary,
      comments: "Summary of the booking",
      required: true,
    },
    isFirstTimeClient,
    externalId,
    source,
    name: {
      ...name,
      comments: "Booking name",
    },
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
  examplePayload: {
    data: createBookingResponse,
  },
});
