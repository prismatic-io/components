import { createRefundReceipt } from "./createRefundReceipt";
import { deleteRefundReceipt } from "./deleteRefundReceipt";
import { getRefundReceipt } from "./getRefundReceipt";
import { getRefundReceiptAsPDF } from "./getRefundReceiptAsPDF";
import { listRefundReceipts } from "./listRefundReceipts";
import { sendRefundReceipt } from "./sendRefundReceipt";
import { sendRefundReceiptToEmail } from "./sendRefundReceiptToEmail";
import { updateRefundReceipt } from "./updateRefundReceipt";

export default {
  updateRefundReceipt,
  createRefundReceipt,
  deleteRefundReceipt,
  sendRefundReceipt,
  sendRefundReceiptToEmail,
  getRefundReceipt,
  getRefundReceiptAsPDF,
  listRefundReceipts,
};
