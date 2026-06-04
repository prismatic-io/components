import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  createLedgerAccount,
  getLedgerAccount,
  listLedgerAccounts,
  listLedgerAccountTypes,
  updateLedgerAccount,
} from "./actions/accounts";
import {
  createContact,
  deleteContact,
  deleteContactPerson,
  getContact,
  getContactPerson,
  listContactPeople,
  listContacts,
  listContactTypes,
  updateContact,
} from "./actions/contacts";
import { listAddressTypes, listCountries, listCurrencies } from "./actions/generic";
import {
  createPurchaseInvoice,
  deletePurchaseInvoice,
  getPurchaseInvoice,
  listPurchaseInvoice,
  updatePurchaseInvoice,
} from "./actions/purchaseTransactions";
import { rawRequest } from "./actions/rawRequest";
import {
  createSalesInvoice,
  deleteSalesInvoice,
  getSalesInvoice,
  listSalesInvoices,
  updateSalesInvoice,
} from "./actions/salesTransactions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "sage",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/sage/",
  display: {
    label: "Sage Accounting",
    description: "Manage contacts and others connected to your Sage account.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  actions: {
    createContact,
    listContacts,
    deleteContact,
    deleteContactPerson,
    getContact,
    getContactPerson,
    listContactPeople,
    listContactTypes,
    createSalesInvoice,
    getSalesInvoice,
    listSalesInvoices,
    deleteSalesInvoice,
    updateSalesInvoice,
    deletePurchaseInvoice,
    getPurchaseInvoice,
    listPurchaseInvoice,
    createPurchaseInvoice,
    updatePurchaseInvoice,
    getLedgerAccount,
    listLedgerAccounts,
    createLedgerAccount,
    listCountries,
    listAddressTypes,
    listCurrencies,
    updateContact,
    listLedgerAccountTypes,
    updateLedgerAccount,
    rawRequest,
  },
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
