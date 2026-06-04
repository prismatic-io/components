



/* eslint-disable @typescript-eslint/no-explicit-any */




export const getProductExamplePayload: any = {
  data: {
    kind: "content#product",
    id: "online:en:US:1111111111",
    offerId: "1111111111",
    title: "Google Organic Cotton T-Shirt",
    description:
      "Comfortable organic cotton t-shirt with Google logo. Available in multiple sizes and colors.",
    link: "https://example.com/products/google-tshirt",
    imageLink: "https://example.com/images/google-tshirt-primary.jpg",
    additionalImageLinks: [
      "https://example.com/images/google-tshirt-back.jpg",
      "https://example.com/images/google-tshirt-detail.jpg",
    ],
    contentLanguage: "en",
    targetCountry: "US",
    feedLabel: "US",
    channel: "online",
    expirationDate: "2025-12-31",
    adult: false,
    brand: "Google",
    color: "Navy Blue",
    googleProductCategory: "Apparel & Accessories > Clothing > Shirts & Tops",
    gtin: "00012345678905",
    itemGroupId: "google_tshirt_group",
    material: "100% Organic Cotton",
    mpn: "GOOG-TS-001",
    pattern: "Solid",
    price: {
      value: "29.99",
      currency: "USD",
    },
    salePrice: {
      value: "24.99",
      currency: "USD",
    },
    salePriceEffectiveDate: "2025-01-15T00:00:00Z/2025-02-15T23:59:59Z",
    availability: "in stock",
    availabilityDate: "2025-01-15",
    condition: "new",
    gender: "unisex",
    ageGroup: "adult",
    sizes: ["S", "M", "L", "XL"],
    sizeSystem: "US",
    sizeType: "regular",
    shipping: [
      {
        country: "US",
        service: "Standard",
        price: {
          value: "5.99",
          currency: "USD",
        },
      },
    ],
    shippingWeight: {
      value: "0.5",
      unit: "lb",
    },
    shippingLength: {
      value: "12",
      unit: "in",
    },
    shippingWidth: {
      value: "10",
      unit: "in",
    },
    shippingHeight: {
      value: "2",
      unit: "in",
    },
    shippingLabel: "standard",
    taxes: [
      {
        country: "US",
        region: "CA",
        rate: 7.25,
        taxShip: true,
      },
    ],
    identifierExists: true,
    customLabel0: "bestseller",
    customLabel1: "organic",
    customLabel2: "spring_2025",
    customLabel3: null,
    customLabel4: null,
    productTypes: [
      "Apparel & Accessories",
      "Apparel & Accessories > Clothing",
      "Apparel & Accessories > Clothing > Shirts & Tops",
    ],
    source: "api",
    mobileLink: "https://m.example.com/products/google-tshirt",
    unitPricingMeasure: {
      value: 1,
      unit: "ct",
    },
    unitPricingBaseMeasure: {
      value: 1,
      unit: "ct",
    },
    multipack: 1,
    isBundle: false,
    promotionIds: ["PROMO2025SPRING"],
    sellOnGoogleQuantity: 100,
    maxHandlingTime: 3,
    minHandlingTime: 1,
    displayAdsId: "google_tshirt_ads",
    displayAdsLink: "https://example.com/ads/google-tshirt",
    displayAdsTitle: "Premium Organic Cotton T-Shirt",
    displayAdsValue: 29.99,
    displayAdsSimilarIds: ["similar_tshirt_001", "similar_tshirt_002"],
    costOfGoodsSold: {
      value: "15.00",
      currency: "USD",
    },
    includedDestinations: ["Shopping"],
    excludedDestinations: [],
    adsGrouping: "tshirts",
    adsLabels: ["apparel", "cotton", "organic"],
    adsRedirect: "https://example.com/ads-redirect/google-tshirt",
    pause: "ads",
    canonicalLink: "https://example.com/products/google-tshirt",
    productDetails: [
      {
        sectionName: "Material",
        attributeName: "Fabric",
        attributeValue: "100% Organic Cotton",
      },
    ],
    productHighlights: [
      "Made from 100% organic cotton",
      "Comfortable and breathable",
      "Machine washable",
    ],
  },
};

