//#region node_modules/axios/index.d.ts
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sage-intacct";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sage-intacct/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      data: {
        comments: string;
        language: "xml";
        type: "code";
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        placeholder: string;
        required: false;
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
      responseType: {
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        clean: (value: unknown) => ResponseType;
      };
      explicitArray: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
    queryAndList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      objectNameInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      queryInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    deleteObject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      object: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      keys: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createARAdvance: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentDateInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      receiptDateInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentMethodInput: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      arAdvanceItemsInput: {
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: true;
        example: string;
        clean: (xml: unknown) => string;
      };
      customerIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      financialEntityInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      undepositedAccountNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalXmlTagsInput: {
        example: string;
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: false;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateARAdvance: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordNoInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      arAdvanceItemsInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "xml";
        example: string;
        clean: (xml: unknown) => string;
      };
      paymentDateInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      receiptDateInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentMethodInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      financialEntityInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      undepositedAccountNoInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalXmlTagsInput: {
        example: string;
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: false;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getARAdvance: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getARAdjustment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateARAdjustment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      keyId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerIdInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      dateCreatedInput: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      datePostedInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currencyInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      exchRateTypeInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      adjustmentNoInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceNoInput: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      arAdjustmentLineItemsInput: {
        comments: string;
        required: boolean;
        label: string;
        type: "code";
        language: "xml";
        example: string;
        clean: (xml: unknown) => string;
      };
      actionInput: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalXmlTagsInput: {
        example: string;
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: false;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getARAdjustmentLine: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectNameInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectCategoryInput: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      projectDescriptionInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentProjectIdInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceWithParentInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      projectTypeInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectStatusInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statusInput: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectIdInput: {
        required: boolean;
        comments: string;
        dataSource: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectNameInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectCategoryInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectDescriptionInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentProjectIdInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceWithParentInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        default: undefined;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      projectTypeInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectStatusInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statusInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        default: undefined;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
      additionalFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        comments: string;
        dataSource: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getApPayment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getArPayment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createBill: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      billTransactionDateInput: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      billTransactionGlPostingDateInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorIdInput: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      billNumberInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      docNumberInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      termNameInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recPaymentDateInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueDateInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentPriorityInput: {
        model: {
          label: string;
          value: string;
        }[];
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      onHoldInput: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      currencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      baseCurrencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      apBillItemsInput: {
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: true;
        default: string;
        example: string;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getBill: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceLineItemsInput: {
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        required: true;
        default: string;
        example: string;
        clean: (xml: unknown) => string;
      };
      customerIdInput: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      dateCreatedInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      datePostedInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueDateInput: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      termNameInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      recordNoInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceNumberInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ponumberInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionInput: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      externalIdInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      billToContactNameInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipToContactNameInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currencyAndExchangeRate: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          baseCurrencyInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          currencyInput: {
            comments: string;
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          exchRateDateInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          exchRateTypeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      noglInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldsXmlInput: {
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        example: string;
        required: false;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      keyId: {
        dataSource: string;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      dateCreatedInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      datePostedInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateDueInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      termNameInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceNumberInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      ponumberInput: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionInput: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        type: "string";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactNameInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      currencyAndExchangeRate: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          baseCurrencyInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          currencyInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          exchRateDateInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          exchRateTypeInput: {
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          exchRateInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customFieldsXmlInput: {
        label: string;
        type: "code";
        language: "xml";
        comments: string;
        example: string;
        required: false;
        clean: (xml: unknown) => string;
      };
      invoiceLineItemsInput: {
        required: boolean;
        comments: string;
        label: string;
        type: "code";
        language: "xml";
        default: string;
        example: string;
        clean: (xml: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactNameInput: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      printAsInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactNameInput: {
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printAsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      customerNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      oneTimeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printAsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          isoCountryCodeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      excludedFromContactListInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      customerTypeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesRepEmployeeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentCustomerIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      glAccounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          glGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offsetArGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultRevenueGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      territoryIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      billingPreferences: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          paymentTermInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          deliveryMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultInvoiceMessageInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      resaleNumberInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      creditLimitInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      onHoldInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      commentsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultCurrencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          printOptionArInvoiceTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeQuoteTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeOrderTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeListTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeInvoiceTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeAdjustmentTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeOtherTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerContactRoles: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          primaryContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          billToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shipToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      restrictionTypeInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      restrictedLocationsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      restrictedDepartmentsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      customFieldsInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customerIdInput: {
        required: boolean;
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerNameInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      oneTimeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printAsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          isoCountryCodeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      excludedFromContactListInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      customerTypeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesRepEmployeeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentCustomerIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      glAccounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          glGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offsetArGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultRevenueGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      territoryIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      billingPreferences: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          paymentTermInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          deliveryMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultInvoiceMessageInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shippingMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      resaleNumberInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      creditLimitInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      onHoldInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      commentsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultCurrencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          printOptionArInvoiceTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeQuoteTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeOrderTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeListTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeInvoiceTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeAdjustmentTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          printOptionOeOtherTemplateNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      customerContactRoles: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          primaryContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          billToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          shipToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      restrictionTypeInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      restrictedLocationsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      restrictedDepartmentsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      customFieldsInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    createVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      vendorIdInput: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      vendorNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      oneTimeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printAsInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          isoCountryCodeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      excludedFromContactListInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      vendorTypeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentVendorIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      glAccounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          glGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultExpenseGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offsetGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      form1099: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          form1099NameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          form1099TypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          form1099BoxInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      creditLimitInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      onHoldInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      paymentSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          doNotPayInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          preferredPaymentMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          paymentTermInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          sendAutomaticPaymentNotificationInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          mergePaymentRequestsInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          vendorBillingTypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          paymentPriorityInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          termDiscountDisplayedOnCheckStubInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
        };
      } & {
        type: "structuredObject";
      };
      commentsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultCurrencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorContactRoles: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          primaryContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          payToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          returnToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      achDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          achEnabledInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          achBankRoutingNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountTypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountClassInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      vendorAccountNoInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locationAssignedAccountNoDisplayedOnCheckStubInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      restrictionTypeInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      restrictedLocationsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      restrictedDepartmentsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      customFieldsInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    updateVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      vendorIdInput: {
        required: boolean;
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorNameInput: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      oneTimeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      activeInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      companyNameInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      printAsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          prefixInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          firstNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          middleNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          lastNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          addressLine2Input: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cityInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          stateProvinceInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          zipPostalCodeInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          countryInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          isoCountryCodeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryEmailAddressInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          cellularPhoneNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pagerNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          faxNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          primaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          secondaryUrlInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      excludedFromContactListInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      vendorTypeIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentVendorIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      glAccounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          glGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          defaultExpenseGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offsetGlAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          taxIdInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taxableInput: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          contactTaxGroupNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      form1099: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          form1099NameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          form1099TypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          form1099BoxInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      attachmentsIdInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      creditLimitInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      onHoldInput: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      paymentSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          doNotPayInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          preferredPaymentMethodInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          paymentTermInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          sendAutomaticPaymentNotificationInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          mergePaymentRequestsInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          vendorBillingTypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          paymentPriorityInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          termDiscountDisplayedOnCheckStubInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
        };
      } & {
        type: "structuredObject";
      };
      commentsInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultCurrencyInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorContactRoles: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          primaryContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          payToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          returnToContactNameInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      achDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          achEnabledInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          achBankRoutingNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountNoInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountTypeInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          achBankAccountClassInput: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      vendorAccountNoInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locationAssignedAccountNoDisplayedOnCheckStubInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      restrictionTypeInput: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      restrictedLocationsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      restrictedDepartmentsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
      };
      customFieldsInput: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => any[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
    }>;
    getVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fieldsInput: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (fields: unknown) => string[];
      };
      recordNoInput: {
        dataSource: string;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown>;
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
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "sageIntacctConnection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      senderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      senderPassword: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      userId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      userPassword: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
    };
  }, "sageIntacctConnection">[];
  dataSources: {
    selectCustomer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      returnIdInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectVendor: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      returnIdInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProject: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      returnIdInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      returnContactNameInput: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;