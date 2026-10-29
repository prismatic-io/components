import accounts from "./accounts";
import attachments from "./attachments";
import companies from "./companies";
import customers from "./customers";
import generalLedgerEntries from "./generalLedgerEntries";
import itemLedgerEntries from "./itemLedgerEntries";
import items from "./items";
import misc from "./misc";
import purchaseInvoices from "./purchaseInvoices";
import purchaseOrderLines from "./purchaseOrderLines";
import purchaseOrders from "./purchaseOrders";
import purchaseReceiptLines from "./purchaseReceiptLines";
import purchaseReceipts from "./purchaseReceipts";
import salesInvoices from "./salesInvoices";
import salesOrders from "./salesOrders";
import salesShipmentLines from "./salesShipmentLines";
import salesShipments from "./salesShipments";
import shipmentMethods from "./shipmentMethods";
import subscriptions from "./subscriptions";
import vendors from "./vendors";

export default {
  ...companies,
  ...accounts,
  ...customers,
  ...attachments,
  ...shipmentMethods,
  ...items,
  ...salesShipmentLines,
  ...salesOrders,
  ...salesShipments,
  ...salesInvoices,
  ...subscriptions,
  ...purchaseOrders,
  ...purchaseOrderLines,
  ...purchaseReceipts,
  ...purchaseReceiptLines,
  ...vendors,
  ...purchaseInvoices,
  ...generalLedgerEntries,
  ...itemLedgerEntries,
  ...misc,
};
