import type { PlannerTask } from "@microsoft/microsoft-graph-types";

import type { ODATA_TYPE } from "../constants";
import type { Etagged } from "./graph";

export interface PlannerChangesObject {
  created: (PlannerTask & Etagged)[];
}

export interface PlannerTaskChange {
  changeType: "created";
  record: PlannerTask & Etagged;
}

export interface PlannerAssignmentEntry {
  "@odata.type": (typeof ODATA_TYPE)["assignment"];
  orderHint: string;
}

export interface PlannerChecklistEntry {
  "@odata.type": (typeof ODATA_TYPE)["checklistItem"];
  title?: string;
  isChecked?: boolean;
}

export interface PlannerReferenceEntry {
  "@odata.type": (typeof ODATA_TYPE)["externalReference"];
  alias?: string;
  type?: string;
  previewPriority?: string;
}

export interface DeleteResult {
  success: true;
  id: string;
  message: string;
}
