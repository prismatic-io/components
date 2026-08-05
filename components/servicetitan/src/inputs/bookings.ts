import { input } from "@prismatic-io/spectral";
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
export const bookingProvider = input({
  label: "Booking Provider",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking provider.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});
export const bookingId = input({
  label: "Booking ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectBooking",
});
const externalId = input({
  label: "External ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "External ID of booking",
  placeholder: "10978752986",
  clean: cleanStringInput,
});
const isFirstTimeClient = input({
  label: "Is First Time Client",
  type: "string",
  required: true,
  comments: "True if first time client",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
const source = input({
  label: "Source",
  type: "string",
  example: "Test Source",
  required: true,
  comments: "The source of the booking provider",
  placeholder: "Test Source",
  clean: cleanStringInput,
});
const uploadedImages = input({
  label: "Uploaded Images",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Uploaded images",
  clean: cleanStringValueListInput,
});
const isSendConfirmationEmail = input({
  label: "Send Confirmation Email",
  type: "string",
  required: false,
  comments: "True if first time client",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});
export const createBookingByProviderInputs = {
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
};
export const getByProviderInputs = {
  connection,
  bookingProvider,
  bookingId,
};
export const getByTenantInputs = {
  connection,
  bookingId,
};
export const listByProviderInputs = {
  connection,
  bookingProvider: bookingProvider,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const listByTenantInputs = {
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
