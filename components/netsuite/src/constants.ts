export const RECORDS_PAGE_SIZE = 1000;

export const DEFAULT_BATCH_SIZE = 50;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const ACCOUNT_REGEX = /https:\/\/(.*)\.suitetalk\.api\.netsuite\.com\//;

export const EXTERNAL_ID_PREFIX = "eid:";

export const LOCATION_RECORD_PATTERN =
  /\/services\/rest\/record\/v1\/(\w+)\/([^/?#]+)/;

export const CUSTOM_RECORD_TYPE_PATTERN =
  /^custom(record|transaction)[a-z0-9_]+$/i;

export const ecCurveAlgorithms: Record<string, "ES256" | "ES384" | "ES512"> = {
  prime256v1: "ES256",
  secp384r1: "ES384",
  secp521r1: "ES512",
};

export const TOKEN_PATH = "/services/rest/auth/oauth2/v1/token";

export const DEFAULT_SCOPES = "rest_webservices";

export const JWT_ASSERTION_LIFETIME_SECONDS = 300;

export const ACCESS_TOKEN_LIFETIME_SECONDS = 3600;

export const ACCESS_TOKEN_REFRESH_MARGIN_MS = 60 * 1000;

export const UNAUTHORIZED_STATUS = 401;

export const RATE_LIMIT_STATUS = 429;
export const MAX_RETRIES = 3;
export const RETRY_BASE_DELAY_MS = 1000;
export const RETRY_MAX_JITTER_MS = 500;

export const recordTypes = [
  "account",
  "accountingPeriod",
  "advIntercompanyJournalEntry",
  "assemblyBuild",
  "assemblyItem",
  "assemblyUnbuild",
  "billingAccount",
  "billingRevenueEvent",
  "billingSchedule",
  "bin",
  "binTransfer",
  "blanketPurchaseOrder",
  "bom",
  "bomRevision",
  "calendarEvent",
  "campaign",
  "campaignResponse",
  "cashRefund",
  "cashSale",
  "charge",
  "check",
  "classification",
  "commerceCategory",
  "competitor",
  "consolidatedExchangeRate",
  "contact",
  "contactCategory",
  "contactRole",
  "costCategory",
  "couponCode",
  "creditCardCharge",
  "creditCardRefund",
  "creditMemo",
  "currency",
  "currencyRate",
  "customer",
  "customerCategory",
  "customerDeposit",
  "customerMessage",
  "customerPayment",
  "customerRefund",
  "customerStatus",
  "customerSubsidiaryRelationship",
  "department",
  "deposit",
  "depositApplication",
  "descriptionItem",
  "discountItem",
  "downloadItem",
  "emailTemplate",
  "employee",
  "estimate",
  "expenseCategory",
  "expenseReport",
  "fairValuePrice",
  "fulfillmentRequest",
  "giftCertificateItem",
  "inboundShipment",
  "intercompanyJournalEntry",
  "intercompanyTransferOrder",
  "inventoryAdjustment",
  "inventoryCostRevaluation",
  "inventoryCount",
  "inventoryItem",
  "inventoryNumber",
  "inventoryTransfer",
  "invoice",
  "issue",
  "itemFulfillment",
  "itemGroup",
  "itemReceipt",
  "itemRevision",
  "job",
  "jobStatus",
  "jobType",
  "journalEntry",
  "kitItem",
  "location",
  "manufacturingCostTemplate",
  "manufacturingOperationTask",
  "manufacturingRouting",
  "markupItem",
  "message",
  "nexus",
  "nonInventoryPurchaseItem",
  "nonInventoryResaleItem",
  "nonInventorySaleItem",
  "noteType",
  "opportunity",
  "otherChargePurchaseItem",
  "otherChargeResaleItem",
  "otherChargeSaleItem",
  "otherName",
  "otherNameCategory",
  "partner",
  "paycheck",
  "paymentItem",
  "paymentMethod",
  "phoneCall",
  "priceBook",
  "priceLevel",
  "pricePlan",
  "pricingGroup",
  "projectTask",
  "promotionCode",
  "purchaseContract",
  "purchaseOrder",
  "purchaseRequisition",
  "resourceGroup",
  "returnAuthorization",
  "revRecSchedule",
  "revRecTemplate",
  "salesOrder",
  "salesRole",
  "salesTaxItem",
  "servicePurchaseItem",
  "serviceResaleItem",
  "serviceSaleItem",
  "shipItem",
  "statisticalJournalEntry",
  "subscription",
  "subscriptionChangeOrder",
  "subscriptionLine",
  "subscriptionPlan",
  "subscriptionTerm",
  "subsidiary",
  "subtotalItem",
  "supportCase",
  "task",
  "taxType",
  "term",
  "timeBill",
  "timeSheet",
  "topic",
  "transferOrder",
  "unitsType",
  "usage",
  "vendor",
  "vendorBill",
  "vendorCategory",
  "vendorCredit",
  "vendorPayment",
  "vendorPrepayment",
  "vendorPrepaymentApplication",
  "vendorReturnAuthorization",
  "vendorSubsidiaryRelationship",
  "webSite",
  "workOrder",
  "workOrderClose",
  "workOrderCompletion",
  "workOrderIssue",
] as const;

export const RECORD_SERVICE = "record" as const;

export const QUERY_SERVICE = "query" as const;

export const SUITEQL_PATH = "/suiteql";
