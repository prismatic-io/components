//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "amazon-seller-central";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/amazon-seller-central/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      debugRequest: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      payloadVersion: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      marketplaceIds: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string[];
      };
      orderChangeTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown) => string[];
      };
      aggregationTimePeriod: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventFilterType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        dataSource: string;
      };
      notificationType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSubscriptionById: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        dataSource: string;
      };
      notificationType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getShipment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      shipmentId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelShipment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      shipmentId: {
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createShipment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      AmazonOrderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      SellerOrderId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ItemList: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      ShipFromAddress: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      PackageDimensions: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      Weight: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ShipDate: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      ShippingServiceOptions: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      LabelCustomization: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      ShippingServiceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
      };
      ShippingServiceOfferId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          MustArriveByDate: {
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
          };
          HazmatType: {
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          IncludePackingSlipWithLabel: {
            label: string;
            type: "boolean";
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            required: false;
          };
          ShipmentLevelSellerInputsList: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    confirmOrderShipment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      marketplaceId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      packageReferenceId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      carrierCode: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      trackingNumber: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipDate: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderItems: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
      shipFromSupplySourceId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          carrierName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingMethod: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          codCollectionMethod: {
            label: string;
            type: "string";
            placeholder: string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrderAddress: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrderBuyerInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrderItems: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      NextToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getOrderItemsBuyerInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      MarketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      CreatedAfter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      LastUpdatedAfter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      OrderStatuses: {
        label: string;
        type: "string";
        comments: string;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string;
      };
      FulfillmentChannels: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string;
      };
      PaymentMethods: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string;
      };
      SellerOrderId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      EasyShipShipmentStatuses: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string;
      };
      ElectronicInvoiceStatuses: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string;
      };
      AmazonOrderIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        example: string;
        clean: (value: unknown) => string;
      };
      ActualFulfillmentSupplySourceId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      StoreChainStoreId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          MaxResultsPerPage: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          NextToken: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          CreatedBefore: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          LastUpdatedBefore: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          BuyerEmail: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          IsISPU: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createListingsItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sellerId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      sku: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      productType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      requirements: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributes: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      issueLocale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteListingsItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sellerId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      sku: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      issueLocale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCatalogItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      asin: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      includedData: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getListingsItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sellerId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      sku: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      issueLocale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      includedData: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchCatalogItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      identifiers: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      identifiersType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includedData: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      sellerId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      keywords: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      brandNames: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      classificationsIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      keywordsLocale: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateListingsItem: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sellerId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      sku: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      productType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      issueLocale: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
      };
      patches: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelFeed: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createFeed: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string[];
      };
      inputFeedDocumentId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      feedOptions: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createFeedDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contentType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFeed: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getFeedDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedDocumentId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFeeds: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedTypes: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        example: string;
        clean: (value: unknown) => string;
      };
      marketplaceIds: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string;
      };
      processingStatuses: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      createdSince: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      createdUntil: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          nextToken: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDestination: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      arn: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      region: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountId: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDestination: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      destinationId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDestination: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      destinationId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDestinations: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: "Orders" | "Feeds";
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isSandboxEnvironment: {
        label: string;
        type: "string";
        required: false;
        shown: boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    key: "clientCredentials";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      region: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      isSandboxEnvironment: {
        label: string;
        type: "string";
        required: false;
        shown: boolean;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    };
  }, "clientCredentials">)[];
  dataSources: {
    selectDestinations: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      createdAfter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      createdBefore: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastUpdatedAfter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastUpdatedBefore: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      marketplaceIds: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFeed: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedTypes: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        example: string;
        clean: (value: unknown) => string;
      };
      marketplaceIds: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string;
      };
      processingStatuses: {
        clean: (value: unknown) => string;
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      createdSince: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      createdUntil: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationType: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;