//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface SageRecord {
  id: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sage";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sage/";
  display: {
    label: string;
    description: string;
    category: "Application Connectors";
    iconPath: string;
  };
  actions: {
    createContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      name: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      contactTypeIds: {
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        comments: string;
        required: true;
        dataSource: string;
      };
      reference: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      defaultSalesLedgerId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      defaultSalesTaxRateId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      defaultPurchaseLedgerId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      taxNumber: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      notes: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      creditLimit: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      creditDays: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      sourceGuid: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      currencyId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      addressName: {
        label: string;
        required: false;
        type: "string";
        example: string;
        comments: string;
      };
      addressLine1: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      addressLine2: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      city: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      countryId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      postalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      bankAccountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      addressTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      region: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryName: {
        label: string;
        required: false;
        type: "string";
        example: string;
        comments: string;
      };
      deliveryRegion: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      isMainAddress: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      deliveryLine1: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryLine2: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryCity: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryPostalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryCountryId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      deliveryBankAccountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      isMainDelivery: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      accountName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      accountNumber: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      sortCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      bic: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      iban: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContacts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      updated_or_created_since: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContactPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactPersonId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getContactPerson: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactPersonId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContactPeople: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      updated_or_created_since: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContactTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      date: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      invoiceLines: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
      };
      totalAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      salesInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSalesInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      updated_or_created_since: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      salesInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      salesInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      contactId: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
        dataSource: string;
      };
      date: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      dueDate: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      contactName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      notes: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      totalQuantity: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      netAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      taxAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      currencyId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      totalAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      invoiceLines: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      updated_or_created_since: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      date: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      invoiceLines: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
      };
      totalAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      dueDate: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      contactId: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
        dataSource: string;
      };
      date: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      dueDate: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      contactName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      notes: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      totalQuantity: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      netAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      taxAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      currencyId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      totalAmount: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      invoiceLines: {
        label: string;
        type: "code";
        language: "json";
        default: string;
        comments: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      ledgerAccountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLedgerAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      updated_or_created_since: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      ledgerAccountTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      includedInChart: {
        label: string;
        type: "boolean";
        example: string;
        comments: string;
        required: true;
      };
      name: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      displayName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      nominalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      taxRateId: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCountries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAddressTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCurrencies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContact: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      contactId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      name: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      contactTypeIds: {
        required: false;
        label: string;
        type: "string";
        example: string;
        collection: "valuelist";
        comments: string;
        dataSource: string;
      };
      reference: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      defaultSalesLedgerId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      defaultSalesTaxRateId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      defaultPurchaseLedgerId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      taxNumber: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      notes: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      creditLimit: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      creditDays: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      sourceGuid: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      currencyId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      addressName: {
        label: string;
        required: false;
        type: "string";
        example: string;
        comments: string;
      };
      addressLine1: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      addressLine2: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      city: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      countryId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      postalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      bankAccountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      addressTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      region: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryName: {
        label: string;
        required: false;
        type: "string";
        example: string;
        comments: string;
      };
      deliveryRegion: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      isMainAddress: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      deliveryLine1: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryLine2: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryCity: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryPostalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryCountryId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      deliveryBankAccountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      deliveryTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
        dataSource: string;
      };
      isMainDelivery: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      accountName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      accountNumber: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      sortCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      bic: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
      iban: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLedgerAccountTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      itemsPerPage: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
      page: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateLedgerAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      ledgerAccountTypeId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        dataSource: string;
      };
      includedInChart: {
        label: string;
        type: "boolean";
        example: string;
        comments: string;
        required: true;
      };
      name: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      displayName: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      nominalCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
      };
      taxRateId: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      gifiCode: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: false;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: SageRecord[];
            updated: SageRecord[];
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
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      description: string;
      label: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
        comments: string;
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
    };
  }, "oauth">[];
  dataSources: {
    selectContact: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContactType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContactPerson: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLedgerAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLedgerAccountType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSalesInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCountry: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAddressType: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCurrency: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;