import * as dotenv from "dotenv";
import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/dist/testing";

import { googleConnection } from "./connections";
import { createDocument } from "./actions/createDocument";
import { addSheet } from "./actions/addSheet";
import { listSheets } from "./actions/listSheets";
import { getRows } from "./actions/listRows";
import { appendRows } from "./actions/appendRows";
import { updateRows } from "./actions/updateRows";
import { clearSheet } from "./actions/clearSheet";
import { setHeaderRow } from "./actions/setHeaderRow";
import { removeSheet } from "./actions/removeSheet";

dotenv.config();


const connection: Connection = {
  token: {
    access_token: process.env.ACCESS_TOKEN,
  },
  fields: {},
  configVarKey: "Google Sheets Connection",
  key: googleConnection.key,
};

describe("test all actions", () => {
  const testDocumentName = `${Math.floor(Math.random() * 1000000000)}`;
  const testWorksheetName = `${Math.floor(Math.random() * 1000000000)}`;
  const testHeaders = ["Column 1", "Column 2", "Column 3"];
  let testDocumentSpreadsheetId: string;

  test("verify the createDocument action works as expected", async () => {
    
    if (!connection.token.access_token) return;

    const { result } = await invoke(createDocument, {
      title: testDocumentName,
      connection,
    });

    expect(result.data).toHaveProperty("title");
    expect(result.data.title).toEqual(testDocumentName);

    testDocumentSpreadsheetId = result.data.spreadsheetId;
  });

  test("verify the addSheet action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const { result } = await invoke(addSheet, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      headers: testHeaders,
      connection,
    });

    expect(result.data).toHaveProperty("title");
    expect(result.data.title).toEqual(testWorksheetName);
  });

  test("verify the listSheets action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const { result } = await invoke(listSheets, {
      spreadsheetId: testDocumentSpreadsheetId,
      connection,
    });

    expect(
      result.data.filter((sheet) => sheet.title === testWorksheetName),
    ).toHaveLength(1);
  });

  test("verify the appendRows action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const testRows = [
      { "Column 1": "1", "Column 2": "2", "Column 3": "3" },
      { "Column 1": "4", "Column 2": "5", "Column 3": "6" },
    ];
    const { result: appendResult } = await invoke(appendRows, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      rows: testRows,
      storeRawValues: false,
      connection,
    });

    expect(appendResult.data).toHaveProperty("title");
    expect(appendResult.data.title).toEqual(testWorksheetName);

    const { result: getResult } = await invoke(getRows, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      limit: undefined,
      offset: undefined,
      connection,
    });

    expect(getResult.data).toEqual(testRows);
  });

  test("verify the updateRows action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const testRows = [
      { "Column 1": "10", "Column 2": "20", "Column 3": "30" },
      { "Column 1": "40", "Column 2": "50", "Column 3": "60" },
    ];
    const testValues = testRows.reduce(
      (prev, curr, index) => {
        prev[index + 1] = curr;
        return prev;
      },
      {} as Record<number, object>,
    );
    const { result: updateResult } = await invoke(updateRows, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      values: testValues,
      storeRawValues: false,
      connection,
    });

    expect(updateResult.data).toHaveProperty("title");
    expect(updateResult.data.title).toEqual(testWorksheetName);

    const { result: getResult } = await invoke(getRows, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      limit: undefined,
      offset: undefined,
      connection,
    });

    expect(getResult.data).toEqual(testRows);
  });

  test("verify the setHeaderRow action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const { result } = await invoke(setHeaderRow, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      headers: ["1", "2", "3"],
      connection,
    });

    expect(result.data).toHaveProperty("title");
    expect(result.data.title).toEqual(testWorksheetName);
  });

  test("verify the clearSheet action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const { result } = await invoke(clearSheet, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      connection,
    });

    expect(result.data).toHaveProperty("title");
    expect(result.data.title).toEqual(testWorksheetName);
  });

  test("verify the removeSheet action works as expected", async () => {
    
    if (!testDocumentSpreadsheetId) return;

    const { result: removeResult } = await invoke(removeSheet, {
      spreadsheetId: testDocumentSpreadsheetId,
      title: testWorksheetName,
      connection,
    });

    expect(removeResult.data).toHaveProperty("title");
    expect(removeResult.data.title).toEqual(testWorksheetName);

    
    const { result: listResult } = await invoke(listSheets, {
      spreadsheetId: testDocumentSpreadsheetId,
      connection,
    });

    expect(
      listResult.data.filter((sheet) => sheet.title === testWorksheetName),
    ).toHaveLength(0);
  });
});
