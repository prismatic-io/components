import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { jsonInputClean } from "../util";
import { connectionInput, SellerOrderId, ShipDate } from "./common";

const shipmentId = input({
  label: "Shipment ID",
  type: "string",
  placeholder: "Enter shipment ID",
  comments: "The Amazon-defined shipment identifier for the shipment.",
  example: "6f77095e-9f75-47eb-aaab-a42d5428fa1a",
  clean: util.types.toString,
  required: true,
});

const AmazonOrderId = input({
  label: "Amazon Order ID",
  type: "string",
  required: true,
  placeholder: "Enter Amazon order ID",
  comments: "An Amazon-defined order identifier in 3-7-7 format.",
  example: "123-1234567-1234567",
  clean: util.types.toString,
});

const ShippingServiceId = input({
  label: "Shipping Service ID",
  type: "string",
  placeholder: "Enter shipping service ID",
  comments: "An Amazon-defined shipping service identifier.",
  example: "USPS-PTP-PRI",
  clean: util.types.toString,
  required: true,
});

const ShippingServiceOfferId = input({
  label: "Shipping Service Offer ID",
  type: "string",
  placeholder: "Enter shipping service offer ID",
  comments: "Identifies a shipping service order made by a carrier.",
  example: "OFFER-12345",
  clean: util.types.toString,
  required: false,
});

const HazmatType = input({
  label: "Hazmat Type",
  type: "string",
  placeholder: "Select hazmat type",
  comments:
    "Hazardous materials options for a package. Consult the terms and conditions for each carrier for more information about hazardous materials.",
  model: [
    {
      label: "None",
      value: "None",
    },
    {
      label: "LQHazmat",
      value: "LQHazmat",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  clean: util.types.toString,
});

const IncludePackingSlipWithLabel = input({
  label: "Include Packing Slip With Label",
  type: "boolean",
  comments: "When true, include a packing slip with the label.",
  clean: util.types.toBool,
  required: false,
});

const ItemList = input({
  label: "Item List",
  type: "code",
  language: "json",
  comments: "The list of items to be included in a shipment.",
  example: JSON.stringify(
    [
      {
        orderItemId: "12345678901234",
        quantity: 1,
        ItemWeight: {
          Value: 2.5,
          Unit: "oz",
        },
        ItemDescription: "Product Description",
        TransparencyCodeList: ["AMZN1234567890"],
        ItemLevelSellerInputsList: [
          {
            AdditionalInputFieldName: "CustomField",
            AdditionalSellerInput: {
              DataType: "String",
              ValueAsString: "Custom Value",
            },
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const ShipFromAddress = input({
  label: "Ship From Address",
  type: "code",
  language: "json",
  comments: "The address of the sender.",
  example: JSON.stringify(
    {
      Name: "John Doe",
      AddressLine1: "123 Main Street",
      AddressLine2: "Suite 100",
      AddressLine3: "",
      DistrictOrCounty: "",
      Email: "seller@example.com",
      City: "Seattle",
      StateOrProvinceCode: "WA",
      PostalCode: "98101",
      CountryCode: "US",
      Phone: "206-555-0123",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const PackageDimensions = input({
  label: "Package Dimensions",
  type: "code",
  language: "json",
  comments: "The package dimensions.",
  example: JSON.stringify(
    {
      Length: 12.5,
      Width: 10.0,
      Height: 8.0,
      Unit: "inches",
      PredefinedPackageDimensions: "FedEx_Box_10kg",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const Weight = input({
  label: "Weight",
  type: "string",
  placeholder: "Select weight unit",
  comments: "The package weight unit.",
  model: [
    {
      label: "oz",
      value: "oz",
    },
    {
      label: "g",
      value: "g",
    },
  ],
  required: true,
  clean: util.types.toString,
});

const MustArriveByDate = input({
  label: "Must Arrive By Date",
  type: "string",
  placeholder: "Enter must arrive by date (ISO 8601)",
  comments:
    "The date by which the package must arrive to keep the promise to the customer in ISO 8601 datetime format. If MustArriveByDate is specified, only shipping service offers that can be delivered by that date are returned.",
  example: "2024-03-20T23:59:59.999Z",
  clean: util.types.toString,
  required: false,
});

const ShippingServiceOptions = input({
  label: "Shipping Service Options",
  type: "code",
  language: "json",
  comments: "Extra services offered by the carrier.",
  example: JSON.stringify(
    {
      DeliveryExperience: "DeliveryConfirmationWithAdultSignature",
      DeclaredValue: {
        CurrencyCode: "USD",
        Amount: 100.0,
      },
      CarrierWillPickUp: true,
      CarrierWillPickUpOption: "ShipperWillDropOff",
      LabelFormat: "ZPL203",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const LabelCustomization = input({
  label: "Label Customization",
  type: "code",
  language: "json",
  comments: "Label customization options.",
  example: JSON.stringify(
    {
      CustomTextForLabel: "FRAGILE - HANDLE WITH CARE",
      StandardIdForLabel: "AmazonOrderId",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

const ShipmentLevelSellerInputsList = input({
  label: "Shipment Level Seller Inputs List",
  type: "code",
  language: "json",
  comments: "Additional seller-provided inputs for the shipment.",
  example: JSON.stringify(
    [
      {
        AdditionalInputFieldName: "ShipmentNote",
        AdditionalSellerInput: {
          DataType: "String",
          ValueAsString: "Rush delivery requested",
        },
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

const createShipmentAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Must Arrive By Date, Hazmat Type, Include Packing Slip With Label, and Shipment Level Seller Inputs List.",
  inputs: {
    MustArriveByDate,
    HazmatType,
    IncludePackingSlipWithLabel,
    ShipmentLevelSellerInputsList,
  },
});

export const getShipmentInputs = {
  connectionInput,
  shipmentId,
};

export const cancelShipmentInputs = {
  connectionInput,
  shipmentId: {
    ...shipmentId,
    comments:
      "The Amazon-defined shipment identifier for the shipment to cancel.\t",
  },
};

export const createShipmentInputs = {
  connectionInput,
  AmazonOrderId,
  SellerOrderId: {
    ...SellerOrderId,
    required: false,
    comments: "A seller-defined order identifier.",
  },
  ItemList,
  ShipFromAddress,
  PackageDimensions,
  Weight,
  ShipDate,
  ShippingServiceOptions,
  LabelCustomization,
  ShippingServiceId,
  ShippingServiceOfferId,
  additionalFields: createShipmentAdditionalFields,
};
