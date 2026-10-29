import { createInvoice } from "./createInvoice";
import { createInvoiceV2 } from "./createInvoiceV2";
import { getInvoiceById } from "./getInvoiceById";
import { listInvoices } from "./listInvoices";
import { voidInvoice } from "./voidInvoice";

export default {
  getInvoiceById,
  createInvoice,
  createInvoiceV2,
  voidInvoice,
  listInvoices,
};
