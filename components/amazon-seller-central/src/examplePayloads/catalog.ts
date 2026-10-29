export const searchCatalogItemExamplePayload = {
  data: {
    numberOfResults: 2,
    pagination: {
      nextToken: "Q3VzdG9tZXJGZWVkYmFjazoxOjE",
    },
    refinements: {
      brands: [
        {
          numberOfResults: 2,
          brandName: "ACME",
        },
      ],
      classifications: [
        {
          numberOfResults: 2,
          displayName: "Electronics",
          classificationId: "12345678",
        },
      ],
    },
    items: [
      {
        asin: "B07XJ8C8F5",
        attributes: {
          condition_type: [
            {
              value: "new_new",
              language: "en_US",
            },
          ],
          item_name: [
            {
              value: "ACME Product Name - Premium Edition",
              language: "en_US",
              marketplace_id: "ATVPDKIKX0DER",
            },
          ],
          brand: [
            {
              value: "ACME",
              language: "en_US",
            },
          ],
          list_price: [
            {
              value: 99.99,
              currency: "USD",
              marketplace_id: "ATVPDKIKX0DER",
            },
          ],
          product_category: [
            {
              value: "ELECTRONIC_COMPONENTS_AND_EQUIPMENT",
            },
          ],
        },
        identifiers: [
          {
            identifierType: "ASIN",
            identifier: "B07XJ8C8F5",
          },
          {
            identifierType: "EAN",
            identifier: "1234567890123",
          },
        ],
        images: [
          {
            variant: "MAIN",
            link: "https://m.media-amazon.com/images/I/acme-image._AC_US200_.jpg",
            height: 200,
            width: 200,
          },
        ],
        productTypes: [
          {
            productType: "ELECTRONIC_COMPONENT",
          },
        ],
        salesRanks: [
          {
            classificationRanks: [
              {
                rank: 42,
                title: "Electronics",
                link: "https://www.amazon.com/gp/bestsellers/electronics",
              },
            ],
            displayGroupRanks: [],
          },
        ],
        summaries: [
          {
            marketplaceId: "ATVPDKIKX0DER",
            adultProduct: false,
            autographed: false,
            brand: "ACME",
            browseClassification: {
              displayName: "Electronics",
              classificationId: "12345678",
            },
            color: "Black",
            itemClassification: "BASE_PRODUCT",
            itemName: "ACME Product Name - Premium Edition",
            manufacturer: "ACME Corporation",
            memorabilia: false,
            modelNumber: "EX-123-BLK",
            packageQuantity: 1,
            size: "Medium",
            style: "Modern",
          },
        ],
        vendorDetails: [],
      },
      {
        asin: "B08N5WRWNW",
        attributes: {
          condition_type: [
            {
              value: "new_new",
              language: "en_US",
            },
          ],
          item_name: [
            {
              value: "Another ACME Product",
              language: "en_US",
              marketplace_id: "ATVPDKIKX0DER",
            },
          ],
          brand: [
            {
              value: "ACME",
              language: "en_US",
            },
          ],
          list_price: [
            {
              value: 149.99,
              currency: "USD",
              marketplace_id: "ATVPDKIKX0DER",
            },
          ],
        },
        identifiers: [
          {
            identifierType: "ASIN",
            identifier: "B08N5WRWNW",
          },
        ],
        productTypes: [
          {
            productType: "ELECTRONIC_COMPONENT",
          },
        ],
        summaries: [
          {
            marketplaceId: "ATVPDKIKX0DER",
            adultProduct: false,
            autographed: false,
            brand: "ACME",
            itemClassification: "BASE_PRODUCT",
            itemName: "Another ACME Product",
            packageQuantity: 1,
          },
        ],
      },
    ],
  },
};

