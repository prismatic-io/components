import { input } from "@prismatic-io/spectral";
import { cleanNumberInput } from "../util";
import {
  active,
  address,
  connection,
  contacts,
  customerId,
  customFields,
  customQueryParams,
  externalData,
  fetchAll,
  includeTotal,
  locationId,
  name,
  pagination,
  sort,
  tagTypeIds,
} from "./common";
const taxZoneId = input({
  label: "Tax Zone ID",
  type: "string",
  example: "1088",
  required: false,
  comments: "ID of the location tax zone",
  placeholder: "1088",
  clean: cleanNumberInput,
});
export const createLocationInputs = {
  connection,
  name: {
    ...name,
    required: true,
    comments: "The name of the location",
  },
  address: {
    ...address,
    required: true,
    comments: "The address of the location",
  },
  customerId,
  contacts: {
    ...contacts,
    comments: "The contacts associated with the location",
  },
  customFields,
  tagTypeIds,
  externalData,
};
export const getLocationInputs = {
  connection,
  locationId: {
    ...locationId,
    comments: "The ID of the location to retrieve",
  },
};
export const listLocationsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateLocationInputs = {
  connection,
  locationId,
  customerId: {
    ...customerId,
    required: false,
    comments: "The customer ID associated with the location",
  },
  name: {
    ...name,
    required: false,
    comments: "The name of the location",
  },
  address: {
    ...address,
    required: false,
    comments: "The address of the location",
  },
  active: {
    ...active,
    required: false,
    comments: "If false, the location will be marked as inactive",
  },
  taxZoneId,
  customFields,
  tagTypeIds,
  externalData,
};
