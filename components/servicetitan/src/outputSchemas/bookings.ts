import { listEnvelope } from "./shared";
const bookingSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    source: {
      type: "string",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    name: {
      type: "string",
    },
    address: {
      type: ["object", "null"],
      properties: {
        street: {
          type: "string",
        },
        unit: {
          type: ["string", "null"],
        },
        city: {
          type: "string",
        },
        state: {
          type: "string",
        },
        zip: {
          type: "string",
        },
        country: {
          type: "string",
        },
      },
      required: ["street", "city", "state", "zip", "country"],
    },
    customerType: {
      type: ["string", "null"],
      enum: ["Residential", "Commercial"],
    },
    start: {
      type: "string",
      format: "date-time",
    },
    campaignId: {
      type: ["integer", "null"],
      format: "int64",
    },
    businessUnitId: {
      type: ["integer", "null"],
      format: "int64",
    },
    isFirstTimeClient: {
      type: ["boolean", "null"],
    },
    uploadedImages: {
      type: ["array", "null"],
      items: {
        type: "string",
      },
    },
    isSendConfirmationEmail: {
      type: ["boolean", "null"],
    },
    status: {
      type: "string",
      enum: ["New", "Converted", "Dismissed", "Accepted"],
    },
    dismissingReasonId: {
      type: ["integer", "null"],
      format: "int64",
    },
    jobId: {
      type: ["integer", "null"],
      format: "int64",
    },
    externalId: {
      type: "string",
    },
    priority: {
      type: ["string", "null"],
      enum: ["Low", "Normal", "High", "Urgent"],
    },
    jobTypeId: {
      type: ["integer", "null"],
      format: "int64",
    },
    bookingProviderId: {
      type: "integer",
      format: "int64",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    summary: {
      type: ["string", "null"],
    },
  },
  required: [
    "id",
    "source",
    "createdOn",
    "name",
    "start",
    "status",
    "externalId",
    "bookingProviderId",
    "modifiedOn",
  ],
};
export const createBookingByProviderOutputSchema = bookingSchema;
export const getBookingByProviderOutputSchema = bookingSchema;
export const getBookingByTenantOutputSchema = bookingSchema;
export const listBookingByProviderOutputSchema = listEnvelope(bookingSchema);
export const listBookingByTenantOutputSchema = listEnvelope(bookingSchema);
export const updateBookingOutputSchema = bookingSchema;