export const getCatalogItemExamplePayload = {
  data: {
    asin: "B07XJ8C8F5",
    attributes: {
      condition_type: [
        {
          value: "new_new",
          language: "en_US",
        },
      ],
      item_name: [
        {
          value: "ACME Product Name - Premium Edition",
          language: "en_US",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      brand: [
        {
          value: "ACME",
          language: "en_US",
        },
      ],
      list_price: [
        {
          value: 99.99,
          currency: "USD",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      product_category: [
        {
          value: "ELECTRONIC_COMPONENTS_AND_EQUIPMENT",
        },
      ],
      item_dimensions: [
        {
          height: {
            value: 10.0,
            unit: "centimeters",
          },
          width: {
            value: 20.0,
            unit: "centimeters",
          },
          length: {
            value: 15.0,
            unit: "centimeters",
          },
          weight: {
            value: 0.5,
            unit: "kilograms",
          },
        },
      ],
    },
    identifiers: [
      {
        identifierType: "ASIN",
        identifier: "B07XJ8C8F5",
      },
      {
        identifierType: "EAN",
        identifier: "1234567890123",
      },
      {
        identifierType: "UPC",
        identifier: "123456789012",
      },
    ],
    images: [
      {
        variant: "MAIN",
        link: "https://m.media-amazon.com/images/I/acme-image._AC_US200_.jpg",
        height: 200,
        width: 200,
      },
      {
        variant: "PT01",
        link: "https://m.media-amazon.com/images/I/acme-image-2._AC_US200_.jpg",
        height: 200,
        width: 200,
      },
    ],
    productTypes: [
      {
        productType: "ELECTRONIC_COMPONENT",
        marketplaceId: "ATVPDKIKX0DER",
      },
    ],
    salesRanks: [
      {
        classificationRanks: [
          {
            rank: 42,
            title: "Electronics",
            link: "https://www.amazon.com/gp/bestsellers/electronics",
          },
        ],
        displayGroupRanks: [],
      },
    ],
    summaries: [
      {
        marketplaceId: "ATVPDKIKX0DER",
        adultProduct: false,
        autographed: false,
        brand: "ACME",
        browseClassification: {
          displayName: "Electronics",
          classificationId: "12345678",
        },
        color: "Black",
        itemClassification: "BASE_PRODUCT",
        itemName: "ACME Product Name - Premium Edition",
        manufacturer: "ACME Corporation",
        memorabilia: false,
        modelNumber: "EX-123-BLK",
        packageQuantity: 1,
        partNumber: "EX-123-BLK-US",
        releaseDate: "2023-06-15T00:00:00Z",
        size: "Medium",
        style: "Modern",
        tradeInEligible: false,
        websiteDisplayGroup: "electronics_display_on_website",
      },
    ],
    vendorDetails: [],
  },
};

export const getListingsItemExamplePayload = {
  data: {
    sku: "MY-SKU-12345",
    summaries: [
      {
        marketplaceId: "ATVPDKIKX0DER",
        asin: "B07XJ8C8F5",
        productType: "ELECTRONIC_COMPONENT",
        conditionType: "new_new",
        status: ["BUYABLE"],
        fnSku: "X001234567",
        itemName: "ACME Product Name - Premium Edition",
        createdDate: "2023-06-15T10:30:00Z",
        lastUpdatedDate: "2024-01-10T14:22:10Z",
        mainImage: {
          link: "https://m.media-amazon.com/images/I/acme-image._AC_US200_.jpg",
          height: 200,
          width: 200,
        },
      },
    ],
    attributes: {
      condition_type: [
        {
          value: "new_new",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      item_name: [
        {
          value: "ACME Product Name - Premium Edition",
          language_tag: "en_US",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      brand: [
        {
          value: "ACME",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      externally_assigned_product_identifier: [
        {
          value: "1234567890123",
          type: "ean",
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      purchasable_offer: [
        {
          currency: "USD",
          our_price: [
            {
              schedule: [
                {
                  value_with_tax: 99.99,
                },
              ],
            },
          ],
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
      fulfillment_availability: [
        {
          fulfillment_channel_code: "DEFAULT",
          quantity: 100,
          marketplace_id: "ATVPDKIKX0DER",
        },
      ],
    },
    issues: [],
    offers: [
      {
        marketplaceId: "ATVPDKIKX0DER",
        offerType: "B2C",
        price: {
          listingPrice: {
            amount: 99.99,
            currencyCode: "USD",
          },
          shippingPrice: {
            amount: 0.0,
            currencyCode: "USD",
          },
        },
        pointsGranted: null,
      },
    ],
    fulfillmentAvailability: [
      {
        fulfillmentChannelCode: "DEFAULT",
        quantity: 100,
      },
    ],
    procurement: [],
  },
};

export const createListingsItemExamplePayload = {
  data: {
    sku: "MY-SKU-12345",
    status: "ACCEPTED",
    submissionId: "f1dc291475dd11eaa671df34d64cc222",
    issues: [],
  },
};

export const updateListingsItemExamplePayload = {
  data: {
    sku: "MY-SKU-12345",
    status: "ACCEPTED",
    submissionId: "g2ed392586ee22fbb782eg45e75dd333",
    issues: [],
  },
};

export const deleteListingsItemExamplePayload = {
  data: {
    sku: "MY-SKU-12345",
    status: "ACCEPTED",
    submissionId: "h3fe493697ff33gcc893fh56f86ee444",
    issues: [],
  },
};
