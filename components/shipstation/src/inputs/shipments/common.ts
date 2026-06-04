import { input, util } from "@prismatic-io/spectral";
import {
  cleanKeyValueListInput,
  cleanStringInput,
  validateJSON,
} from "../../util";

export const packageCodeInput = input({
  label: "Package Code",
  type: "string",
  required: true,
  comments: "The package type code for the label.",
  placeholder: "Enter package code",
  dataSource: "selectPackages",
  clean: util.types.toString,
});

export const trackingNumber = input({
  label: "Tracking Number",
  type: "string",
  required: false,
  comments: "The carrier-assigned tracking number for the shipment.",
  placeholder: "Enter tracking number",
  clean: cleanStringInput,
});

export const createDateStart = input({
  label: "Create Date Start",
  type: "string",
  required: false,
  comments:
    "The start date to filter shipments by creation date in YYYY-MM-DD format.",
  example: "2014-04-03",
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const createDateEnd = input({
  label: "Create Date End",
  type: "string",
  required: false,
  comments:
    "The end date to filter shipments by creation date in YYYY-MM-DD format.",
  example: "2014-05-04",
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const shipDateStart = input({
  label: "Ship Date Start",
  type: "string",
  required: false,
  comments:
    "The start date to filter shipments by ship date in YYYY-MM-DD format.",
  example: "2014-04-03",
  placeholder: "Enter start date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const shipDateEnd = input({
  label: "Ship Date End",
  type: "string",
  required: false,
  comments:
    "The end date to filter shipments by ship date in YYYY-MM-DD format.",
  example: "2014-04-03",
  placeholder: "Enter end date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const recipientName = input({
  label: "Recipient Name",
  type: "string",
  required: false,
  comments: "The name of the person or business receiving the shipment.",
  placeholder: "Enter recipient name",
  clean: cleanStringInput,
});

export const recipientCountryCode = input({
  label: "Recipient Country Code",
  type: "string",
  required: false,
  comments:
    "The two-letter ISO country code to filter shipments by recipient country.",
  placeholder: "Enter country code",
  clean: cleanStringInput,
});

export const weightInput = input({
  label: "Shipment's Weight",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      value: 3,
      units: "ounces",
      WeightUnits: 2,
    },
    null,
    2,
  ),
  comments:
    "The weight of the shipment, following the Weight model. Note: WeightUnits is read-only.",
  clean: validateJSON,
});

export const shipFrom = input({
  label: "Origin Address",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      name: "John Smith",
      company: "JS Company",
      street1: "456 Elm St",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "US",
      phone: "987-654-3210",
      residential: false,
    },
    null,
    2,
  ),
  comments: "Provide the origin address in JSON format.",
  clean: validateJSON,
});

export const shipmentAdditionalFieldsInput = input({
  label: "Additional Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "A list of additional fields to include in the shipment.",
  example: "testLabel: false",
  clean: cleanKeyValueListInput,
});
