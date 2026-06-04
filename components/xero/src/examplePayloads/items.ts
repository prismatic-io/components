const itemEnvelope = {
  Id: "bd90b45c-7b92-4e10-84e8-efef27090697",
  Status: "OK",
  ProviderName: "Acme Corp",
  DateTimeUTC: "/Date(1637616068092)/",
};

const sampleItem = {
  ItemID: "19b79d12-0ae1-496e-9649-cbd04b15c7c5",
  Code: "WIDGET-001",
  Description: "Standard blue widget for retail distribution",
  PurchaseDescription: "Blue widget - bulk purchase from supplier",
  UpdatedDateUTC: "/Date(1637614988203+0000)/",
  PurchaseDetails: {
    UnitPrice: 12.5,
    AccountCode: "400",
    TaxType: "INPUT",
  },
  SalesDetails: {
    UnitPrice: 29.95,
    AccountCode: "200",
    TaxType: "OUTPUT",
  },
  Name: "Blue Widget",
  IsTrackedAsInventory: true,
  IsSold: true,
  IsPurchased: true,
};

export const listItemsExamplePayload = {
  data: {
    ...itemEnvelope,
    Items: [sampleItem],
  },
};

export const getItemExamplePayload = {
  data: {
    ...itemEnvelope,
    Items: [sampleItem],
  },
};

export const createItemExamplePayload = {
  data: {
    ...itemEnvelope,
    Items: [sampleItem],
  },
};

export const updateItemExamplePayload = {
  data: {
    ...itemEnvelope,
    Items: [sampleItem],
  },
};

export const deleteItemExamplePayload = {
  data: null,
};

export const getItemHistoryExamplePayload = {
  data: {
    ...itemEnvelope,
    HistoryRecords: [
      {
        Changes: "Updated",
        DateUTCString: "2021-11-22T15:42:11",
        DateUTC: "/Date(1637595731990+0000)/",
        User: "Jane Smith",
        Details: "Price updated from 25.00 to 29.95",
      },
      {
        Changes: "Created",
        DateUTCString: "2021-11-20T09:15:29",
        DateUTC: "/Date(1637399729297+0000)/",
        User: "Jane Smith",
        Details: "Item created via Xero API",
      },
    ],
  },
};

export const addNoteToItemExamplePayload = {
  data: {
    ...itemEnvelope,
    HistoryRecords: [
      {
        Changes: "Edited",
        DateUTCString: "2021-11-23T18:38:24",
        DateUTC: "/Date(1637692704697+0000)/",
        User: "System Generated",
        Details: "Inventory restocked to 500 units",
      },
    ],
  },
};
