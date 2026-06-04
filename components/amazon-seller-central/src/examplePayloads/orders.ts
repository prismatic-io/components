export const getOrderExamplePayload = {
  data: {
    AmazonOrderId: "902-3159896-1390916",
    PurchaseDate: "2024-01-15T10:30:45.123Z",
    LastUpdateDate: "2024-01-15T14:22:10.456Z",
    OrderStatus: "Shipped",
    FulfillmentChannel: "MFN",
    SalesChannel: "Amazon.com",
    OrderChannel: "AFN",
    ShipServiceLevel: "Std US D2D Dom",
    OrderTotal: {
      CurrencyCode: "USD",
      Amount: "99.99",
    },
    NumberOfItemsShipped: 1,
    NumberOfItemsUnshipped: 0,
    PaymentMethod: "Other",
    PaymentMethodDetails: ["Standard"],
    MarketplaceId: "ATVPDKIKX0DER",
    ShipmentServiceLevelCategory: "Standard",
    OrderType: "StandardOrder",
    EarliestShipDate: "2024-01-15T08:00:00Z",
    LatestShipDate: "2024-01-16T07:59:59Z",
    EarliestDeliveryDate: "2024-01-18T08:00:00Z",
    LatestDeliveryDate: "2024-01-20T07:59:59Z",
    IsBusinessOrder: false,
    IsPrime: false,
    IsGlobalExpressEnabled: false,
    IsPremiumOrder: false,
    IsSoldByAB: false,
    IsIBA: false,
    DefaultShipFromLocationAddress: {
      City: "Seattle",
      StateOrRegion: "WA",
      PostalCode: "98101",
      CountryCode: "US",
      Name: "ACME Warehouse",
      AddressLine1: "123 Main St",
    },
    FulfillmentInstruction: {
      FulfillmentSupplySourceId: "sampleSupplySourceId",
    },
    IsISPU: false,
    IsAccessPointOrder: false,
    AutomatedShippingSettings: {
      HasAutomatedShippingSettings: false,
    },
    EasyShipShipmentStatus: null,
    ElectronicInvoiceStatus: null,
  },
};

export const listOrdersExamplePayload = {
  data: {
    Orders: [
      {
        AmazonOrderId: "902-3159896-1390916",
        PurchaseDate: "2024-01-15T10:30:45.123Z",
        LastUpdateDate: "2024-01-15T14:22:10.456Z",
        OrderStatus: "Shipped",
        FulfillmentChannel: "MFN",
        SalesChannel: "Amazon.com",
        OrderChannel: "AFN",
        ShipServiceLevel: "Std US D2D Dom",
        OrderTotal: {
          CurrencyCode: "USD",
          Amount: "99.99",
        },
        NumberOfItemsShipped: 1,
        NumberOfItemsUnshipped: 0,
        PaymentMethod: "Other",
        PaymentMethodDetails: ["Standard"],
        MarketplaceId: "ATVPDKIKX0DER",
        ShipmentServiceLevelCategory: "Standard",
        OrderType: "StandardOrder",
        EarliestShipDate: "2024-01-15T08:00:00Z",
        LatestShipDate: "2024-01-16T07:59:59Z",
        IsBusinessOrder: false,
        IsPrime: false,
        IsPremiumOrder: false,
      },
      {
        AmazonOrderId: "112-7628145-8392418",
        PurchaseDate: "2024-01-14T15:22:30.789Z",
        LastUpdateDate: "2024-01-14T16:45:55.123Z",
        OrderStatus: "Pending",
        FulfillmentChannel: "AFN",
        SalesChannel: "Amazon.com",
        OrderChannel: "AFN",
        ShipServiceLevel: "Expedited",
        OrderTotal: {
          CurrencyCode: "USD",
          Amount: "149.99",
        },
        NumberOfItemsShipped: 0,
        NumberOfItemsUnshipped: 2,
        PaymentMethod: "Other",
        PaymentMethodDetails: ["Standard"],
        MarketplaceId: "ATVPDKIKX0DER",
        ShipmentServiceLevelCategory: "Expedited",
        OrderType: "StandardOrder",
        EarliestShipDate: "2024-01-14T08:00:00Z",
        LatestShipDate: "2024-01-15T07:59:59Z",
        IsBusinessOrder: false,
        IsPrime: true,
        IsPremiumOrder: false,
      },
    ],
    NextToken: "2YgYW55IGNhcm5hbCBwbGVhc3VyZS4",
    CreatedBefore: "2024-01-15T23:59:59Z",
  },
};

