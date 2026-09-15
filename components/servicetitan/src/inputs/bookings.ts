import { input, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  cleanStringInput,
  cleanStringValueListInput,
  mapBooleanModelInput,
} from "../util";
import {
  address,
  businessUnitId,
  campaignId,
  connection,
  contacts,
  customerType,
  customQueryParams,
  fetchAll,
  includeTotal,
  jobTypeId,
  name,
  pagination,
  priority,
  sort,
  start,
  summary,
} from "./common";
const bookingProvider = input({
  label: "Booking Provider ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking provider that submitted the booking.",
  placeholder: "Enter a booking provider ID",
  clean: util.types.toString,
});
const bookingId = input({
  label: "Booking ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking to act on.",
  placeholder: "Enter a booking ID",
  clean: util.types.toString,
  dataSource: "selectBooking",
});
const externalId = input({
  label: "External ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The booking's identifier in the originating external system.",
  placeholder: "Enter an external ID",
  clean: cleanStringInput,
});
const isFirstTimeClient = input({
  label: "Is First Time Client",
  type: "string",
  required: true,
  comments: "When true, marks the booking's customer as a first-time client.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const source = input({
  label: "Source",
  type: "string",
  example: "Test Source",
  required: true,
  comments: "The lead source that generated this booking.",
  placeholder: "Enter a booking source",
  clean: cleanStringInput,
});
const uploadedImages = input({
  label: "Uploaded Images",
  type: "string",
  collection: "valuelist",
  example: "booking-photo.jpg",
  required: false,
  comments: "The images to attach to the booking, one entry per image.",
  placeholder: "Enter an image to attach",
  clean: cleanStringValueListInput,
});
const isSendConfirmationEmail = input({
  label: "Send Confirmation Email",
  type: "string",
  required: false,
  comments: "When true, sends a booking confirmation email to the customer.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
export const createBookingByProviderInputs = {
  connection,
  bookingProvider,
  summary: {
    ...summary,
    comments: "A short summary describing the booking.",
    required: true,
    clean: util.types.toString,
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
};
export const getBookingByProviderInputs = {
  connection,
  bookingProvider,
  bookingId,
};
export const getBookingByTenantInputs = {
  connection,
  bookingId,
};
export const listBookingByProviderInputs = {
  connection,
  bookingProvider: bookingProvider,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const listBookingByTenantInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateBookingInputs = {
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
};
