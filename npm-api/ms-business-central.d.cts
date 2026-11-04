//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/interfaces.d.ts
interface Account {
  id: string;
  number: string;
  displayName: string;
  category: string;
  subCategory: string;
  blocked: boolean;
  accountType: string;
  directPosting: boolean;
  netChange: number;
  consolidationTranslationMethod: string;
  consolidationDebitAccount: string;
  consolidationCreditAccount: string;
  excludeFromConsolidation: boolean;
  lastModifiedDateTime: string;
}
interface Customer {
  id: string;
  number: string;
  displayName: string;
  type: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  salespersonCode: string;
  balanceDue: number;
  creditLimit: number;
  taxLiable: boolean;
  taxAreaId: string;
  taxAreaDisplayName: string;
  taxRegistrationNumber: string;
  currencyId: string;
  currencyCode: string;
  paymentTermsId: string;
  shipmentMethodId: string;
  paymentMethodId: string;
  blocked: string;
  lastModifiedDateTime: string;
}
interface Attachment {
  "@odata.context": string;
  "@odata.etag": string;
  id: string;
  parentId: string;
  fileName: string;
  byteSize: number;
  lastModifiedDateTime: string;
  parentType: string;
  "attachmentContent@odata.mediaEditLink": string;
  "attachmentContent@odata.mediaReadLink": string;
}
interface ShipmentMethod {
  id: string;
  code: string;
  displayName: string;
  lastModifiedDateTime: string;
}
interface SalesShipmentLine {
  id: string;
  documentId: string;
  documentNo: string;
  sequence: number;
  lineType: string;
  lineObjectNumber: string;
  description: string;
  description2: string;
  unitOfMeasureCode: string;
  unitPrice: number;
  quantity: number;
  discountPercent: number;
  taxPercent: number;
  shipmentDate: string;
}
interface Item {
  id: string;
  number: string;
  displayName: string;
  displayName2: string;
  type: string;
  itemCategoryId: string;
  itemCategoryCode: string;
  blocked: boolean;
  gtin: string;
  inventory: number;
  unitPrice: number;
  priceIncludesTax: boolean;
  unitCost: number;
  taxGroupId: string;
  taxGroupCode: string;
  baseUnitOfMeasureId: string;
  baseUnitOfMeasureCode: string;
  generalProductPostingGroupId: string;
  generalProductPostingGroupCode: string;
  inventoryPostingGroupId: string;
  inventoryPostingGroupCode: string;
  lastModifiedDateTime: string;
}
interface SalesOrder {
  id: string;
  number: string;
  externalDocumentNumber: string;
  orderDate: string;
  postingDate: string;
  customerId: string;
  customerNumber: string;
  customerName: string;
  billToName: string;
  billToCustomerId: string;
  billToCustomerNumber: string;
  shipToName: string;
  shipToContact: string;
  sellToAddressLine1: string;
  sellToAddressLine2: string;
  sellToCity: string;
  sellToCountry: string;
  sellToState: string;
  sellToPostCode: string;
  billToAddressLine1: string;
  billToAddressLine2: string;
  billToCity: string;
  billToCountry: string;
  billToState: string;
  billToPostCode: string;
  shipToAddressLine1: string;
  shipToAddressLine2: string;
  shipToCity: string;
  shipToCountry: string;
  shipToState: string;
  shipToPostCode: string;
  shortcutDimension1Code: string;
  shortcutDimension2Code: string;
  currencyId: string;
  currencyCode: string;
  pricesIncludeTax: boolean;
  paymentTermsId: string;
  shipmentMethodId: string;
  salesperson: string;
  partialShipping: boolean;
  requestedDeliveryDate: string;
  discountAmount: number;
  discountAppliedBeforeTax: boolean;
  totalAmountExcludingTax: number;
  totalTaxAmount: number;
  totalAmountIncludingTax: number;
  fullyShipped: boolean;
  status: string;
  lastModifiedDateTime: string;
  phoneNumber: string;
  email: string;
}
interface SaleShipment {
  id: string;
  number: string;
  externalDocumentNumber: string;
  invoiceDate: string;
  postingDate: string;
  dueDate: string;
  customerPurchaseOrderReference: string;
  customerId: string;
  customerNumber: string;
  customerName: string;
  billToCustomerId: string;
  billToName: string;
  billToCustomerNumber: string;
  shipToName: string;
  shipToContact: string;
  sellToAddressLine1: string;
  sellToAddressLine2: string;
  sellToCity: string;
  sellToCountry: string;
  sellToState: string;
  sellToPostCode: string;
  billToAddressLine1: string;
  billToAddressLine2: string;
  billToCity: string;
  billToCountry: string;
  billToState: string;
  billToPostCode: string;
  shipToAddressLine1: string;
  shipToAddressLine2: string;
  shipToCity: string;
  shipToCountry: string;
  shipToState: string;
  shipToPostCode: string;
  currencyCode: string;
  orderNumber: string;
  paymentTermsCode: string;
  shipmentMethodCode: string;
  salesperson: string;
  pricesIncludeTax: boolean;
  lastModifiedDateTime: string;
  phoneNumber: string;
  email: string;
}
interface PurchaseOrder {
  id: string;
  number: string;
  orderDate: Date;
  postingDate: Date;
  dueDate: Date;
  vendorId: string;
  vendorNumber: string;
  vendorName: string;
  payToName: string;
  payToVendorId: string;
  payToVendorNumber: string;
  shipToName: string;
  shipToContact: string;
  buyFromAddressLine1: string;
  buyFromAddressLine2: string;
  buyFromCity: string;
  buyFromCountry: string;
  buyFromState: string;
  buyFromPostCode: string;
  payToAddressLine1: string;
  payToAddressLine2: string;
  payToCity: string;
  payToCountry: string;
  payToState: string;
  payToPostCode: string;
  shipToAddressLine1: string;
  shipToAddressLine2: string;
  shipToCity: string;
  shipToCountry: string;
  shipToState: string;
  shipToPostCode: string;
  shortcutDimension1Code: string;
  shortcutDimension2Code: string;
  currencyId: string;
  currencyCode: string;
  pricesIncludeTax: boolean;
  paymentTermsId: string;
  shipmentMethodId: string;
  purchaser: string;
  requestedReceiptDate: Date;
  discountAmount: number;
  discountAppliedBeforeTax: boolean;
  totalAmountExcludingTax: number;
  totalTaxAmount: number;
  totalAmountIncludingTax: number;
  fullyReceived: boolean;
  status: string;
  lastModifiedDateTime: Date;
}
interface PurchaseOrderLine {
  id: string;
  documentId: string;
  sequence: number;
  itemId: string;
  accountId: string;
  lineType: string;
  lineObjectNumber: string;
  description: string;
  unitOfMeasureId: string;
  unitOfMeasureCode: string;
  quantity: number;
  directUnitCost: number;
  discountAmount: number;
  discountPercent: number;
  discountAppliedBeforeTax: boolean;
  amountExcludingTax: number;
  taxCode: string;
  taxPercent: number;
  totalTaxAmount: number;
  amountIncludingTax: number;
  invoiceDiscountAllocation: number;
  netAmount: number;
  netTaxAmount: number;
  netAmountIncludingTax: number;
  expectedReceiptDate: Date;
  receivedQuantity: number;
  invoicedQuantity: number;
  invoiceQuantity: number;
  receiveQuantity: number;
  itemVariantId: string;
  locationId: string;
}
interface PurchaseReceiptLine {
  id: string;
  documentId: string;
  sequence: number;
  lineType: string;
  lineObjectNumber: string;
  description: string;
  unitOfMeasureCode: string;
  unitCost: number;
  quantity: number;
  discountPercent: number;
  taxPercent: number;
  expectedReceiptDate: Date;
}
interface Vendor {
  id: string;
  number: string;
  displayName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  website: string;
  taxRegistrationNumber: string;
  currencyId: string;
  currencyCode: string;
  irs1099Code: string;
  paymentTermsId: string;
  paymentMethodId: string;
  taxLiable: boolean;
  blocked: string;
  balance: number;
  lastModifiedDateTime: string;
}
interface PurchaseInvoice {
  id: string;
  number: string;
  invoiceDate: string;
  postingDate: string;
  dueDate: string;
  vendorInvoiceNumber: string;
  vendorId: string;
  vendorNumber: string;
  vendorName: string;
  payToName: string;
  payToContact: string;
  payToVendorId: string;
  payToVendorNumber: string;
  shipToName: string;
  shipToContact: string;
  buyFromAddressLine1: string;
  buyFromAddressLine2: string;
  buyFromCity: string;
  buyFromCountry: string;
  buyFromState: string;
  buyFromPostCode: string;
  payToAddressLine1: string;
  payToAddressLine2: string;
  payToCity: string;
  payToCountry: string;
  payToState: string;
  payToPostCode: string;
  shipToAddressLine1: string;
  shipToAddressLine2: string;
  shipToCity: string;
  shipToCountry: string;
  shipToState: string;
  shipToPostCode: string;
  currencyId: string;
  currencyCode: string;
  orderId: string;
  orderNumber: string;
  pricesIncludeTax: boolean;
  discountAmount: number;
  discountAppliedBeforeTax: boolean;
  totalAmountExcludingTax: number;
  totalTaxAmount: number;
  totalAmountIncludingTax: number;
  status: string;
  lastModifiedDateTime: string;
}
interface GeneralLedgerEntry {
  id: string;
  entryNumber: number;
  postingDate: string;
  documentNumber: string;
  documentType: string;
  accountId: string;
  accountNumber: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  additionalCurrencyDebitAmount: number;
  additionalCurrencyCreditAmount: number;
  lastModifiedDateTime: string;
}
interface ItemLedgerEntry {
  id: string;
  entryNumber: number;
  itemNumber: string;
  postingDate: string;
  entryType: string;
  sourceNumber: string;
  sourceType: string;
  documentNumber: string;
  documentType: string;
  description: string;
  quantity: number;
  salesAmountActual: number;
  costAmountActual: number;
  lastModifiedDateTime: string;
}
//#endregion
//#region ../../packages/ms-utils/dist/interfaces/pagination.d.ts
interface ODataResponse<T = unknown> {
  value: T[];
  "@odata.nextLink"?: string;
  "@odata.context": string;
  nextLink?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-business-central";
  public: true;
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  documentationUrl: "https://prismatic.io/docs/components/ms-business-central/";
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
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
    listItemLedgerEntries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          entryNumber: number;
          itemNumber: string;
          postingDate: string;
          entryType: string;
          sourceNumber: string;
          sourceType: string;
          documentNumber: string;
          documentType: string;
          description: string;
          quantity: number;
          salesAmountActual: number;
          costAmountActual: number;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getItemLedgerEntry: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemLedgerEntryId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ItemLedgerEntry;
    }>;
    listGeneralLedgerEntries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          entryNumber: number;
          postingDate: string;
          documentNumber: string;
          documentType: string;
          accountId: string;
          accountNumber: string;
          description: string;
          debitAmount: number;
          creditAmount: number;
          additionalCurrencyDebitAmount: number;
          additionalCurrencyCreditAmount: number;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getGeneralLedgerEntry: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      generalLedgerEntryId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GeneralLedgerEntry;
    }>;
    createPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      invoiceDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      postingDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      vendorInvoiceNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      shipToContact: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      buyFromAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          buyFromAddressLine1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromAddressLine2: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          buyFromCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromState: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromPostCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      pricesIncludeTax: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      discountAmount: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseInvoice;
    }>;
    listPurchaseInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          number: string;
          invoiceDate: string;
          postingDate: string;
          dueDate: string;
          vendorInvoiceNumber: string;
          vendorId: string;
          vendorNumber: string;
          vendorName: string;
          payToName: string;
          payToContact: string;
          payToVendorId: string;
          payToVendorNumber: string;
          shipToName: string;
          shipToContact: string;
          buyFromAddressLine1: string;
          buyFromAddressLine2: string;
          buyFromCity: string;
          buyFromCountry: string;
          buyFromState: string;
          buyFromPostCode: string;
          payToAddressLine1: string;
          payToAddressLine2: string;
          payToCity: string;
          payToCountry: string;
          payToState: string;
          payToPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          currencyId: string;
          currencyCode: string;
          orderId: string;
          orderNumber: string;
          pricesIncludeTax: boolean;
          discountAmount: number;
          discountAppliedBeforeTax: boolean;
          totalAmountExcludingTax: number;
          totalTaxAmount: number;
          totalAmountIncludingTax: number;
          status: string;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseInvoice;
    }>;
    deletePurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    updatePurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      vendorNumber: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      invoiceDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      postingDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      dueDate: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      vendorInvoiceNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      shipToContact: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      buyFromAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          buyFromAddressLine1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromAddressLine2: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          buyFromCity: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromState: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromPostCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          buyFromCountry: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      pricesIncludeTax: {
        required: boolean;
        clean: (value: unknown) => boolean | undefined;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        comments: string;
      };
      discountAmount: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseInvoice;
    }>;
    postPurchaseInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseInvoiceId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          addressLine2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          phoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxLiable: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taxRegistrationNumber: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      irs1099Code: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      paymentTermsId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      paymentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      blocked: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Vendor;
    }>;
    listVendors: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          number: string;
          displayName: string;
          addressLine1: string;
          addressLine2: string;
          city: string;
          state: string;
          country: string;
          postalCode: string;
          phoneNumber: string;
          email: string;
          website: string;
          taxRegistrationNumber: string;
          currencyId: string;
          currencyCode: string;
          irs1099Code: string;
          paymentTermsId: string;
          paymentMethodId: string;
          taxLiable: boolean;
          blocked: string;
          balance: number;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Vendor;
    }>;
    deleteVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    updateVendor: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        type: "string";
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          addressLine1: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          addressLine2: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          country: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          postalCode: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          phoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          website: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      taxLiable: {
        required: boolean;
        clean: (value: unknown) => boolean | undefined;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        comments: string;
      };
      taxRegistrationNumber: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      irs1099Code: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      paymentTermsId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      paymentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      blocked: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Vendor;
    }>;
    getPurchaseReceiptLine: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseReceiptLineId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseReceiptLine;
    }>;
    listPurchaseReceiptLines: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          documentId: string;
          sequence: number;
          lineType: string;
          lineObjectNumber: string;
          description: string;
          unitOfMeasureCode: string;
          unitCost: number;
          quantity: number;
          discountPercent: number;
          taxPercent: number;
          expectedReceiptDate: Date;
        }[];
      };
    }>;
    getPurchaseReceipt: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseReceiptId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        number: string;
        invoiceDate: Date;
        postingDate: Date;
        dueDate: Date;
        vendorNumber: string;
        vendorName: string;
        payToName: string;
        payToContact: string;
        payToVendorNumber: string;
        shipToName: string;
        shipToContact: string;
        buyFromAddressLine1: string;
        buyFromAddressLine2: string;
        buyFromCity: string;
        buyFromCountry: string;
        buyFromState: string;
        buyFromPostCode: string;
        shipToAddressLine1: string;
        shipToAddressLine2: string;
        shipToCity: string;
        shipToCountry: string;
        shipToState: string;
        shipToPostCode: string;
        payToAddressLine1: string;
        payToAddressLine2: string;
        payToCity: string;
        payToCountry: string;
        payToState: string;
        payToPostCode: string;
        currencyCode: string;
        lastModifiedDateTime: Date;
      };
    }>;
    listPurchaseReceipts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          number: string;
          invoiceDate: Date;
          postingDate: Date;
          dueDate: Date;
          vendorNumber: string;
          vendorName: string;
          payToName: string;
          payToContact: string;
          payToVendorNumber: string;
          shipToName: string;
          shipToContact: string;
          buyFromAddressLine1: string;
          buyFromAddressLine2: string;
          buyFromCity: string;
          buyFromCountry: string;
          buyFromState: string;
          buyFromPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          payToAddressLine1: string;
          payToAddressLine2: string;
          payToCity: string;
          payToCountry: string;
          payToState: string;
          payToPostCode: string;
          currencyCode: string;
          lastModifiedDateTime: Date;
        }[];
      };
    }>;
    createPurchaseOrderLine: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      documentId: {
        label: string;
        required: true;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      itemId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      accountId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      lineType: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      lineObjectNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      quantity: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      directUnitCost: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrderLine;
    }>;
    deletePurchaseOrderLine: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderLineId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getPurchaseOrderLine: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderLineId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrderLine;
    }>;
    listPurchaseOrderLines: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderId: {
        label: string;
        required: true;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          documentId: string;
          sequence: number;
          itemId: string;
          accountId: string;
          lineType: string;
          lineObjectNumber: string;
          description: string;
          unitOfMeasureId: string;
          unitOfMeasureCode: string;
          quantity: number;
          directUnitCost: number;
          discountAmount: number;
          discountPercent: number;
          discountAppliedBeforeTax: boolean;
          amountExcludingTax: number;
          taxCode: string;
          taxPercent: number;
          totalTaxAmount: number;
          amountIncludingTax: number;
          invoiceDiscountAllocation: number;
          netAmount: number;
          netTaxAmount: number;
          netAmountIncludingTax: number;
          expectedReceiptDate: Date;
          receivedQuantity: number;
          invoicedQuantity: number;
          invoiceQuantity: number;
          receiveQuantity: number;
          itemVariantId: string;
          locationId: string;
        }[];
      };
    }>;
    updatePurchaseOrderLine: import("@prismatic-io/spectral").ActionDefinition<{
      documentId: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      accountId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      lineType: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      lineObjectNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      quantity: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      directUnitCost: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
      purchaseOrderLineId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrderLine;
    }>;
    createPurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      vendorNumber: {
        label: string;
        required: true;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      orderDate: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaser: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      discountAmount: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrder;
    }>;
    deletePurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getPurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrder;
    }>;
    listPurchaseOrders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          id: string;
          number: string;
          orderDate: Date;
          postingDate: Date;
          dueDate: Date;
          vendorId: string;
          vendorNumber: string;
          vendorName: string;
          payToName: string;
          payToVendorId: string;
          payToVendorNumber: string;
          shipToName: string;
          shipToContact: string;
          buyFromAddressLine1: string;
          buyFromAddressLine2: string;
          buyFromCity: string;
          buyFromCountry: string;
          buyFromState: string;
          buyFromPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          payToAddressLine1: string;
          payToAddressLine2: string;
          payToCity: string;
          payToCountry: string;
          payToState: string;
          payToPostCode: string;
          currencyId: string;
          currencyCode: string;
          pricesIncludeTax: boolean;
          paymentTermsId: string;
          shipmentMethodId: string;
          purchaser: string;
          requestedReceiptDate: Date;
          discountAmount: number;
          discountAppliedBeforeTax: boolean;
          totalAmountExcludingTax: number;
          totalTaxAmount: number;
          totalAmountIncludingTax: number;
          fullyReceived: boolean;
          status: string;
          lastModifiedDateTime: Date;
          shortcutDimension1Code: string;
          shortcutDimension2Code: string;
        }[];
      };
    }>;
    updatePurchaseOrder: import("@prismatic-io/spectral").ActionDefinition<{
      vendorNumber: {
        required: false;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      orderDate: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      payToVendorNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      purchaser: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      discountAmount: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
      purchaseOrderId: {
        comments: string;
        label: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PurchaseOrder;
    }>;
    createEventSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    deleteAllInstanceSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscriptionsRemoved: {
          subscriptionId: string;
          etag: string;
        }[];
      };
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showInstanceWebhooks: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateEventSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      etag: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationUrl: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      resource: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      billToCustomerId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sellToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        number: string;
        externalDocumentNumber: string;
        invoiceDate: string;
        postingDate: string;
        dueDate: string;
        customerPurchaseOrderReference: string;
        customerId: string;
        customerNumber: string;
        customerName: string;
        billToCustomerId: string;
        billToCustomerNumber: string;
        shipToName: string;
        shipToContact: string;
        sellToAddressLine1: string;
        sellToAddressLine2: string;
        sellToCity: string;
        sellToCountry: string;
        sellToState: string;
        sellToPostCode: string;
        shipToAddressLine1: string;
        shipToAddressLine2: string;
        shipToCity: string;
        shipToCountry: string;
        shipToState: string;
        shipToPostCode: string;
        currencyId: string;
        currencyCode: string;
        paymentTermsId: string;
        shipmentMethodId: string;
        salesperson: string;
        discountAmount: number;
        phoneNumber: string;
        email: string;
      };
    }>;
    updateSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesInvoiceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      customerId: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      customerNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      billToCustomerId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sellToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        number: string;
        externalDocumentNumber: string;
        invoiceDate: string;
        postingDate: string;
        dueDate: string;
        customerPurchaseOrderReference: string;
        customerId: string;
        customerNumber: string;
        customerName: string;
        billToCustomerId: string;
        billToCustomerNumber: string;
        shipToName: string;
        shipToContact: string;
        sellToAddressLine1: string;
        sellToAddressLine2: string;
        sellToCity: string;
        sellToCountry: string;
        sellToState: string;
        sellToPostCode: string;
        shipToAddressLine1: string;
        shipToAddressLine2: string;
        shipToCity: string;
        shipToCountry: string;
        shipToState: string;
        shipToPostCode: string;
        currencyId: string;
        currencyCode: string;
        paymentTermsId: string;
        shipmentMethodId: string;
        salesperson: string;
        discountAmount: number;
        phoneNumber: string;
        email: string;
      };
    }>;
    deleteSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesInvoiceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getSalesInvoice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesInvoiceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        number: string;
        externalDocumentNumber: string;
        invoiceDate: string;
        postingDate: string;
        dueDate: string;
        customerPurchaseOrderReference: string;
        customerId: string;
        customerNumber: string;
        customerName: string;
        billToCustomerId: string;
        billToCustomerNumber: string;
        shipToName: string;
        shipToContact: string;
        sellToAddressLine1: string;
        sellToAddressLine2: string;
        sellToCity: string;
        sellToCountry: string;
        sellToState: string;
        sellToPostCode: string;
        shipToAddressLine1: string;
        shipToAddressLine2: string;
        shipToCity: string;
        shipToCountry: string;
        shipToState: string;
        shipToPostCode: string;
        currencyId: string;
        currencyCode: string;
        paymentTermsId: string;
        shipmentMethodId: string;
        salesperson: string;
        discountAmount: number;
        phoneNumber: string;
        email: string;
      };
    }>;
    listSalesInvoices: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: {
        value: {
          id: string;
          number: string;
          externalDocumentNumber: string;
          invoiceDate: string;
          postingDate: string;
          dueDate: string;
          promisedPayDate: string;
          customerPurchaseOrderReference: string;
          customerId: string;
          customerNumber: string;
          customerName: string;
          billToName: string;
          billToCustomerId: string;
          billToCustomerNumber: string;
          shipToName: string;
          shipToContact: string;
          sellToAddressLine1: string;
          sellToAddressLine2: string;
          sellToCity: string;
          sellToCountry: string;
          sellToState: string;
          sellToPostCode: string;
          billToAddressLine1: string;
          billToAddressLine2: string;
          billToCity: string;
          billToCountry: string;
          billToState: string;
          billToPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          currencyId: string;
          shortcutDimension1Code: string;
          shortcutDimension2Code: string;
          currencyCode: string;
          orderId: string;
          orderNumber: string;
          paymentTermsId: string;
          shipmentMethodId: string;
          salesperson: string;
          disputeStatusId: string;
          disputeStatus: string;
          pricesIncludeTax: boolean;
          remainingAmount: number;
          discountAmount: number;
          discountAppliedBeforeTax: boolean;
          totalAmountExcludingTax: number;
          totalTaxAmount: number;
          totalAmountIncludingTax: number;
          status: string;
          lastModifiedDateTime: string;
          phoneNumber: string;
          email: string;
        }[];
      };
    }>;
    getSaleShipment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      saleShipmentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SaleShipment;
    }>;
    listSaleShipments: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: {
        "@odata.context": string;
        value: {
          id: string;
          number: string;
          externalDocumentNumber: string;
          invoiceDate: string;
          postingDate: string;
          dueDate: string;
          customerPurchaseOrderReference: string;
          customerId: string;
          customerNumber: string;
          customerName: string;
          billToCustomerId: string;
          billToName: string;
          billToCustomerNumber: string;
          shipToName: string;
          shipToContact: string;
          sellToAddressLine1: string;
          sellToAddressLine2: string;
          sellToCity: string;
          sellToCountry: string;
          sellToState: string;
          sellToPostCode: string;
          billToAddressLine1: string;
          billToAddressLine2: string;
          billToCity: string;
          billToCountry: string;
          billToState: string;
          billToPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          currencyCode: string;
          orderNumber: string;
          paymentTermsCode: string;
          shipmentMethodCode: string;
          salesperson: string;
          pricesIncludeTax: boolean;
          lastModifiedDateTime: string;
          phoneNumber: string;
          email: string;
        }[];
      };
    }>;
    listSalesOrders: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: {
        value: {
          id: string;
          number: string;
          externalDocumentNumber: string;
          orderDate: string;
          postingDate: string;
          customerId: string;
          customerNumber: string;
          customerName: string;
          billToName: string;
          billToCustomerId: string;
          billToCustomerNumber: string;
          shipToName: string;
          shipToContact: string;
          sellToAddressLine1: string;
          sellToAddressLine2: string;
          sellToCity: string;
          sellToCountry: string;
          sellToState: string;
          sellToPostCode: string;
          billToAddressLine1: string;
          billToAddressLine2: string;
          billToCity: string;
          billToCountry: string;
          billToState: string;
          billToPostCode: string;
          shipToAddressLine1: string;
          shipToAddressLine2: string;
          shipToCity: string;
          shipToCountry: string;
          shipToState: string;
          shipToPostCode: string;
          shortcutDimension1Code: string;
          shortcutDimension2Code: string;
          currencyId: string;
          currencyCode: string;
          pricesIncludeTax: boolean;
          paymentTermsId: string;
          shipmentMethodId: string;
          salesperson: string;
          partialShipping: boolean;
          requestedDeliveryDate: string;
          discountAmount: number;
          discountAppliedBeforeTax: boolean;
          totalAmountExcludingTax: number;
          totalTaxAmount: number;
          totalAmountIncludingTax: number;
          fullyShipped: boolean;
          status: string;
          lastModifiedDateTime: string;
          phoneNumber: string;
          email: string;
        }[];
      };
    }>;
    getSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SalesOrder;
    }>;
    createSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      billToCustomerId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sellToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SalesOrder;
    }>;
    updateSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      customerNumber: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      billToCustomerId: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToName: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sellToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      shipToAddressLine1: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      currencyCode: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        required: false;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SalesOrder;
    }>;
    deleteSalesOrder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesOrderId: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getSalesShipmentLines: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      salesShipmentLineId: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: SalesShipmentLine;
    }>;
    listSalesShipmentLines: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: {
        value: {
          id: string;
          documentId: string;
          documentNo: string;
          sequence: number;
          lineType: string;
          lineObjectNumber: string;
          description: string;
          description2: string;
          unitOfMeasureCode: string;
          unitPrice: number;
          quantity: number;
          discountPercent: number;
          taxPercent: number;
          shipmentDate: string;
        }[];
      };
    }>;
    createItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      number: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Item;
    }>;
    deleteItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Item;
    }>;
    updateItem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      itemId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        type: "string";
      };
      type: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      itemCategoryId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      itemCategoryCode: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      blocked: {
        label: string;
        comments: string;
        required: false;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        type: "string";
        clean: (value: unknown) => boolean | undefined;
      };
      gtin: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      unitPrice: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => number | undefined;
      };
      unitCost: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => number | undefined;
      };
      priceIncludesTax: {
        label: string;
        comments: string;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        type: "string";
        clean: (value: unknown) => boolean | undefined;
      };
      taxGroupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      taxGroupCode: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      baseUnitOfMeasureCode: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      baseUnitOfMeasureId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Item;
    }>;
    listItems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      odataQueryParams: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ODataResponse<unknown>;
    }>;
    getShipmentMethod: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ShipmentMethod;
    }>;
    createShipmentMethod: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentCode: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ShipmentMethod;
    }>;
    updateShipmentMethod: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      shipmentCode: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ShipmentMethod;
    }>;
    deleteShipmentMethod: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    createAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentType: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: "Journal" | "Sales Order" | "Sales Quote" | "Sales Credit" | "Sales Credit Memo" | "Sales Invoice" | "Purchase Invoice";
          value: "Journal" | "Sales Order" | "Sales Quote" | "Sales Credit" | "Sales Credit Memo" | "Sales Invoice" | "Purchase Invoice";
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Attachment;
    }>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentType: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: "Journal" | "Sales Order" | "Sales Quote" | "Sales Credit" | "Sales Credit Memo" | "Sales Invoice" | "Purchase Invoice";
          value: "Journal" | "Sales Order" | "Sales Quote" | "Sales Credit" | "Sales Credit Memo" | "Sales Invoice" | "Purchase Invoice";
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        "@odata.context": string;
        value: {
          id: string;
          parentId: string;
          fileName: string;
          byteSize: number;
          lastModifiedDateTime: string;
          parentType: string;
        }[];
      };
    }>;
    updateAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentContent: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    createCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      displayName: {
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addressLine1: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      addressLine2: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      state: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      country: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      postalCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phoneNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      website: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      taxLiable: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      taxAreaId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taxRegistrationNumber: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      currencyId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      currencyCode: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentTermsId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      shipmentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      paymentMethodId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blocked: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Customer;
    }>;
    listCustomers: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: {
        value: {
          id: string;
          number: string;
          displayName: string;
          type: string;
          addressLine1: string;
          addressLine2: string;
          city: string;
          state: string;
          country: string;
          postalCode: string;
          phoneNumber: string;
          email: string;
          website: string;
          salespersonCode: string;
          balanceDue: number;
          creditLimit: number;
          taxLiable: boolean;
          taxAreaId: string;
          taxAreaDisplayName: string;
          taxRegistrationNumber: string;
          currencyId: string;
          currencyCode: string;
          paymentTermsId: string;
          shipmentMethodId: string;
          paymentMethodId: string;
          blocked: string;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Customer;
    }>;
    deleteCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    updateCustomer: import("@prismatic-io/spectral").ActionDefinition<{
      taxLiable: {
        required: false;
        clean: (value: unknown) => boolean | undefined;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        label: string;
        comments: string;
      };
      displayName: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        example: string;
        comments: string;
        placeholder: string;
        type: "string";
      };
      customerType: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        comments: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
      };
      addressLine1: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      addressLine2: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      city: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      state: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      country: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      postalCode: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      phoneNumber: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      website: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      taxAreaId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      taxRegistrationNumber: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
      };
      currencyId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      currencyCode: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      paymentTermsId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      shipmentMethodId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      paymentMethodId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      blocked: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customerId: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Customer;
    }>;
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
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
      data: {
        "@odata.context": string;
        value: {
          id: string;
          number: string;
          displayName: string;
          category: string;
          subCategory: string;
          blocked: boolean;
          accountType: string;
          directPosting: boolean;
          netChange: number;
          consolidationTranslationMethod: string;
          consolidationDebitAccount: string;
          consolidationCreditAccount: string;
          excludeFromConsolidation: boolean;
          lastModifiedDateTime: string;
        }[];
      };
    }>;
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
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
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Account;
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      data: {
        "@odata.context": string;
        value: {
          id: string;
          systemVersion: string;
          timestamp: number;
          name: string;
          displayName: string;
          businessProfileId: string;
          systemCreatedAt: string;
          systemCreatedBy: string;
          systemModifiedAt: string;
          systemModifiedBy: string;
        }[];
      };
    }>;
    getCompanyInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
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
      data: {
        displayName: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        phoneNumber: string;
        faxNumber: string;
        email: string;
        website: string;
        taxRegistrationNumber: string;
        currencyCode: string;
        currentFiscalYearStartDate: string;
      };
    }>;
    updateCompanyInformation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      companyInformationId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      companyDisplayName: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      address: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          companyAddressLine1: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyAddressLine2: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyCity: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyState: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyCountry: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyPostalCode: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          companyEmail: {
            label: string;
            example: string;
            placeholder: string;
            comments: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyPhoneNumber: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyFaxNumber: {
            label: string;
            example: string;
            comments: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          companyWebsite: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      companyTaxRegistrationNumber: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      companyCurrencyCode: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      companyCurrentFiscalYearStartDate: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
      companyIndustry: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        required: false;
        type: "string";
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        displayName: string;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        phoneNumber: string;
        faxNumber: string;
        email: string;
        website: string;
        taxRegistrationNumber: string;
        currencyCode: string;
        currentFiscalYearStartDate: string;
        industry: string;
      };
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
      resource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: import("@prismatic-io/spectral").HttpResponse;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    webhookReceiver: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      additionalFilter: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
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
  dataSources: {
    listCompanies: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listCustomers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listItems: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSalesInvoices: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSalesOrders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSalesShipment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAccount: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGeneralLedgerEntry: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectItemLedgerEntry: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseInvoice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseOrder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseOrderLine: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      purchaseOrderId: {
        dataSource: undefined;
        label: string;
        required: true;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseReceipt: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPurchaseReceiptLine: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSalesShipmentLine: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectVendor: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "businessCentralOauth2";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      webApiUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        placeholder: string;
      };
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
        required: false;
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
    };
  }, "businessCentralOauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "businessCentralClientCredentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      webApiUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
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
    };
  }, "businessCentralClientCredentials">)[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;