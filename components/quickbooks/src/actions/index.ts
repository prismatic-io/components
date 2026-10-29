import accountActions from "./account";
import attachmentActions from "./attachment";
import batchActions from "./batch";
import customerActions from "./customer";
import genericActions from "./generic";
import invoiceActions from "./invoice";
import purchaseOrderActions from "./purchase";
import receiptActions from "./receipt";
import refundActions from "./refund";
import resourceActions from "./resource";

export default {
  ...genericActions,
  ...customerActions,
  ...invoiceActions,
  ...refundActions,
  ...purchaseOrderActions,
  ...attachmentActions,
  ...batchActions,
  ...receiptActions,
  ...resourceActions,
  ...accountActions,
};
