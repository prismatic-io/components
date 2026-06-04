export interface MultipleItemsResponse<T> {
  value: T;
  "@odata.nextLink": string;
  "@odata.context": string;
}

export interface Company {
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
}

export interface Account {
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

export interface Customer {
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

export interface CompanyInformation {
  id: string;
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
  "picture@odata.mediaReadLink": string;
  lastModifiedDateTime: string;
}

export interface Attachment {
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

export interface ShipmentMethod {
  id: string;
  code: string;
  displayName: string;
  lastModifiedDateTime: string;
}

export interface SalesShipmentLine {
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

export interface Item {
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
export interface SalesOrder {
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

export interface SaleShipment {
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

export interface SalesInvoice {
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
}

export interface PurchaseOrder {
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

export interface PurchaseOrderLine {
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

export interface PurchaseReceipt {
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
  orderNumber: string;
  lastModifiedDateTime: Date;
}

export interface PurchaseReceiptLine {
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

export interface Subscription {
  "@odata.context": string;
  value: {
    notificationUrl: string;
    subscriptionId: string;
    resource: string;
    etag: string;
    [key: string]: unknown;
  }[];
}

export interface Vendor {
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

export interface PurchaseInvoice {
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

export interface GeneralLedgerEntry {
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

export interface ItemLedgerEntry {
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

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface BusinessCentralRecord extends Record<string, unknown> {
  id?: string;
  lastModifiedDateTime?: string;
}
