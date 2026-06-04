export const CHILD_TYPE = {
  FOLDER: "folder",
  SHEET: "sheet",
  REPORT: "report",
  SIGHT: "sight",
  TEMPLATE: "template",
} as const;

export type ChildType = (typeof CHILD_TYPE)[keyof typeof CHILD_TYPE];






export const mergeMetadataChildren = (
  metadata: Record<string, unknown>,
  children: Array<Record<string, unknown>>,
): Record<string, unknown> => ({
  ...metadata,
  folders: children.filter((c) => c.type === CHILD_TYPE.FOLDER),
  sheets: children.filter((c) => c.type === CHILD_TYPE.SHEET),
  reports: children.filter((c) => c.type === CHILD_TYPE.REPORT),
  sights: children.filter((c) => c.type === CHILD_TYPE.SIGHT),
  templates: children.filter((c) => c.type === CHILD_TYPE.TEMPLATE),
});
