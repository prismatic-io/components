import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { SmartsheetSheet } from "../types";
import { paginateByPage } from "./pagination";




export const formatSmartsheetTimestamp = (date: Date): string =>
  date.toISOString().replace(/\.\d{3}Z$/, "Z");





export const fetchSheetsSince = async (
  client: HttpClient,
  modifiedSinceIso: string,
): Promise<SmartsheetSheet[]> =>
  paginateByPage<SmartsheetSheet>(client, "/sheets", {
    query: { include: "sheetVersion", modifiedSince: modifiedSinceIso },
  });





export const partitionSheetsByTimestamp = (
  sheets: SmartsheetSheet[],
  sinceDate: Date,
): { created: SmartsheetSheet[]; updated: SmartsheetSheet[] } => {
  const created: SmartsheetSheet[] = [];
  const updated: SmartsheetSheet[] = [];

  for (const sheet of sheets) {
    const createdAt = sheet.createdAt ? new Date(sheet.createdAt) : null;
    const modifiedAt = sheet.modifiedAt ? new Date(sheet.modifiedAt) : null;

    if (createdAt && createdAt > sinceDate) {
      created.push(sheet);
    } else if (modifiedAt && modifiedAt > sinceDate) {
      updated.push(sheet);
    } else if (!createdAt && !modifiedAt) {
      updated.push(sheet);
    }
  }

  return { created, updated };
};
