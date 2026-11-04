//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "netsuite";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/netsuite/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      serviceType: {
        label: string;
        type: "string";
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
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
      data: {
        data: any;
        headers: Record<string, string>;
      };
    }>;
    suiteQLQuery: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      suiteQLInput: {
        label: string;
        type: "code";
        language: "plaintext";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limitInput: {
            label: string;
            type: "string";
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          offsetInput: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          offset: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      expandSubResources: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      simpleEnumFormat: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fields: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => unknown;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: any;
        headers: Record<string, string>;
      };
    }>;
    createRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      payload: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      payload: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => object;
        default: string;
      };
      replace: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => unknown;
      };
      replaceSelectedFields: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteRecord: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  dataSources: {
    selectRecord: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        comments: string;
      };
      recordField: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          offset: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSuiteQl: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "code";
        language: "plaintext";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
      };
      key: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      label: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => number;
          };
          offset: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauthClientCredentials";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        placeholder: string;
        default: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      keyId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        example: string;
        placeholder: string;
        comments: string;
      };
      privateKey: {
        label: string;
        type: "text";
        required: true;
        shown: true;
        placeholder: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        placeholder: string;
      };
    };
  }, "oauthClientCredentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        placeholder: string;
        default: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
        placeholder: string;
      };
    };
  }, "oauth">)[];
  triggers: {
    pollRecords: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      recordType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          label: string;
          value: "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
        }[];
        clean: (rawValue: unknown) => "account" | "accountingPeriod" | "advIntercompanyJournalEntry" | "assemblyBuild" | "assemblyItem" | "assemblyUnbuild" | "billingAccount" | "billingRevenueEvent" | "billingSchedule" | "bin" | "binTransfer" | "blanketPurchaseOrder" | "bom" | "bomRevision" | "calendarEvent" | "campaign" | "campaignResponse" | "cashRefund" | "cashSale" | "charge" | "check" | "classification" | "commerceCategory" | "competitor" | "consolidatedExchangeRate" | "contact" | "contactCategory" | "contactRole" | "costCategory" | "couponCode" | "creditCardCharge" | "creditCardRefund" | "creditMemo" | "currency" | "currencyRate" | "customer" | "customerCategory" | "customerDeposit" | "customerMessage" | "customerPayment" | "customerRefund" | "customerStatus" | "customerSubsidiaryRelationship" | "department" | "deposit" | "depositApplication" | "descriptionItem" | "discountItem" | "downloadItem" | "emailTemplate" | "employee" | "estimate" | "expenseCategory" | "expenseReport" | "fairValuePrice" | "fulfillmentRequest" | "giftCertificateItem" | "inboundShipment" | "intercompanyJournalEntry" | "intercompanyTransferOrder" | "inventoryAdjustment" | "inventoryCostRevaluation" | "inventoryCount" | "inventoryItem" | "inventoryNumber" | "inventoryTransfer" | "invoice" | "issue" | "itemFulfillment" | "itemGroup" | "itemReceipt" | "itemRevision" | "job" | "jobStatus" | "jobType" | "journalEntry" | "kitItem" | "location" | "manufacturingCostTemplate" | "manufacturingOperationTask" | "manufacturingRouting" | "markupItem" | "message" | "nexus" | "nonInventoryPurchaseItem" | "nonInventoryResaleItem" | "nonInventorySaleItem" | "noteType" | "opportunity" | "otherChargePurchaseItem" | "otherChargeResaleItem" | "otherChargeSaleItem" | "otherName" | "otherNameCategory" | "partner" | "paycheck" | "paymentItem" | "paymentMethod" | "phoneCall" | "priceBook" | "priceLevel" | "pricePlan" | "pricingGroup" | "projectTask" | "promotionCode" | "purchaseContract" | "purchaseOrder" | "purchaseRequisition" | "resourceGroup" | "returnAuthorization" | "revRecSchedule" | "revRecTemplate" | "salesOrder" | "salesRole" | "salesTaxItem" | "servicePurchaseItem" | "serviceResaleItem" | "serviceSaleItem" | "shipItem" | "statisticalJournalEntry" | "subscription" | "subscriptionChangeOrder" | "subscriptionLine" | "subscriptionPlan" | "subscriptionTerm" | "subsidiary" | "subtotalItem" | "supportCase" | "task" | "taxType" | "term" | "timeBill" | "timeSheet" | "topic" | "transferOrder" | "unitsType" | "usage" | "vendor" | "vendorBill" | "vendorCategory" | "vendorCredit" | "vendorPayment" | "vendorPrepayment" | "vendorPrepaymentApplication" | "vendorReturnAuthorization" | "vendorSubsidiaryRelationship" | "webSite" | "workOrder" | "workOrderClose" | "workOrderCompletion" | "workOrderIssue";
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
      additionalFilter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;