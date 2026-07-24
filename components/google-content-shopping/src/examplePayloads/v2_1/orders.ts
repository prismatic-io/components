import type { content_v2_1 } from "googleapis";
export const getOrderExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#order",
    id: "1234567890",
    merchantId: "123456789",
    merchantOrderId: "ORDER_2025_001",
    status: "delivered",
    customer: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      marketingRightsInfo: {
        marketingEmailAddress: "john.doe@example.com",
        lastUpdatedTimestamp: "2025-01-15T10:30:00.000Z",
        explicitMarketingPreference: "granted",
      },
    },
    deliveryDetails: {
      address: {
        country: "US",
        locality: "San Francisco",
        region: "CA",
        streetAddress: "123 Market St",
        postalCode: "94105",
        recipientName: "John Doe",
      },
      phoneNumber: "+1-415-555-0123",
    },
    netPriceAmount: {
      value: "99.99",
      currency: "USD",
    },
    paymentMethod: {
      type: "CREDIT_CARD",
      lastFourDigits: "1234",
    },
    placedDate: "2025-01-15T10:30:00.000Z",
    billingAddress: {
      country: "US",
      locality: "San Francisco",
      region: "CA",
      streetAddress: "123 Market St",
      postalCode: "94105",
      recipientName: "John Doe",
    },
    shippingOption: "Standard",
    lineItems: [
      {
        id: "line_item_001",
        product: {
          id: "online:en:US:1111111111",
          title: "Google Organic Cotton T-Shirt",
          price: {
            value: "29.99",
            currency: "USD",
          },
          brand: "Google",
          imageLink: "https://example.com/images/google-tshirt-primary.jpg",
        },
        quantityOrdered: 2,
        quantityShipped: 2,
        quantityDelivered: 2,
        shippingDetails: {
          deliverByDate: "2025-01-22",
          shipByDate: "2025-01-18",
          method: {
            methodName: "Standard",
            carrier: "UPS",
          },
        },
      },
    ],
    acknowledged: true,
    promotions: [
      {
        promotionId: "PROMO2025SPRING",
        title: "Spring Sale 2025",
        shortTitle: "Spring Sale",
        priceValue: {
          value: "5.00",
          currency: "USD",
        },
      },
    ],
  },
};
export const listOrdersExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#ordersListResponse",
    resources: [
      getOrderExamplePayload.data,
      {
        kind: "content#order",
        id: "0987654321",
        merchantId: "123456789",
        merchantOrderId: "ORDER_2025_002",
        status: "shipped",
        placedDate: "2025-01-16T14:20:00.000Z",
        netPriceAmount: {
          value: "149.99",
          currency: "USD",
        },
      },
    ],
    nextPageToken: "CgwI6MSB3QYQ",
  },
};
export const cancelOrderExamplePayload: {
  data: content_v2_1.Schema$OrdersCancelResponse;
} = {
  data: {
    kind: "content#ordersCancelResponse",
    executionStatus: "executed",
  },
};
export const getOrderReturnExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#orderReturn",
    returnId: "return_123456789",
    orderId: "1234567890",
    merchantId: "123456789",
    creationDate: "2025-01-20T10:30:00.000Z",
    returnShipment: {
      state: "received",
      shipmentId: "shipment_001",
      shipmentTrackingInfos: [
        {
          carrier: "UPS",
          trackingNumber: "1Z999AA10123456784",
        },
      ],
    },
    returnItems: [
      {
        returnItemId: "return_item_001",
        lineItemId: "line_item_001",
        product: {
          offerId: "1111111111",
          title: "Google Organic Cotton T-Shirt",
        },
        returnQuantity: 1,
        returnReason: "SIZE_TOO_SMALL",
        returnReasonDescription: "Item is too small",
        state: "received",
      },
    ],
  },
};
export const listOrderReturnsExamplePayload: {
  data: unknown;
} = {
  data: {
    kind: "content#orderreturnsListResponse",
    resources: [
      getOrderReturnExamplePayload.data,
      {
        kind: "content#orderReturn",
        returnId: "return_987654321",
        orderId: "0987654321",
        merchantId: "123456789",
        creationDate: "2025-01-21T15:45:00.000Z",
        returnShipment: {
          state: "pending",
        },
      },
    ],
    nextPageToken: "CgwI7MSB3QYQ",
  },
};
export const createOrderReturnExamplePayload: {
  data: unknown;
} = getOrderReturnExamplePayload;
export const processOrderReturnExamplePayload: {
  data: content_v2_1.Schema$OrderreturnsProcessResponse;
} = {
  data: {
    kind: "content#orderreturnsProcessResponse",
    executionStatus: "executed",
  },
};
