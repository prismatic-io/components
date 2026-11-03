const errorSchema = {
  type: "object" as const,
  properties: {
    code: { type: "string" },
    message: { type: "string" },
    details: { type: "string" },
  },
  required: ["code", "message"],
};

const weightSchema = {
  type: "object" as const,
  properties: {
    Value: { type: "number" },
    Unit: { type: "string", enum: ["oz", "g"] },
  },
  required: ["Value", "Unit"],
};

const dimensionsSchema = {
  type: "object" as const,
  properties: {
    Length: { type: "number" },
    Width: { type: "number" },
    Height: { type: "number" },
    Unit: { type: "string", enum: ["inches", "centimeters"] },
  },
  required: ["Length", "Width", "Height", "Unit"],
};

const addressSchema = {
  type: "object" as const,
  properties: {
    Name: { type: "string" },
    AddressLine1: { type: "string" },
    AddressLine2: { type: "string" },
    AddressLine3: { type: "string" },
    City: { type: "string" },
    DistrictOrCounty: { type: "string" },
    StateOrProvinceCode: { type: "string" },
    PostalCode: { type: "string" },
    CountryCode: { type: "string" },
    Email: { type: "string" },
    Phone: { type: "string" },
  },
  required: ["Name", "AddressLine1", "City", "PostalCode", "CountryCode"],
};

const currencyAmountSchema = {
  type: "object" as const,
  properties: {
    CurrencyCode: { type: "string" },
    Amount: { type: "number" },
  },
  required: ["CurrencyCode", "Amount"],
};

const shippingServiceSchema = {
  type: "object" as const,
  properties: {
    ShippingServiceName: { type: "string" },
    CarrierName: { type: "string" },
    ShippingServiceId: { type: "string" },
    ShippingServiceOfferId: { type: "string" },
    ShipDate: { type: "string", format: "date-time" as const },
    EarliestEstimatedDeliveryDate: {
      type: "string",
      format: "date-time" as const,
    },
    LatestEstimatedDeliveryDate: {
      type: "string",
      format: "date-time" as const,
    },
    Rate: currencyAmountSchema,
    ShippingServiceOptions: {
      type: "object" as const,
      properties: {
        DeliveryExperience: { type: "string" },
        DeclaredValue: currencyAmountSchema,
        CarrierWillPickUp: { type: "boolean" },
        CarrierWillPickUpOption: { type: "string" },
        LabelFormat: { type: "string" },
      },
      required: ["DeliveryExperience", "CarrierWillPickUp"],
    },
  },
  required: [
    "ShippingServiceName",
    "CarrierName",
    "ShippingServiceId",
    "ShippingServiceOfferId",
    "Rate",
    "ShippingServiceOptions",
  ],
};

const labelSchema = {
  type: "object" as const,
  properties: {
    CustomTextForLabel: { type: "string" },
    Dimensions: {
      type: "object" as const,
      properties: {
        Length: { type: "number" },
        Width: { type: "number" },
        Unit: { type: "string" },
      },
      required: ["Length", "Width", "Unit"],
    },
    FileContents: {
      type: "object" as const,
      properties: {
        Contents: { type: "string" },
        FileType: {
          type: "string",
          enum: ["application/pdf", "application/zpl", "image/png"],
        },
        Checksum: { type: "string" },
      },
      required: ["Contents", "FileType", "Checksum"],
    },
    LabelFormat: { type: "string" },
    StandardIdForLabel: { type: "string" },
  },
};

const shipmentSchema = {
  type: "object" as const,
  properties: {
    ShipmentId: { type: "string" },
    AmazonOrderId: { type: "string" },
    SellerOrderId: { type: "string" },
    ItemList: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          OrderItemId: { type: "string" },
          Quantity: { type: "integer" },
          ItemWeight: weightSchema,
          ItemDescription: { type: "string" },
          TransparencyCodeList: {
            type: "array",
            items: { type: "string" },
          },
          ItemLevelSellerInputsList: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                AdditionalInputFieldName: { type: "string" },
                AdditionalSellerInput: {
                  type: "object" as const,
                  properties: {
                    DataType: { type: "string" },
                    ValueAsString: { type: "string" },
                    ValueAsBoolean: { type: "boolean" },
                    ValueAsInteger: { type: "integer" },
                    ValueAsTimestamp: {
                      type: "string",
                      format: "date-time" as const,
                    },
                    ValueAsAddress: addressSchema,
                    ValueAsWeight: weightSchema,
                    ValueAsDimension: dimensionsSchema,
                    ValueAsCurrency: currencyAmountSchema,
                  },
                },
              },
            },
          },
        },
        required: ["OrderItemId", "Quantity"],
      },
    },
    ShipFromAddress: addressSchema,
    ShipToAddress: addressSchema,
    PackageDimensions: dimensionsSchema,
    Weight: weightSchema,
    Insurance: currencyAmountSchema,
    ShippingService: shippingServiceSchema,
    Label: labelSchema,
    Status: {
      type: "string",
      enum: ["Purchased", "RefundPending", "RefundRejected", "RefundApplied"],
    },
    TrackingId: { type: "string" },
    CreatedDate: { type: "string", format: "date-time" as const },
    LastUpdatedDate: { type: "string", format: "date-time" as const },
  },
  required: [
    "ShipmentId",
    "AmazonOrderId",
    "ItemList",
    "ShipFromAddress",
    "ShipToAddress",
    "PackageDimensions",
    "Weight",
    "ShippingService",
    "Label",
    "Status",
    "CreatedDate",
  ],
};

export const getShipmentOutputSchema = {
  type: "object" as const,
  properties: {
    payload: shipmentSchema,
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

export const createShipmentOutputSchema = getShipmentOutputSchema;

export const cancelShipmentOutputSchema = getShipmentOutputSchema;