export const createProductExamplePayload: any = getProductExamplePayload;

export const updateProductExamplePayload: any = {
  data: {
    ...getProductExamplePayload.data,
    title: "Google Organic Cotton T-Shirt - Updated",
    price: {
      value: "34.99",
      currency: "USD",
    },
  },
};

export const deleteProductExamplePayload: any = {
  data: {},
};

export const listProductsExamplePayload: any = {
  data: {
    kind: "content#productsListResponse",
    resources: [
      getProductExamplePayload.data,
      {
        kind: "content#product",
        id: "online:en:US:2222222222",
        offerId: "2222222222",
        title: "Google Hoodie Sweatshirt",
        description: "Cozy hoodie sweatshirt with Google branding",
        link: "https://example.com/products/google-hoodie",
        imageLink: "https://example.com/images/google-hoodie-primary.jpg",
        contentLanguage: "en",
        targetCountry: "US",
        feedLabel: "US",
        channel: "online",
        brand: "Google",
        color: "Charcoal Gray",
        googleProductCategory:
          "Apparel & Accessories > Clothing > Outerwear > Hoodies",
        gtin: "00012345678912",
        price: {
          value: "59.99",
          currency: "USD",
        },
        availability: "in stock",
        condition: "new",
        source: "api",
      },
    ],
    nextPageToken: "CgwI4MSB3QYQ",
  },
};

export const batchProductExamplePayload: any = {
  data: {
    kind: "content#productsCustomBatchResponse",
    entries: [
      {
        batchId: 1,
        product: getProductExamplePayload.data,
      },
      {
        batchId: 2,
        product: {
          kind: "content#product",
          id: "online:en:US:3333333333",
          offerId: "3333333333",
          title: "Google Cap",
          contentLanguage: "en",
          targetCountry: "US",
          channel: "online",
        },
      },
    ],
  },
};



export const updateLocalInventoryExamplePayload: any = {
  data: {
    storeCode: "STORE_001",
    price: {
      value: "29.99",
      currency: "USD",
    },
    salePrice: {
      value: "24.99",
      currency: "USD",
    },
    salePriceEffectiveDate: "2025-01-15T00:00:00Z/2025-02-15T23:59:59Z",
    availability: "in stock",
    quantity: 50,
    pickupMethod: "buy",
    pickupSla: "same day",
    instoreProductLocation: "Aisle 5, Shelf 3",
  },
};

export const batchLocalInventoryExamplePayload: any = {
  data: {
    entries: [
      {
        batchId: 1,
        localinventory: {
          storeCode: "STORE_001",
          price: {
            value: "29.99",
            currency: "USD",
          },
          availability: "in stock",
          quantity: 50,
        },
      },
      {
        batchId: 2,
        localinventory: {
          storeCode: "STORE_002",
          availability: "out of stock",
        },
      },
    ],
  },
};



export const updateRegionalInventoryExamplePayload: any = {
  data: {
    regionId: "123456",
    price: {
      value: "29.99",
      currency: "USD",
    },
    salePrice: {
      value: "24.99",
      currency: "USD",
    },
    salePriceEffectiveDate: "2025-01-15T00:00:00Z/2025-02-15T23:59:59Z",
    availability: "in stock",
  },
};

export const batchRegionalInventoryExamplePayload: any = {
  data: {
    entries: [
      {
        batchId: 1,
        regionalInventory: {
          regionId: "123456",
          price: {
            value: "29.99",
            currency: "USD",
          },
          availability: "in stock",
        },
      },
      {
        batchId: 2,
        regionalInventory: {
          regionId: "654321",
          availability: "out of stock",
        },
      },
    ],
  },
};



