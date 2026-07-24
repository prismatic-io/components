import type { content_v2_1 } from "googleapis";
export interface FetchAllOptions {
  client: content_v2_1.Content;
  merchantId: string;
  fetchAll: boolean;
  apiMethod: string;
  params: Record<string, unknown>;
}
export interface FetchAllAccountsOptions {
  client: content_v2_1.Content;
  fetchAll: boolean;
  params?: content_v2_1.Params$Resource$Accounts$List;
}
export interface FetchAllOrdersOptions {
  client: content_v2_1.Content;
  fetchAll: boolean;
  params?: content_v2_1.Params$Resource$Orders$List;
}
export interface FetchAllOrderReturnsOptions {
  client: content_v2_1.Content;
  fetchAll: boolean;
  params?: content_v2_1.Params$Resource$Orderreturns$List;
}
export interface FetchAllProductsOptions {
  client: content_v2_1.Content;
  fetchAll: boolean;
  params?: content_v2_1.Params$Resource$Products$List;
}
export type BulkResult<O> =
  | {
      success: true;
      result: O;
    }
  | {
      success: false;
      error: string;
    };
export interface Page<T> {
  items: T[];
  nextPageToken?: string;
}
export interface AccountSummary {
  accountId?: string;
  accountName?: string;
  name?: string;
}
export interface ProductSummary {
  offerId?: string;
  title?: string;
}
