import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { cleanId, cleanString } from "../util/transforms";
import {
  additionalFields,
  connection,
  effectiveDate,
  fetchAll,
  includeMetadataLinks,
  pagination,
} from "./common";
const locationId = input({
  label: "Location ID",
  type: "string",
  required: true,
  dataSource: "selectLocation",
  comments:
    "The unique numeric identifier for the Oracle HCM location (LocationId).",
  placeholder: "Enter location ID",
  example: "300100012345678",
  clean: cleanId,
});
const LocationCode = input({
  label: "Location Code",
  type: "string",
  required: false,
  comments: "Unique code identifying the location within its set.",
  placeholder: "Enter location code",
  example: "US-NYC",
  clean: cleanString,
});
const LocationName = input({
  label: "Location Name",
  type: "string",
  required: false,
  comments: "The display name of the location shown to users.",
  placeholder: "Enter location name",
  example: "New York Office",
  clean: cleanString,
});
const EffectiveStartDate = input({
  label: "Effective Start Date",
  type: "string",
  required: false,
  comments: "The date the location becomes effective, in YYYY-MM-DD format.",
  placeholder: "Enter effective start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
const EffectiveEndDate = input({
  label: "Effective End Date",
  type: "string",
  required: false,
  comments:
    "The date the location stops being effective, in YYYY-MM-DD format.",
  placeholder: "Enter effective end date (YYYY-MM-DD)",
  example: "4712-12-31",
  clean: cleanString,
});
const SetCode = input({
  label: "Set Code",
  type: "string",
  required: false,
  comments: "The code of the set the location belongs to.",
  placeholder: "Enter set code",
  example: "COMMON",
  clean: cleanString,
});
const SetId = input({
  label: "Set ID",
  type: "string",
  required: false,
  comments: "The identifier of the set the location belongs to.",
  placeholder: "Enter set ID",
  example: "300000001",
  clean: cleanString,
});
const Description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A description of the location.",
  placeholder: "Enter description",
  example: "Corporate headquarters",
  clean: cleanString,
});
const EmailAddress = input({
  label: "Email Address",
  type: "string",
  required: false,
  comments: "The email address for the location.",
  placeholder: "Enter email address",
  example: "nyc-office@example.com",
  clean: cleanString,
});
const Country = input({
  label: "Country",
  type: "string",
  required: false,
  comments:
    "The country code of the address. Required by Oracle when adding an address.",
  placeholder: "Enter country code",
  example: "US",
  clean: cleanString,
});
const AddressUsageType = input({
  label: "Address Usage Type",
  type: "string",
  required: false,
  comments:
    "The usage type of the address (e.g. MAIN). Required by Oracle when adding an address.",
  placeholder: "Enter address usage type",
  example: "MAIN",
  clean: cleanString,
});
const AddressLine1 = input({
  label: "Street Address",
  type: "string",
  required: false,
  comments: "The first line of the address.",
  placeholder: "Enter street address",
  example: "123 Main St",
  clean: cleanString,
});
const TownOrCity = input({
  label: "City",
  type: "string",
  required: false,
  comments: "The city of the address.",
  placeholder: "Enter city",
  example: "New York",
  clean: cleanString,
});
const Region1 = input({
  label: "State/Province",
  type: "string",
  required: false,
  comments: "The state or region of the address.",
  placeholder: "Enter state or region",
  example: "NY",
  clean: cleanString,
});
const PostalCode = input({
  label: "Zip/Postal Code",
  type: "string",
  required: false,
  comments: "The postal code of the address.",
  placeholder: "Enter zip or postal code",
  example: "10001",
  clean: cleanString,
});
const AddressEffectiveStartDate = input({
  label: "Address Effective Start Date",
  type: "string",
  required: false,
  comments: "The date the address becomes effective, in YYYY-MM-DD format.",
  placeholder: "Enter address effective start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
const AddressEffectiveEndDate = input({
  label: "Address Effective End Date",
  type: "string",
  required: false,
  comments: "The date the address stops being effective, in YYYY-MM-DD format.",
  placeholder: "Enter address effective end date (YYYY-MM-DD)",
  example: "4712-12-31",
  clean: cleanString,
});
const LocAddressUsageId = input({
  label: "Location Address Usage ID",
  type: "string",
  required: false,
  comments:
    "The identifier of the location address usage. Required by Oracle when adding an address.",
  placeholder: "Enter location address usage ID",
  example: "300100000000001",
  clean: cleanString,
});
const primaryAddress = structuredObjectInput({
  label: "Primary Address",
  required: false,
  comments:
    "Street, city, state, postal code, country, address usage type, effective start and end dates, and location address usage ID.",
  inputs: {
    AddressLine1,
    TownOrCity,
    Region1,
    PostalCode,
    Country,
    AddressUsageType,
    EffectiveStartDate: AddressEffectiveStartDate,
    EffectiveEndDate: AddressEffectiveEndDate,
    LocAddressUsageId,
  },
});
export const createLocationInputs = {
  connection,
  LocationCode: { ...LocationCode, required: true },
  LocationName: { ...LocationName, required: true },
  EffectiveStartDate: { ...EffectiveStartDate, required: true },
  EffectiveEndDate: { ...EffectiveEndDate, required: true },
  SetCode: { ...SetCode, required: true },
  SetId: { ...SetId, required: true },
  Description,
  EmailAddress,
  primaryAddress,
  additionalFields,
};
export const getLocationInputs = {
  connection,
  effectiveDate,
  locationId,
  includeMetadataLinks,
};
export const listLocationsInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  includeMetadataLinks,
};
export const updateLocationInputs = {
  connection,
  locationId,
  LocationCode,
  LocationName,
  EffectiveStartDate,
  EffectiveEndDate,
  SetCode,
  SetId,
  Description,
  EmailAddress,
  primaryAddress,
  additionalFields,
};
export const deleteLocationInputs = {
  connection,
  locationId,
};
