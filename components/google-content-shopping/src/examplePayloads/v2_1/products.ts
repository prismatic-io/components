export const getProductExamplePayload: {
  data: unknown;
} = {
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
export const createProductExamplePayload = getProductExamplePayload;
export const updateProductExamplePayload: {
  data: unknown;
} = {
  data: {
    ...(getProductExamplePayload.data as object),
    title: "Google Organic Cotton T-Shirt - Updated",
    price: {
      value: "34.99",
      currency: "USD",
    },
  },
};
export const deleteProductExamplePayload: {
  data: unknown;
} = {
  data: {},
};
export const listProductsExamplePayload: {
  data: unknown;
} = {
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
export const batchProductExamplePayload: {
  data: unknown;
} = {
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
