import { component } from "@prismatic-io/spectral";
import { listContacts } from "./actions/contacts/listContacts";
import { listConnections } from "./actions/listApiConnections";
import { getContact } from "./actions/contacts/getContact";
import { archiveContact } from "./actions/contacts/archiveContact";
import { deleteAccount } from "./actions/accounts/deleteAccount";
import { getAccount } from "./actions/accounts/getAccount";
import { listAccounts } from "./actions/accounts/listAccounts";
import { deleteInvoice } from "./actions/invoices/deleteInvoice";
import { getInvoice } from "./actions/invoices/getInvoice";
import { listInvoices } from "./actions/invoices/listInvoices";
import { getItem } from "./actions/items/getItem";
import { deleteItem } from "./actions/items/deleteItem";
import { listItems } from "./actions/items/listItems";
import { createContact } from "./actions/contacts/createContact";
import { getContactHistory } from "./actions/contacts/getContactHistory";
import { updateContact } from "./actions/contacts/updateContact";
import { createItem } from "./actions/items/createItem";
import { createInvoice } from "./actions/invoices/createInvoice";
import { getItemHistory } from "./actions/items/getItemHistory";
import { addNoteToItem } from "./actions/items/addNoteToItem";
import { sendInvoice } from "./actions/invoices/sendInvoice";
import { voidInvoice } from "./actions/invoices/voidInvoice";
import { addNoteToInvoice } from "./actions/invoices/addNoteToInvoice";
import { createAccount } from "./actions/accounts/createAccount";
import { createAttachment } from "./actions/attachments/createAttachment";
import { getAttachment } from "./actions/attachments/getAttachment";
import { getPayment } from "./actions/payments/getPayment";
import { getPaymentHistory } from "./actions/payments/getPaymentHistory";
import { listPayments } from "./actions/payments/listPayments";
import { payInvoice } from "./actions/payments/payInvoice";
import { reversePayment } from "./actions/payments/reversePayment";
import { archiveAccount } from "./actions/accounts/archiveAccount";
import { updateAccount } from "./actions/accounts/updateAccount";
import { updateItem } from "./actions/items/updateItem";
import connections from "./connections";
import triggers from "./triggers";
import rawRequest from "./actions/rawRequest";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import dataSources from "./dataSources";

export default component({
  key: "xero",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/xero/",
  display: {
    label: "Xero",
    category: "Application Connectors",
    description:
      "Manage invoices, items, accounts, payments and more objects from your Xero account.",
    iconPath: "icon.png",
  },
  actions: {
    listContacts,
    listConnections,
    getContact,
    archiveContact,
    deleteAccount,
    listAccounts,
    getInvoice,
    getItem,
    deleteInvoice,
    listInvoices,
    deleteItem,
    listItems,
    createContact,
    getContactHistory,
    updateContact,
    createItem,
    getItemHistory,
    addNoteToItem,
    createInvoice,
    sendInvoice,
    voidInvoice,
    addNoteToInvoice,
    createAccount,
    createAttachment,
    getAttachment,
    getPayment,
    getPaymentHistory,
    listPayments,
    payInvoice,
    reversePayment,
    getAccount,
    archiveAccount,
    updateAccount,
    updateItem,
    rawRequest,
  },
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
