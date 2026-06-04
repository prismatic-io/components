import type {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { util } from "@prismatic-io/spectral";
import { auth } from "@googleapis/drive";


export const ensureRowMap = (
  input: unknown,
): Record<number, Record<string, unknown>> => {
  if (typeof input === "object" && input !== null) {
    if (Array.isArray(input)) {
      throw new Error(
        `Expected a mapping of row numbers to cell values, got: ${JSON.stringify(
          input,
        )}`,
      );
    }

    
    if (Object.keys(input).filter((key) => !util.types.isNumber(key)).length) {
      throw new Error("Row number mapping contains a non-integer row number.");
    }

    
    return input as Record<number, Record<string, unknown>>;
  }

  if (typeof input === "string") {
    if (util.types.isJSON(input)) {
      return ensureRowMap(JSON.parse(input));
    }

    throw new Error(
      `Expected a mapping of row numbers to cell values, got: ${input}`,
    );
  }

  throw new Error(
    `Expected a mapping of row numbers to cell values, got: ${JSON.stringify(
      input,
    )}`,
  );
};


export const ensureList = (input: unknown): unknown[] => {
  if (Array.isArray(input)) {
    return input;
  }
  if (typeof input === "string") {
    if (util.types.isJSON(input)) {
      return ensureList(util.types.toObject(input));
    }

    throw new Error(`Expected a list, got: ${input}`);
  }

  throw new Error(`Expected a list, got: ${JSON.stringify(input)}`);
};


export const ensureTitle = (input: unknown): string => {
  const title = util.types.toString(input) || undefined;
  if (!title) {
    throw new Error("Title is required.");
  }
  return title;
};


export const worksheetWithTitle = (
  client: GoogleSpreadsheet,
  title: unknown,
): GoogleSpreadsheetWorksheet => {
  const sheets = client.sheetsByTitle;
  const sheet = sheets[ensureTitle(title)];
  if (!sheet) {
    throw new Error(`Unable to find sheet with title: ${title}`);
  }

  return sheet;
};


export const worksheetProperties = (
  client: GoogleSpreadsheet,
  sheet: GoogleSpreadsheetWorksheet,
): Record<string, unknown> => {
  return {
    spreadsheetId: client.spreadsheetId,
    worksheetId: sheet.sheetId,
    title: sheet.title,
  };
};

export const getOauth = (token: string) => {
  const oauth2Client = new auth.OAuth2();
  oauth2Client.setCredentials({ access_token: `${token}` });

  return oauth2Client;
};

export function getBase64FromUrl(url: string): string {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
}