export const getOrderAddressExamplePayload = {
  data: {
    AmazonOrderId: "902-3159896-1390916",
    ShippingAddress: {
      Name: "John Doe",
      AddressLine1: "123 Main Street",
      AddressLine2: "Apt 4B",
      AddressLine3: null,
      City: "Seattle",
      County: null,
      District: null,
      StateOrRegion: "WA",
      Municipality: null,
      PostalCode: "98101",
      CountryCode: "US",
      Phone: "555-123-4567",
      AddressType: "Residential",
    },
  },
};

export const getOrderBuyerInfoExamplePayload = {
  data: {
    AmazonOrderId: "902-3159896-1390916",
    BuyerEmail: "buyer-email@marketplace.amazon.com",
    BuyerName: "John Doe",
    BuyerCounty: null,
    BuyerTaxInfo: {
      CompanyLegalName: null,
      TaxingRegion: null,
      TaxClassifications: [],
    },
    PurchaseOrderNumber: null,
  },
};

export const getOrderItemsExamplePayload = {
  data: {
    AmazonOrderId: "902-3159896-1390916",
    OrderItems: [
      {
        ASIN: "B00X4WHP5E",
        SellerSKU: "MY-SKU-12345",
        OrderItemId: "52852651034158",
        Title: "ACME Product Title",
        QuantityOrdered: 1,
        QuantityShipped: 1,
        ProductInfo: {
          NumberOfItems: 1,
        },
        PointsGranted: null,
        ItemPrice: {
          CurrencyCode: "USD",
          Amount: "89.99",
        },
        ShippingPrice: {
          CurrencyCode: "USD",
          Amount: "5.00",
        },
        ItemTax: {
          CurrencyCode: "USD",
          Amount: "7.65",
        },
        ShippingTax: {
          CurrencyCode: "USD",
          Amount: "0.45",
        },
        ShippingDiscount: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        ShippingDiscountTax: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        PromotionDiscount: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        PromotionDiscountTax: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        PromotionIds: [],
        CODFee: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        CODFeeDiscount: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        IsGift: false,
        ConditionNote: null,
        ConditionId: "New",
        ConditionSubtypeId: "New",
        ScheduledDeliveryStartDate: null,
        ScheduledDeliveryEndDate: null,
        PriceDesignation: null,
        TaxCollection: {
          Model: "MarketplaceFacilitator",
          ResponsibleParty: "Amazon Services, Inc.",
        },
        SerialNumberRequired: false,
        IsTransparency: false,
        IossNumber: null,
        StoreChainStoreId: null,
        DeemedResellerCategory: "IOSS",
        BuyerInfo: null,
      },
    ],
    NextToken: null,
  },
};

export const getOrderItemsBuyerInfoExamplePayload = {
  data: {
    AmazonOrderId: "902-3159896-1390916",
    OrderItems: [
      {
        OrderItemId: "52852651034158",
        BuyerCustomizedInfo: {
          CustomizedURL: null,
        },
        GiftWrapPrice: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        GiftWrapTax: {
          CurrencyCode: "USD",
          Amount: "0.00",
        },
        GiftMessageText: null,
        GiftWrapLevel: null,
      },
    ],
    NextToken: null,
  },
};

export const confirmOrderShipmentExamplePayload = {
  data: {},
};
