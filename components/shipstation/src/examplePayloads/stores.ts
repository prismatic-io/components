





export const getStoreExamplePayload = {
  data: {
    storeId: 12345,
    storeName: "WooCommerce Store",
    marketplaceId: 36,
    marketplaceName: "WooCommerce",
    accountName: null,
    email: null,
    integrationUrl: "http://shipstation-test.wpengine.com",
    active: true,
    companyName: "",
    phone: "",
    publicEmail: "",
    website: "",
    refreshDate: "2014-12-16T17:47:05.457",
    lastRefreshAttempt: "2014-12-16T09:47:05.457",
    createDate: "2014-11-06T15:21:13.223",
    modifyDate: "2014-11-10T08:02:19.117",
    autoRefresh: true,
    statusMappings: [
      { orderStatus: "awaiting_payment", statusKey: "Pending" },
      { orderStatus: "awaiting_shipment", statusKey: "Processing" },
      { orderStatus: "shipped", statusKey: "Completed" },
      { orderStatus: "cancelled", statusKey: "Cancelled" },
      { orderStatus: "on_hold", statusKey: "On-hold" },
    ],
  },
};







export const updateStoreExamplePayload = getStoreExamplePayload;







export const listStoresExamplePayload = {
  data: [
    {
      storeId: 22766,
      storeName: "ShipStation Manual Store",
      marketplaceId: 0,
      marketplaceName: "ShipStation",
      accountName: null,
      email: null,
      integrationUrl: null,
      active: true,
      companyName: "",
      phone: "",
      publicEmail: "testemail@email.com",
      website: "",
      refreshDate: "2014-12-03T11:46:11.283",
      lastRefreshAttempt: "2014-12-03T11:46:53.433",
      createDate: "2014-07-25T11:05:55.307",
      modifyDate: "2014-11-12T08:45:20.55",
      autoRefresh: false,
    },
    {
      storeId: 25748,
      storeName: "Ashley's Test WooCommerce",
      marketplaceId: 36,
      marketplaceName: "WooCommerce",
      accountName: null,
      email: null,
      integrationUrl: "http://shipstation.wpengine.com/",
      active: true,
      companyName: "",
      phone: "",
      publicEmail: "",
      website: "",
      refreshDate: "2014-11-26T22:28:14.07",
      lastRefreshAttempt: "2014-11-26T14:28:14.07",
      createDate: "2014-11-10T08:53:48.077",
      modifyDate: "2014-12-03T14:53:50.557",
      autoRefresh: true,
    },
  ],
};







export const deactivateStoreExamplePayload = {
  data: {
    success: "true",
    message: "The requested store has been reactivated.",
  },
};
