import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createBookingResponse as updateBookingResponse } from "../../examplePayloads";
import {
  address,
  bookingId,
  bookingProvider,
  businessUnitId,
  campaignId,
  connection,
  customerType,
  externalId,
  isFirstTimeClient,
  jobTypeId,
  name,
  priority,
  source,
  start,
  summary,
  uploadedImages,
} from "../../inputs";

export const updateBooking = action({
  display: {
    label: "Update Booking",
    description: "Update a booking",
  },
  inputs: {
    connection,
    bookingProvider,
    bookingId,
    summary: {
      ...summary,
      comments: "Summary of the booking",
    },
    isFirstTimeClient: {
      ...isFirstTimeClient,
      required: false,
    },
    externalId: {
      ...externalId,
      required: false,
    },
    source: {
      ...source,
      required: false,
    },
    name: {
      ...name,
      required: false,
    },
    address,
    customerType,
    start,
    campaignId,
    businessUnitId,
    jobTypeId,
    priority,
    uploadedImages,
  },
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
  examplePayload: {
    data: updateBookingResponse,
  },
});