export const getAccountExamplePayload: any = {
  data: {
    kind: "content#account",
    id: "123456789",
    name: "Example Merchant Store",
    websiteUrl: "https://example.com",
    adultContent: false,
    businessInformation: {
      address: {
        country: "US",
        locality: "Mountain View",
        region: "CA",
        streetAddress: "1600 Amphitheatre Parkway",
        postalCode: "94043",
      },
      phoneNumber: "+1-650-253-0000",
      customerService: {
        email: "support@example.com",
        phoneNumber: "+1-650-253-0001",
        url: "https://example.com/support",
      },
    },
    users: [
      {
        emailAddress: "admin@example.com",
        admin: true,
      },
      {
        emailAddress: "manager@example.com",
        admin: false,
      },
    ],
    youtubeChannelLinks: [
      {
        channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
        status: "active",
      },
    ],
    googleMyBusinessLink: {
      gmbAccountId: "1234567890",
      gmbEmail: "business@example.com",
      status: "active",
    },
    automaticImprovements: {
      imageImprovements: {
        effectiveAllowAutomaticImprovements: true,
      },
      itemUpdates: {
        effectiveAllowAutomaticItemUpdates: true,
      },
      shippingImprovements: {
        effectiveAllowShippingImprovements: true,
      },
    },
    adsLinks: [
      {
        adsId: "1234567890",
        status: "active",
      },
    ],
    cssId: "9876543210",
    labelIds: ["123", "456", "789"],
    accountManagement: "manual",
    automaticLabelIds: ["auto_123", "auto_456"],
    sellerId: "SELLER_001",
  },
};

export const createAccountExamplePayload: any = getAccountExamplePayload;

export const updateAccountExamplePayload: any = {
  data: {
    ...getAccountExamplePayload.data,
    name: "Example Merchant Store - Updated",
    websiteUrl: "https://shop.example.com",
  },
};

export const deleteAccountExamplePayload: any = {
  data: {},
};

export const listAccountsExamplePayload: any = {
  data: {
    kind: "content#accountsListResponse",
    resources: [
      getAccountExamplePayload.data,
      {
        kind: "content#account",
        id: "987654321",
        name: "Sub-Account Store",
        websiteUrl: "https://sub.example.com",
        adultContent: false,
      },
    ],
    nextPageToken: "CgwI5MSB3QYQ",
  },
};




export const getOrderExamplePayload: any = {
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

export const listOrdersExamplePayload: any = {
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

export const cancelOrderExamplePayload: any = {
  data: {
    kind: "content#ordersCancelResponse",
    executionStatus: "executed",
  },
};




export const getOrderReturnExamplePayload: any = {
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

export const listOrderReturnsExamplePayload: any = {
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

export const createOrderReturnExamplePayload: any =
  getOrderReturnExamplePayload;

export const processOrderReturnExamplePayload: any = {
  data: {
    kind: "content#orderreturnsProcessResponse",
    executionStatus: "executed",
  },
};



export const getPubSubNotificationExamplePayload: any = {
  data: {
    kind: "content#pubsubnotificationsettings",
    cloudTopicName: "projects/example-project/topics/merchant-notifications",
    registeredEvents: [
      "PRODUCT_STATUS_CHANGE",
      "ORDER_PENDING_SHIPMENT",
      "ORDER_SHIPPED",
    ],
  },
};

export const updatePubSubNotificationExamplePayload: any = {
  data: {
    kind: "content#pubsubnotificationsettings",
    cloudTopicName:
      "projects/example-project/topics/merchant-notifications-updated",
    registeredEvents: [
      "PRODUCT_STATUS_CHANGE",
      "ORDER_PENDING_SHIPMENT",
      "ORDER_SHIPPED",
      "ORDER_DELIVERED",
    ],
  },
};



export const rawRequestExamplePayload: any = {
  data: {
    kind: "content#productsListResponse",
    resources: [
      {
        kind: "content#product",
        id: "online:en:US:1111111111",
        offerId: "1111111111",
        title: "Example Product",
        contentLanguage: "en",
        targetCountry: "US",
      },
    ],
  },
};
