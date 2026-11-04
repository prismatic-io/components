//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "quickbooks";
  documentationUrl: "https://prismatic.io/docs/components/quickbooks/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      startPosition: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    createNonInventoryItem: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      nonInventoryItemData: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      minorVersion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryResource: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryString: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      minorVersion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createResource: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceAttributes: {
        label: string;
        type: "data";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => {
          [k: string]: unknown;
        };
      };
      resourceType: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    findResource: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
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
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateResource: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceAttributes: {
        label: string;
        type: "data";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => {
          [k: string]: unknown;
        };
      };
      resourceType: {
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
      syncToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resourceData: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lineItems: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      applyTaxAfterDiscount: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      createTime: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      customerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      customerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      accountName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      accountId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      paymentMethodId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      paymentMethodName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    batchRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      batchRequestItems: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      file: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      fileName: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityRefValue: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityRefType: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      note: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fileType: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeOnSend: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    readAnAttachable: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachableId: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachableId: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createNoteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityRefValue: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityRefType: {
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      note: {
        required: true;
        label: string;
        placeholder: string;
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      includeOnSend: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachable: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachablePayload: {
        label: string;
        comments: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAttachable: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      updateRequestBody: {
        label: string;
        placeholder: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        clean: (value: unknown) => object | undefined;
      };
      minorVersion: {
        default: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      attachableEntityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachableEntityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      apAccountId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lines: {
        label: string;
        type: "data";
        required: true;
        comments: string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      syncToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      baseRecord: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      apAccountId: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
      };
      vendorId: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
      };
      lines: {
        required: false;
        label: string;
        type: "data";
        comments: string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      syncToken: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPurchaseOrders: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      startPosition: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    updateRefundReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      syncToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      totalAmount: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lineItems: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      line4: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      line3: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      line2: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      line1: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingAddressId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      lat: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      long: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRefundReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lineItems: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      accountName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      accountId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      line4: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      line3: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      line2: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      line1: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingAddressId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      lat: {
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      long: {
        label: string;
        placeholder: string;
        example: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteRefundReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      syncToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendRefundReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendRefundReceiptToEmail: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRefundReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRefundReceiptAsPDF: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      receiptId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRefundReceipts: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      startPosition: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    getInvoiceById: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      data: {
        label: string;
        placeholder: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createInvoiceV2: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerId: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      lineItems: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      customerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      customFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      billEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billEmailCc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billEmailBcc: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      invoiceDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      docNumber: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      customerMemo: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      privateNote: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      salesTermId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      applyTaxAfterDiscount: {
        required: false;
        label: string;
        type: "boolean";
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      billingLine1: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingLine2: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingCity: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingState: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      billingPostalCode: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      shippingLine1: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      shippingLine2: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      shippingCity: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      shippingState: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      shippingPostalCode: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        comments: string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    voidInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      syncToken: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      startPosition: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    getCustomerByDisplayName: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerDisplayName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomerById: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        required: true;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      startPosition: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>[];
    }>;
    getCompanyInfo: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryVendorExpenses: import("@prismatic-io/spectral").ActionDefinition<{
      quickbooksConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      queryParams: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
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
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
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
        shown: false;
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
      revokeUrl: {
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
        required: true;
        shown: true;
        default: string;
        comments: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      useSandbox: {
        label: string;
        type: "boolean";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2">[];
  dataSources: {
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAttachment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRefundReceipt: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTerm: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;