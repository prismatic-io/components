import type { DataSourceResult } from "@prismatic-io/spectral";

const picklistResult: DataSourceResult<"picklist"> = {
  result: [
    { label: "Example 1", key: "example-1" },
    { label: "Example 2", key: "example-2" },
  ],
};

export const selectContactExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectContactTypeExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectContactPersonExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectLedgerAccountExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectLedgerAccountTypeExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectSalesInvoiceExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectPurchaseInvoiceExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectCountryExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectAddressTypeExamplePayload: DataSourceResult<"picklist"> = picklistResult;
export const selectCurrencyExamplePayload: DataSourceResult<"picklist"> = picklistResult;
