import type { CloudEventsWebhook, LegacyWebhook } from "./types";

export const UPDATE_REQUEST_BODY_EXAMPLE = {
  SyncToken: "1",
  domain: "QBO",
  AttachableRef: [
    {
      IncludeOnSend: false,
      EntityRef: {
        type: "Invoice",
        value: "95",
      },
    },
  ],
  Note: "This is an updated attached note.",
  sparse: false,
  Id: "5000000000000010341",
  MetaData: {
    CreateTime: "2015-11-17T11:05:15-08:00",
    LastUpdatedTime: "2015-11-17T11:05:15-08:00",
  },
};

export const BATCH_REQUEST_BODY_EXAMPLE = [
  {
    bId: "bid1",
    Vendor: {
      DisplayName: "Smith Family Store",
    },
    operation: "create",
  },
  {
    bId: "bid2",
    operation: "delete",
    Invoice: {
      SyncToken: "0",
      Id: "129",
    },
  },
  {
    SalesReceipt: {
      PrivateNote: "A private note.",
      SyncToken: "0",
      domain: "QBO",
      Id: "11",
      sparse: true,
    },
    bId: "bid3",
    operation: "update",
  },
  {
    Query: "select * from SalesReceipt where TotalAmt > '300.00'",
    bId: "bid4",
  },
];

export const MAX_RESULTS = 1000;




export const POLL_RESOURCE_CONFIG: Record<
  string,
  { entity: string; label: string }
> = {
  customer: { entity: "Customer", label: "Customers" },
  vendor: { entity: "Vendor", label: "Vendors" },
  item: { entity: "Item", label: "Items" },
  invoice: { entity: "Invoice", label: "Invoices" },
  bill: { entity: "Bill", label: "Bills" },
  payment: { entity: "Payment", label: "Payments" },
  purchaseOrder: { entity: "PurchaseOrder", label: "Purchase Orders" },
  estimate: { entity: "Estimate", label: "Estimates" },
  journalEntry: { entity: "JournalEntry", label: "Journal Entries" },
  account: { entity: "Account", label: "Accounts" },
};

export const WEBHOOK_TRIGGER_EXAMPLE_PAYLOAD = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: {} },
    pathFragment: "",
    executionId: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    customer: { id: "", externalId: "", name: "" },
    instance: { id: "", name: "" },
    user: { email: "", externalId: "", name: "", id: "" },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: { name: "", id: "" },
    startedAt: "",
    globalDebug: false,
    body: {
      data: {
        format: "cloudevents",
        eventCount: 2,
        events: [
          {
            id: "unique-event-id-123",
            entityId: "1",
            accountId: "123456789",
            entity: "customer",
            operation: "create",
            eventType: "com.intuit.quickbooks.customer.create",
            timestamp: "2025-11-14T10:00:00Z",
            source: "https://developer.api.intuit.com",
            specversion: "1.0",
          },
          {
            id: "unique-event-id-456",
            entityId: "2",
            accountId: "123456789",
            entity: "invoice",
            operation: "update",
            eventType: "com.intuit.quickbooks.invoice.update",
            timestamp: "2025-11-14T10:05:00Z",
            source: "https://developer.api.intuit.com",
            specversion: "1.0",
          },
        ],
        event: {
          id: "unique-event-id-123",
          entityId: "1",
          accountId: "123456789",
          entity: "customer",
          operation: "create",
          eventType: "com.intuit.quickbooks.customer.create",
          timestamp: "2025-11-14T10:00:00Z",
          source: "https://developer.api.intuit.com",
          specversion: "1.0",
        },
        entityId: "1",
        accountId: "123456789",
        entity: "customer",
        operation: "create",
        eventType: "com.intuit.quickbooks.customer.create",
        timestamp: "2025-11-14T10:00:00Z",
      },
    },
  },
};

export const CLOUDEVENTS_EXAMPLE_PAYLOAD: CloudEventsWebhook = [
  {
    specversion: "1.0",
    id: "unique-event-id-123",
    source: "https://developer.api.intuit.com",
    type: "com.intuit.quickbooks.customer.create",
    time: "2025-11-14T10:00:00Z",
    intuitentityid: "1",
    intuitaccountid: "123456789",
  },
  {
    specversion: "1.0",
    id: "unique-event-id-456",
    source: "https://developer.api.intuit.com",
    type: "com.intuit.quickbooks.invoice.update",
    time: "2025-11-14T10:05:00Z",
    intuitentityid: "2",
    intuitaccountid: "123456789",
  },
];

export const LEGACY_EXAMPLE_PAYLOAD: LegacyWebhook = {
  eventNotifications: [
    {
      realmId: "123456789",
      dataChangeEvent: {
        entities: [
          {
            name: "Customer",
            id: "1",
            operation: "Create",
            lastUpdated: "2025-11-14T10:00:00Z",
          },
          {
            name: "Invoice",
            id: "2",
            operation: "Update",
            lastUpdated: "2025-11-14T10:05:00Z",
          },
        ],
      },
    },
  ],
};
