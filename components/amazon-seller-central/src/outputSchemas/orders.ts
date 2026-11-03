const errorSchema = {
  type: "object" as const,
  properties: {
    code: { type: "string" },
    message: { type: "string" },
    details: { type: "string" },
  },
  required: ["code", "message"],
};

const moneySchema = {
  type: "object" as const,
  properties: {
    CurrencyCode: { type: "string" },
    Amount: { type: "string" },
  },
};

const addressSchema = {
  type: "object" as const,
  properties: {
    Name: { type: "string" },
    AddressLine1: { type: "string" },
    AddressLine2: { type: "string" },
    AddressLine3: { type: "string" },
    City: { type: "string" },
    County: { type: "string" },
    District: { type: "string" },
    StateOrRegion: { type: "string" },
    Municipality: { type: "string" },
    PostalCode: { type: "string" },
    CountryCode: { type: "string" },
    Phone: { type: "string" },
    AddressType: { type: "string" },
  },
};

const orderSchema = {
  type: "object" as const,
  properties: {
    AmazonOrderId: { type: "string" },
    SellerOrderId: { type: "string" },
    PurchaseDate: { type: "string" },
    LastUpdateDate: { type: "string" },
    OrderStatus: {
      type: "string",
      enum: [
        "Pending",
        "Unshipped",
        "PartiallyShipped",
        "Shipped",
        "Canceled",
        "Unfulfillable",
        "InvoiceUnconfirmed",
        "PendingAvailability",
      ],
    },
    FulfillmentChannel: { type: "string", enum: ["MFN", "AFN"] },
    SalesChannel: { type: "string" },
    OrderChannel: { type: "string" },
    ShipServiceLevel: { type: "string" },
    OrderTotal: moneySchema,
    NumberOfItemsShipped: { type: "integer" },
    NumberOfItemsUnshipped: { type: "integer" },
    PaymentExecutionDetail: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          Payment: moneySchema,
          PaymentMethod: { type: "string" },
        },
      },
    },
    PaymentMethod: { type: "string" },
    PaymentMethodDetails: {
      type: "array",
      items: { type: "string" },
    },
    MarketplaceId: { type: "string" },
    ShipmentServiceLevelCategory: { type: "string" },
    EasyShipShipmentStatus: { type: "string" },
    CbaDisplayableShippingLabel: { type: "string" },
    OrderType: {
      type: "string",
      enum: [
        "StandardOrder",
        "LongLeadTimeOrder",
        "Preorder",
        "BackOrder",
        "SourcingOnDemandOrder",
      ],
    },
    EarliestShipDate: { type: "string" },
    LatestShipDate: { type: "string" },
    EarliestDeliveryDate: { type: "string" },
    LatestDeliveryDate: { type: "string" },
    IsBusinessOrder: { type: "boolean" },
    IsPrime: { type: "boolean" },
    IsPremiumOrder: { type: "boolean" },
    IsGlobalExpressEnabled: { type: "boolean" },
    ReplacedOrderId: { type: "string" },
    IsReplacementOrder: { type: "boolean" },
    PromiseResponseDueDate: { type: "string" },
    IsEstimatedShipDateSet: { type: "boolean" },
    IsSoldByAB: { type: "boolean" },
    IsIBA: { type: "boolean" },
    DefaultShipFromLocationAddress: addressSchema,
    BuyerInvoicePreference: { type: "string" },
    BuyerTaxInformation: {
      type: "object" as const,
      properties: {
        BuyerLegalCompanyName: { type: "string" },
        BuyerBusinessAddress: { type: "string" },
        BuyerTaxRegistrationId: { type: "string" },
        BuyerTaxOffice: { type: "string" },
      },
    },
    FulfillmentInstruction: {
      type: "object" as const,
      properties: {
        FulfillmentSupplySourceId: { type: "string" },
      },
    },
    IsISPU: { type: "boolean" },
    IsAccessPointOrder: { type: "boolean" },
    MarketplaceTaxInfo: {
      type: "object" as const,
      properties: {
        TaxClassifications: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              Name: { type: "string" },
              Value: { type: "string" },
            },
          },
        },
      },
    },
    SellerDisplayName: { type: "string" },
    ShippingAddress: addressSchema,
    BuyerInfo: {
      type: "object" as const,
      properties: {
        BuyerEmail: { type: "string" },
        BuyerName: { type: "string" },
        BuyerCounty: { type: "string" },
        BuyerTaxInfo: {
          type: "object" as const,
          properties: {
            CompanyLegalName: { type: "string" },
            TaxingRegion: { type: "string" },
            TaxClassifications: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  Name: { type: "string" },
                  Value: { type: "string" },
                },
              },
            },
          },
        },
        PurchaseOrderNumber: { type: "string" },
      },
    },
    AutomatedShippingSettings: {
      type: "object" as const,
      properties: {
        HasAutomatedShippingSettings: { type: "boolean" },
        AutomatedCarrier: { type: "string" },
        AutomatedShipMethod: { type: "string" },
      },
    },
    HasRegulatedItems: { type: "boolean" },
    ElectronicInvoiceStatus: { type: "string" },
  },
  required: ["AmazonOrderId", "PurchaseDate", "LastUpdateDate", "OrderStatus"],
};

