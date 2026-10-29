import { randomUUID } from "node:crypto";
import { DEFAULT_ORDER_HINT, ODATA_TYPE } from "../constants";
import type {
  PlannerAssignmentEntry,
  PlannerChecklistEntry,
  PlannerReferenceEntry,
} from "../types";

export const buildAssignments = (
  assignTo: string[] = [],
  unassign: string[] = [],
): Record<string, PlannerAssignmentEntry | null> => {
  const assignments: Record<string, PlannerAssignmentEntry | null> = {};
  for (const userId of assignTo) {
    assignments[userId] = {
      "@odata.type": ODATA_TYPE.assignment,
      orderHint: DEFAULT_ORDER_HINT,
    };
  }
  for (const userId of unassign) {
    assignments[userId] = null;
  }
  return assignments;
};

export const buildAppliedCategories = (
  applied: string[] = [],
  removed: string[] = [],
): Record<string, boolean> => {
  const categories: Record<string, boolean> = {};
  for (const category of applied) {
    categories[category] = true;
  }
  for (const category of removed) {
    categories[category] = false;
  }
  return categories;
};

export const buildChecklist = (
  add: { title: string; isChecked?: boolean }[] = [],
  update: { id: string; title?: string; isChecked?: boolean }[] = [],
  removeIds: string[] = [],
): Record<string, PlannerChecklistEntry | null> => {
  const checklist: Record<string, PlannerChecklistEntry | null> = {};

  for (const item of add) {
    checklist[randomUUID()] = {
      "@odata.type": ODATA_TYPE.checklistItem,
      title: item.title,
      isChecked: item.isChecked ?? false,
    };
  }

  for (const item of update) {
    const entry: PlannerChecklistEntry = {
      "@odata.type": ODATA_TYPE.checklistItem,
    };
    if (item.title !== undefined) entry.title = item.title;
    if (item.isChecked !== undefined) entry.isChecked = item.isChecked;
    checklist[item.id] = entry;
  }

  for (const id of removeIds) {
    checklist[id] = null;
  }

  return checklist;
};

export const buildReferences = (
  add: { url: string; alias?: string; type?: string }[] = [],
  removeUrls: string[] = [],
): Record<string, PlannerReferenceEntry | null> => {
  const references: Record<string, PlannerReferenceEntry | null> = {};

  for (const reference of add) {
    const entry: PlannerReferenceEntry = {
      "@odata.type": ODATA_TYPE.externalReference,
      previewPriority: DEFAULT_ORDER_HINT,
    };
    if (reference.alias) entry.alias = reference.alias;
    if (reference.type) entry.type = reference.type;
    references[encodeReferenceKey(reference.url)] = entry;
  }

  for (const url of removeUrls) {
    references[encodeReferenceKey(url)] = null;
  }

  return references;
};

export const compact = <T extends Record<string, unknown>>(
  body: T,
): Partial<T> =>
  Object.fromEntries(
    Object.entries(body).filter(([, value]) => value !== undefined),
  ) as Partial<T>;

export const encodeReferenceKey = (url: string): string =>
  url
    .replace(/%/g, "%25")
    .replace(/\./g, "%2E")
    .replace(/:/g, "%3A")
    .replace(/@/g, "%40")
    .replace(/#/g, "%23");
