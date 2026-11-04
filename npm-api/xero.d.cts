//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "xero";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/xero/";
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      modifiedAfter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      where: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    listConnections: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveContact: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAccount: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      modifiedAfter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      where: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItem: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      modifiedAfter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      where: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteItem: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listItems: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      modifiedAfter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      where: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      addressType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      postalCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      country: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      region: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bankAccountDetails: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      contactStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountsReceivableTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountsPayableTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      defaultCurrency: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContactHistory: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      contactNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      contactName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      lastName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountsPayableTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      accountsReceivableTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bankAccountDetails: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      defaultCurrency: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      taxNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      contactStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      addressType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      postalCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      country: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      region: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createItem: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseUnitPrice: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesUnitPrice: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      itemName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      inventoryAssetAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      isSold: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isPurchased: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getItemHistory: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addNoteToItem: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contactId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      lineAmountTypes: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      invoiceStatus: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      lineItems: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
      date: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      dateString: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      dueDateString: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      invoiceNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      reference: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      url: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      sentToContact: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        example: string;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    voidInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addNoteToInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notes: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAccount: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bankAccountNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      showInExpenseClaims: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fieldValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      objectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      contentType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
      };
      objectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
      contentType: string | undefined;
    }>;
    getPayment: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
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
    getPaymentHistory: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
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
    listPayments: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      page: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      modifiedAfter: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      where: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    payInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      invoiceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentAmount: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateString: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reversePayment: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      paymentId: {
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
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveAccount: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAccount: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountCode: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountType: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      enablePaymentsToAccount: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fieldValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        placeholder: string;
        example: string;
      };
      showInExpenseClaims: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateItem: import("@prismatic-io/spectral").ActionDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemCode: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      isSold: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isPurchased: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      purchaseDescription: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseUnitPrice: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaseAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesUnitPrice: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      salesTaxType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      inventoryAssetAccountCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fieldValues: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        placeholder: string;
        example: string;
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
        example: string;
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
      tenant: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "xeroOAuthClientCredentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
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
        example: string;
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
    };
  }, "xeroOAuthClientCredentials">)[];
  dataSources: {
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectItem: import("@prismatic-io/spectral").DataSourceDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPayment: import("@prismatic-io/spectral").DataSourceDefinition<{
      xeroConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      webhookKey: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      xeroConnection: {
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
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;