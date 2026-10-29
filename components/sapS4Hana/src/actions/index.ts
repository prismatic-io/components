import { addAttachment } from "./addAttachment";
import { createChangeRecord } from "./createChangeRecord";
import { createProject } from "./createProject";
import { createSubscription } from "./createSubscription";
import { deleteAttachment } from "./deleteAttachment";
import { getAttachment } from "./getAttachment";
import { getChangerecord } from "./getChangerecord";
import { getProject } from "./getProject";
import { listChangeRecords } from "./listChangeRecords";
import { listFiles } from "./listFiles";
import { listProjects } from "./listProjects";
import { listSubscriptions } from "./listSubscriptions";
import { listTimesheetEntryCollection } from "./listTimesheetEntryCollection";
import rawRequest from "./rawRequest";
import rawRequestOdata from "./rawRequestOdata";
import { updateChangeRecord } from "./updateChangeRecord";
import { updateProject } from "./updateProject";
import { updateSubscription } from "./updateSubscription";
import { updateTimesheetEntryCollection } from "./updateTimesheetEntryCollection";
import { getPurchaseRequisition } from "./getPurchaseRequisition";
import { listPurchaseRequisitions } from "./listPurchaseRequisitions";
import { createPurchaseRequisition } from "./createPurchaseRequisition";
import { updatePurchaseRequisition } from "./updatePurchaseRequisition";
import { getPurchaseRequisitionItemDetails } from "./getPurchaseRequisitionItemDetails";
import { addItemToPurchaseRequisition } from "./addItemToPurchaseRequisition";
import { listRecords } from "./listRecords";
import { getRecord } from "./getRecord";
import { createRecord } from "./createRecord";
import { updateRecord } from "./updateRecord";
import { deleteRecord } from "./deleteRecord";

export default {
  addAttachment,
  getAttachment,
  deleteAttachment,
  listSubscriptions,
  createSubscription,
  updateSubscription,
  listProjects,
  getProject,
  createProject,
  updateProject,
  listTimesheetEntryCollection,
  updateTimesheetEntryCollection,
  listFiles,
  listChangeRecords,
  getChangerecord,
  createChangeRecord,
  updateChangeRecord,
  rawRequest,
  rawRequestOdata,
  getPurchaseRequisition,
  listPurchaseRequisitions,
  createPurchaseRequisition,
  updatePurchaseRequisition,
  getPurchaseRequisitionItemDetails,
  addItemToPurchaseRequisition,
  listRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
