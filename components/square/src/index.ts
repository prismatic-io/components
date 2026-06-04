import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  batchDeleteCatalogObjects,
  batchRetrieveCatalogObjects,
  batchUpsertCatalogObjects,
  deleteCatalogObject,
  listCatalog,
  retrieveCatalogObject,
  searchCatalogItems,
  searchCatalogObjects,
  upsertCatalogObject,
} from "./actions/catalog";
import {
  createCustomer,
  deleteCustomer,
  listCustomers,
  retrieveCustomer,
  searchCustomers,
  updateCustomer,
} from "./actions/customers";
import { batchChangeInventory, batchRetrieveInventoryCounts } from "./actions/inventory";
import {
  cancelInvoice,
  deleteInvoice,
  getInvoice,
  listInvoices,
  publishInvoice,
  searchInvoices,
  updateInvoice,
} from "./actions/invoices";
import * as jobs from "./actions/jobs";
import { listLocations, retrieveLocation, updateLocation } from "./actions/locations";
import { rawRequest } from "./actions/misc";
import {
  batchRetrieveOrders,
  cloneOrder,
  createOrder,
  retrieveOrder,
  searchOrders,
  updateOrder,
} from "./actions/orders";
import {
  cancelPayment,
  completePayment,
  createPayment,
  getPayment,
  getPaymentRefund,
  listPaymentRefunds,
  listPayments,
  refundPayment,
  updatePayment,
} from "./actions/payments";
import {
  createTeamMember,
  retrieveTeamMember,
  searchTeamMembers,
  updateTeamMember,
} from "./actions/teamMembers";
import {
  createWebhookSubscription,
  deleteInstanceWebhooks,
  deleteWebhookSubscription,
  listWebhookSubscriptions,
  retrieveWebhookSubscription,
  updateWebhookSubscription,
} from "./actions/webhooks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "square",
  documentationUrl: "https://prismatic.io/docs/components/square/",
  public: true,
  display: {
    label: "Square",
    description: "Manage payments, customers, orders, invoices, and team members in Square.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions: {
    listCustomers,
    retrieveCustomer,
    updateCustomer,
    createCustomer,
    searchCustomers,
    deleteCustomer,
    createTeamMember,
    searchTeamMembers,
    retrieveTeamMember,
    updateTeamMember,
    listLocations,
    retrieveLocation,
    updateLocation,
    rawRequest,
    listInvoices,
    searchInvoices,
    getInvoice,
    updateInvoice,
    publishInvoice,
    cancelInvoice,
    deleteInvoice,
    searchOrders,
    retrieveOrder,
    batchRetrieveOrders,
    createOrder,
    updateOrder,
    cloneOrder,
    listCatalog,
    searchCatalogItems,
    searchCatalogObjects,
    batchRetrieveCatalogObjects,
    upsertCatalogObject,
    batchUpsertCatalogObjects,
    retrieveCatalogObject,
    deleteCatalogObject,
    batchDeleteCatalogObjects,
    batchChangeInventory,
    batchRetrieveInventoryCounts,
    listPayments,
    getPayment,
    updatePayment,
    createPayment,
    completePayment,
    cancelPayment,
    refundPayment,
    getPaymentRefund,
    listPaymentRefunds,
    listWebhookSubscriptions,
    retrieveWebhookSubscription,
    createWebhookSubscription,
    updateWebhookSubscription,
    deleteWebhookSubscription,
    deleteInstanceWebhooks,
    createJob: jobs.createJob,
    listJobs: jobs.listJobs,
    retrieveJob: jobs.retrieveJob,
    updateJob: jobs.updateJob,
  },
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
