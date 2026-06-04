export const UNKOWN_CONNECTION_ERROR = `Invalid connection key provided.`;
export const DEFAULT_DELETE_RESPONSE = `DELETED SUCCESSFULLY`;
export const DEFAULT_UPDATE_RESPONSE = `UPDATED SUCCESSFULLY`;
export const ITEM_TYPES = ["itItems", "itLabor", "itTravel", "itFixedAssets"];
export const BUSINESS_PARTNER_TYPES = ["cCustomer", "cSupplier", "cLid"];
export const INVALID_SERVER_ADDRESS =
  "Invalid Server Address, Must be like: https://<Server Name/IP>:<Port>. Server address is required for NON-ONPREM connections.";
export enum API_VERSION {
  V1 = "v1",
  V2 = "v2",
}





export const POLL_RESOURCE_CONFIG: Record<
  string,
  {
    endpoint: string;
    label: string;
    createdField: string;
    updatedField: string;
  }
> = {
  BusinessPartners: {
    endpoint: "BusinessPartners",
    label: "Business Partners",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  Items: {
    endpoint: "Items",
    label: "Items",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  Orders: {
    endpoint: "Orders",
    label: "Orders",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  Invoices: {
    endpoint: "Invoices",
    label: "Invoices",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  PurchaseOrders: {
    endpoint: "PurchaseOrders",
    label: "Purchase Orders",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  Warehouses: {
    endpoint: "Warehouses",
    label: "Warehouses",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
  PriceLists: {
    endpoint: "PriceLists",
    label: "Price Lists",
    createdField: "CreateDate",
    updatedField: "UpdateDate",
  },
};
