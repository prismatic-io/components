





export const listWebhooksExamplePayload = {
  data: {
    webhooks: [
      {
        IsLabelAPIHook: false,
        WebHookID: 123,
        SellerID: 100000,
        StoreID: 12345,
        HookType: "ITEM_ORDER_NOTIFY",
        MessageFormat: "Json",
        Url: "http://example.endpoint/orders",
        Name: "My Order Webhook",
        BulkCopyBatchID: null,
        BulkCopyRecordID: null,
        Active: true,
        WebhookLogs: [],
        Seller: null,
        Store: null,
      },
      {
        IsLabelAPIHook: false,
        WebHookID: 456,
        SellerID: 100000,
        StoreID: 98765,
        HookType: "SHIP_NOTIFY",
        MessageFormat: "Json",
        Url: "https://example.endpoint/shipment",
        Name: "My Shipment Webhook",
        BulkCopyBatchID: null,
        BulkCopyRecordID: null,
        Active: true,
        WebhookLogs: [],
        Seller: null,
        Store: null,
      },
    ],
  },
};







export const subscribeToWebhookExamplePayload = {
  data: {
    id: 123456,
  },
};









export const unsubscribeToWebhookExamplePayload = {
  data: null,
};






export const deleteInstancedWebhooksExamplePayload = {
  data: "Webhooks deleted successfully.",
};