export const getOrderOutputSchema = {
  type: "object" as const,
  properties: {
    payload: orderSchema,
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

export const listOrdersOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        Orders: {
          type: "array",
          items: orderSchema,
        },
        NextToken: { type: "string" },
        LastUpdatedBefore: { type: "string" },
        CreatedBefore: { type: "string" },
      },
      required: ["Orders"],
    },
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

export const getOrderAddressOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        AmazonOrderId: { type: "string" },
        ShippingAddress: addressSchema,
      },
      required: ["AmazonOrderId"],
    },
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

export const getOrderBuyerInfoOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        AmazonOrderId: { type: "string" },
        BuyerEmail: { type: "string" },
        BuyerName: { type: "string" },
        BuyerCounty: { type: "string" },
        BuyerTaxInfo: {
          type: "object" as const,
          properties: {
            CompanyLegalName: { type: "string" },
            TaxingRegion: { type: "string" },
            TaxClassifications: {
              type: "array",
              items: {
                type: "object" as const,
                properties: {
                  Name: { type: "string" },
                  Value: { type: "string" },
                },
              },
            },
          },
        },
        PurchaseOrderNumber: { type: "string" },
      },
      required: ["AmazonOrderId"],
    },
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

const orderItemSchema = {
  type: "object" as const,
  properties: {
    ASIN: { type: "string" },
    SellerSKU: { type: "string" },
    OrderItemId: { type: "string" },
    Title: { type: "string" },
    QuantityOrdered: { type: "integer" },
    QuantityShipped: { type: "integer" },
    ProductInfo: {
      type: "object" as const,
      properties: {
        NumberOfItems: { type: "string" },
      },
    },
    PointsGranted: {
      type: "object" as const,
      properties: {
        PointsNumber: { type: "integer" },
        PointsMonetaryValue: moneySchema,
      },
    },
    ItemPrice: moneySchema,
    ShippingPrice: moneySchema,
    ItemTax: moneySchema,
    ShippingTax: moneySchema,
    ShippingDiscount: moneySchema,
    ShippingDiscountTax: moneySchema,
    PromotionDiscount: moneySchema,
    PromotionDiscountTax: moneySchema,
    PromotionIds: {
      type: "array",
      items: { type: "string" },
    },
    CODFee: moneySchema,
    CODFeeDiscount: moneySchema,
    IsGift: { type: "boolean" },
    ConditionNote: { type: "string" },
    ConditionId: { type: "string" },
    ConditionSubtypeId: { type: "string" },
    ScheduledDeliveryStartDate: { type: "string" },
    ScheduledDeliveryEndDate: { type: "string" },
    PriceDesignation: { type: "string" },
    TaxCollection: {
      type: "object" as const,
      properties: {
        Model: { type: "string" },
        ResponsibleParty: { type: "string" },
      },
    },
    SerialNumberRequired: { type: "boolean" },
    IsTransparency: { type: "boolean" },
    IossNumber: { type: "string" },
    StoreChainStoreId: { type: "string" },
    DeemedResellerCategory: { type: "string" },
    BuyerInfo: {
      type: "object" as const,
      properties: {
        BuyerCustomizedInfo: {
          type: "object" as const,
          properties: {
            CustomizedURL: { type: "string" },
          },
        },
        GiftWrapPrice: moneySchema,
        GiftWrapTax: moneySchema,
        GiftMessageText: { type: "string" },
        GiftWrapLevel: { type: "string" },
      },
    },
    BuyerRequestedCancel: {
      type: "object" as const,
      properties: {
        IsBuyerRequestedCancel: { type: "boolean" },
        BuyerCancelReason: { type: "string" },
      },
    },
  },
  required: ["ASIN", "OrderItemId", "QuantityOrdered"],
};

export const getOrderItemsOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        AmazonOrderId: { type: "string" },
        OrderItems: {
          type: "array",
          items: orderItemSchema,
        },
        NextToken: { type: "string" },
      },
      required: ["AmazonOrderId", "OrderItems"],
    },
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};

const orderItemBuyerInfoSchema = {
  type: "object" as const,
  properties: {
    OrderItemId: { type: "string" },
    BuyerCustomizedInfo: {
      type: "object" as const,
      properties: {
        CustomizedURL: { type: "string" },
      },
    },
    GiftWrapPrice: moneySchema,
    GiftWrapTax: moneySchema,
    GiftMessageText: { type: "string" },
    GiftWrapLevel: { type: "string" },
  },
  required: ["OrderItemId"],
};

export const getOrderItemsBuyerInfoOutputSchema = {
  type: "object" as const,
  properties: {
    payload: {
      type: "object" as const,
      properties: {
        AmazonOrderId: { type: "string" },
        OrderItems: {
          type: "array",
          items: orderItemBuyerInfoSchema,
        },
        NextToken: { type: "string" },
      },
      required: ["AmazonOrderId", "OrderItems"],
    },
    errors: {
      type: "array",
      items: errorSchema,
    },
  },
};
