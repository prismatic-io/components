export const getProductExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    name: "accounts/123456789/products/en~US~1111111111",
    offerId: "1111111111",
    contentLanguage: "en",
    feedLabel: "US",
    dataSource: "accounts/123456789/dataSources/987654321",
    productAttributes: {
      title: "Organic Cotton T-Shirt - Blue",
      description: "Comfortable organic cotton t-shirt with crew neck.",
      link: "https://www.example.com/products/tshirt-blue",
      imageLink: "https://www.example.com/images/tshirt-blue.jpg",
      availability: "in_stock",
      condition: "new",
      brand: "ExampleBrand",
      gtin: ["00012345678905"],
      price: {
        amountMicros: "29990000",
        currencyCode: "USD",
      },
      salePrice: {
        amountMicros: "24990000",
        currencyCode: "USD",
      },
    },
    productStatus: {
      destinationStatuses: [
        {
          reportingContext: "SHOPPING_ADS",
          approvedCountries: ["US"],
        },
      ],
      itemLevelIssues: [],
    },
    versionNumber: "1",
  },
};
const productInputExample = {
  name: "accounts/123456789/productInputs/en~US~1111111111",
  product: "accounts/123456789/products/en~US~1111111111",
  offerId: "1111111111",
  contentLanguage: "en",
  feedLabel: "US",
  attributes: {
    title: "Organic Cotton T-Shirt - Blue",
    description: "Comfortable organic cotton t-shirt with crew neck.",
    link: "https://www.example.com/products/tshirt-blue",
    imageLink: "https://www.example.com/images/tshirt-blue.jpg",
    availability: "in_stock",
    condition: "new",
    price: {
      amountMicros: "29990000",
      currencyCode: "USD",
    },
  },
  versionNumber: "1",
};
export const createProductExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: productInputExample,
};
export const updateProductExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    ...productInputExample,
    attributes: {
      ...productInputExample.attributes,
      title: "Organic Cotton T-Shirt - Blue (Updated)",
      price: {
        amountMicros: "34990000",
        currencyCode: "USD",
      },
    },
  },
};
export const deleteProductExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {},
};
export const listProductsExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    products: [
      getProductExamplePayload.data,
      {
        name: "accounts/123456789/products/en~US~2222222222",
        offerId: "2222222222",
        contentLanguage: "en",
        feedLabel: "US",
        dataSource: "accounts/123456789/dataSources/987654321",
        productAttributes: {
          title: "Hoodie Sweatshirt - Charcoal",
          availability: "in_stock",
          condition: "new",
          price: {
            amountMicros: "59990000",
            currencyCode: "USD",
          },
        },
      },
    ],
    nextPageToken: "CgwI4MSB3QYQ",
  },
};
export const batchProductExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    results: [
      {
        success: true,
        result: productInputExample,
      },
      {
        success: false,
        error: "INVALID_ARGUMENT: offerId is required.",
      },
    ],
  },
};
