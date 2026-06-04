import { createBill } from "./createBill";
import { createContact } from "./createContact";
import { createCustomer } from "./createCustomer";
import { createInvoice } from "./createInvoice";
import { createVendor } from "./createVendor";
import { getApPayment } from "./getApPayment";
import { getArPayment } from "./getArPayment";
import { getBill } from "./getBill";
import { getContact } from "./getContact";
import { getCustomer } from "./getCustomer";
import { getInvoice } from "./getInvoice";
import { getVendor } from "./getVendor";
import { queryAndList } from "./queryAndList";
import { rawRequest } from "./rawRequest";
import { updateContact } from "./updateContact";
import { updateCustomer } from "./updateCustomer";
import { updateVendor } from "./updateVendor";
import { updateInvoice } from "./updateInvoice";
import { deleteObject } from "./deleteObject";
import { getProject } from "./getProject";
import { createProject } from "./createProject";
import { updateProject } from "./updateProject";
import { getARAdjustment } from "./getARAdjustment";
import { updateARAdjustment } from "./updateARAdjustment";
import { getARAdjustmentLine } from "./getARAdjustmentLine";
import { getARAdvance } from "./getARAdvance";
import { createARAdvance } from "./createARAdvance";
import { updateARAdvance } from "./updateARAdvance";

export default {
  createCustomer,
  updateCustomer,
  getCustomer,
  createContact,
  updateContact,
  getContact,
  createVendor,
  updateVendor,
  getVendor,
  createInvoice,
  queryAndList,
  getInvoice,
  getBill,
  getArPayment,
  getApPayment,
  createBill,
  updateInvoice,
  deleteObject,
  rawRequest,
  getProject,
  createProject,
  updateProject,
  getARAdjustment,
  updateARAdjustment,
  getARAdjustmentLine,
  getARAdvance,
  createARAdvance,
  updateARAdvance,
};
