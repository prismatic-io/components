import { type SalesDetails } from "./SalesDetails";

export interface Item {
  ItemID: string;
  Code: string;
  Description: string;
  UpdatedDateUTC: string;
  PurchaseDetails: Record<string, unknown>;
  SalesDetails: SalesDetails;
  Name: string;
  IsTrackedAsInventory: boolean;
  IsSold: boolean;
  IsPurchased: boolean;
}
