const issueSchema = {
  type: "object" as const,
  properties: {
    code: { type: "string" },
    message: { type: "string" },
    severity: { type: "string", enum: ["ERROR", "WARNING", "INFO"] },
    attributeNames: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["code", "message", "severity"],
};

const identifierSchema = {
  type: "object" as const,
  properties: {
    identifierType: { type: "string" },
    identifier: { type: "string" },
  },
  required: ["identifierType", "identifier"],
};

const listingsItemSubmissionResponseSchema = {
  type: "object" as const,
  properties: {
    sku: { type: "string" },
    status: { type: "string", enum: ["ACCEPTED", "INVALID"] },
    submissionId: { type: "string" },
    issues: {
      type: "array",
      items: issueSchema,
    },
    identifiers: {
      type: "array",
      items: identifierSchema,
    },
  },
  required: ["sku", "status", "submissionId"],
};

export const createListingsItemOutputSchema =
  listingsItemSubmissionResponseSchema;

export const updateListingsItemOutputSchema =
  listingsItemSubmissionResponseSchema;

export const deleteListingsItemOutputSchema =
  listingsItemSubmissionResponseSchema;

export const getListingsItemOutputSchema = {
  type: "object" as const,
  properties: {
    sku: { type: "string" },
    summaries: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          asin: { type: "string" },
          productType: { type: "string" },
          conditionType: { type: "string" },
          status: {
            type: "array",
            items: { type: "string" },
          },
          fnSku: { type: "string" },
          itemName: { type: "string" },
          createdDate: { type: "string", format: "date-time" as const },
          lastUpdatedDate: { type: "string", format: "date-time" as const },
          mainImage: {
            type: "object" as const,
            properties: {
              link: { type: "string" },
              height: { type: "integer" },
              width: { type: "integer" },
            },
          },
        },
        required: ["marketplaceId", "asin", "productType", "status"],
      },
    },
    attributes: { type: "object" },
    issues: {
      type: "array",
      items: issueSchema,
    },
    offers: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          offerType: { type: "string" },
          price: {
            type: "object" as const,
            properties: {
              currencyCode: { type: "string" },
              amount: { type: "string" },
            },
          },
        },
        required: ["marketplaceId", "offerType"],
      },
    },
    fulfillmentAvailability: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          fulfillmentChannelCode: { type: "string" },
          quantity: { type: "integer" },
        },
        required: ["fulfillmentChannelCode"],
      },
    },
    procurement: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          costPrice: {
            type: "object" as const,
            properties: {
              currencyCode: { type: "string" },
              amount: { type: "string" },
            },
          },
        },
      },
    },
    relationships: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          childAsins: {
            type: "array",
            items: { type: "string" },
          },
          parentAsins: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    },
    productTypes: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          productType: { type: "string" },
          marketplaceId: { type: "string" },
        },
      },
    },
  },
  required: ["sku"],
};

const catalogItemSchema = {
  type: "object" as const,
  properties: {
    asin: { type: "string" },
    attributes: { type: "object" },
    classifications: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          displayName: { type: "string" },
          classificationId: { type: "string" },
        },
      },
    },
    dimensions: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          item: {
            type: "object" as const,
            properties: {
              height: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              length: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              weight: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              width: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
            },
          },
          package: {
            type: "object" as const,
            properties: {
              height: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              length: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              weight: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
              width: {
                type: "object" as const,
                properties: {
                  unit: { type: "string" },
                  value: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
    identifiers: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          identifiers: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                identifierType: { type: "string" },
                identifier: { type: "string" },
              },
            },
          },
        },
      },
    },
    images: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          images: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                variant: { type: "string" },
                link: { type: "string" },
                height: { type: "integer" },
                width: { type: "integer" },
              },
            },
          },
        },
      },
    },
    productTypes: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          productType: { type: "string" },
        },
      },
    },
    salesRanks: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          classificationRanks: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                classificationId: { type: "string" },
                title: { type: "string" },
                link: { type: "string" },
                rank: { type: "integer" },
              },
            },
          },
          displayGroupRanks: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                websiteDisplayGroup: { type: "string" },
                title: { type: "string" },
                link: { type: "string" },
                rank: { type: "integer" },
              },
            },
          },
        },
      },
    },
    summaries: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          adultProduct: { type: "boolean" },
          autographed: { type: "boolean" },
          brand: { type: "string" },
          browseClassification: {
            type: "object" as const,
            properties: {
              displayName: { type: "string" },
              classificationId: { type: "string" },
            },
          },
          color: { type: "string" },
          contributors: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                role: {
                  type: "object" as const,
                  properties: {
                    displayName: { type: "string" },
                    value: { type: "string" },
                  },
                },
                value: { type: "string" },
              },
            },
          },
          itemClassification: { type: "string" },
          itemName: { type: "string" },
          manufacturer: { type: "string" },
          memorabilia: { type: "boolean" },
          modelNumber: { type: "string" },
          packageQuantity: { type: "integer" },
          partNumber: { type: "string" },
          releaseDate: { type: "string" },
          size: { type: "string" },
          style: { type: "string" },
          tradeInEligible: { type: "boolean" },
          websiteDisplayGroup: { type: "string" },
          websiteDisplayGroupName: { type: "string" },
        },
      },
    },
    relationships: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          relationships: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                childAsins: {
                  type: "array",
                  items: { type: "string" },
                },
                parentAsins: {
                  type: "array",
                  items: { type: "string" },
                },
                variationTheme: {
                  type: "object" as const,
                  properties: {
                    attributes: {
                      type: "array",
                      items: { type: "string" },
                    },
                    theme: { type: "string" },
                  },
                },
                type: { type: "string" },
              },
            },
          },
        },
      },
    },
    vendorDetails: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          marketplaceId: { type: "string" },
          brandCode: { type: "string" },
          categoryCode: { type: "string" },
          manufacturerCode: { type: "string" },
          manufacturerCodeParent: { type: "string" },
          productGroup: { type: "string" },
          replenishmentCategory: { type: "string" },
          subcategoryCode: { type: "string" },
        },
      },
    },
  },
  required: ["asin"],
};

export const getCatalogItemOutputSchema = catalogItemSchema;

export const searchCatalogItemOutputSchema = {
  type: "object" as const,
  properties: {
    numberOfResults: { type: "integer" },
    pagination: {
      type: "object" as const,
      properties: {
        nextToken: { type: "string" },
        previousToken: { type: "string" },
      },
    },
    refinements: {
      type: "object" as const,
      properties: {
        brands: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              numberOfResults: { type: "integer" },
              brandName: { type: "string" },
            },
          },
        },
        classifications: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              numberOfResults: { type: "integer" },
              displayName: { type: "string" },
              classificationId: { type: "string" },
            },
          },
        },
      },
    },
    items: {
      type: "array",
      items: catalogItemSchema,
    },
  },
  required: ["numberOfResults", "items"],
};
