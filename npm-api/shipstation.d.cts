//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface OrderPollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: number[];
}
interface TimestampedRecord {
  createDate: string;
  modifyDate: string;
}
interface PollingChangesObject {
  created: TimestampedRecord[];
  updated: TimestampedRecord[];
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "shipstation";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/shipstation/";
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    listCarriers: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPackages: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      carrierCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listServices: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      carrierCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listFulfillments: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fulfillmentId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      orderId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      pageFulfillments: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageSizeFulfillments: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
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
      customerName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderStatusList: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageFullorders: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageSizeFulfillorders: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      stateCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      countryCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      marketplaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      tagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortDir: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderNumber: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderDate: {
        label: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderStatus: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderKey: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      billTo: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
      shipTo: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
      additionalFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateMultipleOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ordersArray: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => any[];
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
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLabelForOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      orderIdInput: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      carrierCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      serviceCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      confirmation: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipDate: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      testLabel: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sku: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCategoryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productTypeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      startDate: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endDate: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sorting: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          sortBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sortDir: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      showInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      productId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productData: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listShipments: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      shipmentFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          trackingNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          recipientName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          recipientCountryCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          createDateStart: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          createDateEnd: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          shipDateStart: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          shipDateEnd: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createShipmentLabel: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      carrierCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      serviceCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      packageCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipDate: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      weight: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
      shipTo: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
      shipFrom: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
      additionalFields: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listStores: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      marketplaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getStore: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateStore: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storeUpdateData: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (input: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deactivateStore: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      storeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWarehouses: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWarehouse: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      warehouseId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWarehouse: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      warehouseName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      originAddress: {
        label: string;
        type: "jsonForm";
        required: true;
        comments: string;
      };
      returnAddress: {
        label: string;
        type: "jsonForm";
        required: false;
        comments: string;
      };
      isDefault: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWarehouse: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      warehouseUpdateData: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWarehouse: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      warehouseId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    subscribeToWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      targetUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      event: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storeId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      friendlyName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    unsubscribeToWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInstancedWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      url: {
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    shipStationWebhookTrigger: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    webhookEventSubscription: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookEvent: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      storeId: {
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        dataSource: string;
      };
      friendlyName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollOrders: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      payload: {
        paginationState: OrderPollCursor | undefined;
        body: {
          data: PollingChangesObject;
          polledNoChanges: boolean;
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    pollShipments: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      polledNoChanges: true;
    } | {
      payload: {
        body: {
          data: {
            created: TimestampedRecord[];
            updated: TimestampedRecord[];
          };
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges?: undefined;
    }, import("@prismatic-io/spectral").Inputs>;
    pollProducts: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      polledNoChanges: true;
    } | {
      payload: {
        body: {
          data: {
            created: TimestampedRecord[];
            updated: TimestampedRecord[];
          };
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges?: undefined;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "shipStationApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      apiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      apiSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "shipStationApiKey">[];
  dataSources: {
    selectCarriers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectServices: import("@prismatic-io/spectral").DataSourceDefinition<{
      carrierCode: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPackages: import("@prismatic-io/spectral").DataSourceDefinition<{
      carrierCode: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      stateCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      countryCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      marketplaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      tagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDir: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectStores: import("@prismatic-io/spectral").DataSourceDefinition<{
      showInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      marketplaceId: {
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUsers: import("@prismatic-io/spectral").DataSourceDefinition<{
      showInactiveUsersInput: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrders: import("@prismatic-io/spectral").DataSourceDefinition<{
      customerName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderStatusList: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageFullorders: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageSizeFulfillorders: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProducts: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sku: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productCategoryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      productTypeId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      startDate: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endDate: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sortBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sortDir: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      showInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWarehouses: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhooks: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFulfillments: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;