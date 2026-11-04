//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface Sage200Record {
  date_time_created?: string;
  date_time_updated?: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sage-200";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sage-200/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listPricingTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPricingSourceTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductPriceViews: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      transactionDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      exchangeRate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      reference: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      secondReference: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      settledImmediately: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      documentGoodsValue: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      documentTaxValue: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      documentDiscountValue: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      documentTaxDiscountValue: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      discountPercent: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      discountDays: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      triangularTransaction: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taxAnalysisItems: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      nominalAnalysisItems: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSalesInvoiceReturnCreditViews: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTaxCodes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTaxCode: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxCodeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      isEditing: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isToSequenceLines: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      overrideOnHold: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      recalculatePrices: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      applyAvailableDocumentDiscountPercent: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customerDeliveryAddressId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      suppressWarnings: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      customerType: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      documentDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      exchangeRate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      customerDocumentNo: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      useInvoiceAddress: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isTriangulated: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      settlementDiscountDays: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      settlementDiscountPercent: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      documentDiscountPercent: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      documentCreatedBy: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      requestedDeliveryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      promisedDeliveryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      quotationExpiryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      orderPriority: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      documentNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItemsOnSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      orderLineId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      isEditing: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      isToSequenceLines: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      overrideOnHold: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      recalculatePrices: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      applyAvailableDocumentDiscountPercent: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      suppressWarnings: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      useInvoiceAddress: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      isTriangulated: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      customerDeliveryAddressId: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      customerType: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      documentDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      exchangeRate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      customerDocumentNo: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      settlementDiscountDays: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      settlementDiscountPercent: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      documentDiscountPercent: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      documentCreatedBy: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      requestedDeliveryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      promisedDeliveryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      quotationExpiryDate: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      orderPriority: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSiteAndCompanyInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      headers: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPriceBand: import("@prismatic-io/spectral").ActionDefinition<{
      priceBandId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPriceBands: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomerPriceBand: import("@prismatic-io/spectral").ActionDefinition<{
      customerPriceBandId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomerPriceBands: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProductGroup: import("@prismatic-io/spectral").ActionDefinition<{
      productGroupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProductGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchProductGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProduct: import("@prismatic-io/spectral").ActionDefinition<{
      description: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      useDescriptionOnDocuments: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      barcode: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      allowSalesOrder: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taxCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      productStatusType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fulfilmentMethodType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fulfilmentSequenceType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      inactivationDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      manufacturer: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      partNumber: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      labelPrintingOptionType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      traceableType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      saleFromSingleBatch: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      allowDuplicateNumbers: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      usesAlternativeRef: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      usesSellByDate: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      usesUseByDate: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      shelfLife: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      shelfLifeType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      code: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      productGroupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProduct: import("@prismatic-io/spectral").ActionDefinition<{
      productId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchProducts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProduct: import("@prismatic-io/spectral").ActionDefinition<{
      useDescriptionOnDocuments: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      allowSalesOrder: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      saleFromSingleBatch: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      allowDuplicateNumbers: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      usesAlternativeRef: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      usesSellByDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      usesUseByDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      barcode: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      taxCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      productStatusType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fulfilmentMethodType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fulfilmentSequenceType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      inactivationDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      manufacturer: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      partNumber: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      labelPrintingOptionType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      traceableType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      shelfLife: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      shelfLifeType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      productId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomerContact: import("@prismatic-io/spectral").ActionDefinition<{
      customerContactId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomerContact: import("@prismatic-io/spectral").ActionDefinition<{
      customerContactId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomerContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomerContact: import("@prismatic-io/spectral").ActionDefinition<{
      isToDelete: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      salutationId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      firstName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      middleName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      emails: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      telephones: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      mobiles: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      faxes: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      websites: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      roles: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
      customerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomerDeliveryAddress: import("@prismatic-io/spectral").ActionDefinition<{
      isDefault: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      postalName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address1: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address2: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address3: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address4: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      county: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      postcode: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      addressCountryCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      contact: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      telephone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fax: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxNumber: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      countryCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      customerId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomerDeliveryAddress: import("@prismatic-io/spectral").ActionDefinition<{
      deliveryAddressId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomerDeliveryAddress: import("@prismatic-io/spectral").ActionDefinition<{
      deliveryAddressId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomerDeliveryAddresses: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomerDeliveryAddress: import("@prismatic-io/spectral").ActionDefinition<{
      isDefault: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      postalName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address1: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address2: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address3: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address4: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      county: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      postcode: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      addressCountryCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      contact: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      telephone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fax: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxNumber: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      countryCodeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      deliveryAddressId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      shortName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      onHold: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      statusReason: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      accountStatusType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      exchangeRateType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneCountryCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneAreaCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneSubscriberNumber: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxCountryCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxAreaCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxSubscriberNumber: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      website: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      reference: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      filterDataAfterDate: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Date | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      onHold: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      shortName: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      statusReason: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      accountStatusType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      exchangeRateType: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneCountryCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneAreaCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      telephoneSubscriberNumber: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxCountryCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxAreaCode: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      faxSubscriberNumber: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      website: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
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
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      pollResourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
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
      payload: {
        body: {
          data: {
            created: Sage200Record[];
            updated: Sage200Record[];
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
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomerContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCustomerDeliveryAddress: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPriceBand: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProduct: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProductGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSalesOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTaxCode: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      site: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      company: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "sage200Oauth2Connection";
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
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
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
      "ocp-apim-subscription-key": {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      sage200edition: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
      };
    };
  }, "sage200Oauth2Connection">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;