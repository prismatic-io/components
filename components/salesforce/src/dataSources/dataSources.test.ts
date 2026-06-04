import { util, testing } from "@prismatic-io/spectral";
import { salesforceOAuth } from "../connections/";

import component from "..";

const version = "51.0";
const harness = testing.createHarness(component);
let connection = null;
try {
  connection = harness.connectionValue(salesforceOAuth);
} catch {
  
  
  connection = null;
}

describe("selectRecordTypes", () => {
  it("should return a valid objectSelection", async () => {
    if (!connection) return;

    const { result } = await harness.dataSource("selectRecordTypes", {
      version,
      connection,
    });
    expect(util.types.isObjectSelection(result)).toBe(true);
  });
  it("should allow filtering by name", async () => {
    if (!connection) return;

    const { result } = await harness.dataSource("selectRecordTypes", {
      version,
      connection,
      recordTypeFilter: ["Account"],
      includeAllCustomRecordTypes: false,
    });
    expect(util.types.toObjectSelection(result).length).toStrictEqual(1);
  });
  it("should allow including custom record types regardless of record type filter", async () => {
    if (!connection) return;

    const { result } = await harness.dataSource("selectRecordTypes", {
      version,
      connection,
      recordTypeFilter: ["SOME_NONEXISTENT_TYPE"],
      includeAllCustomRecordTypes: true,
    });
    expect(util.types.toObjectSelection(result).length).toBeGreaterThan(0);
  });
});

describe("previewRecordTypeFields", () => {
  it("should return a valid list of fields", async () => {
    if (!connection) return;

    const { result } = await harness.dataSource("previewRecordTypeFields", {
      version,
      connection,
      dynamicRecordType: "Account",
    });
    expect(util.types.isPicklist(result)).toBe(true);
  });
});

describe("previewRecordTypeFieldValues", () => {
  it("should return a valid list of field values", async () => {
    if (!connection) return;

    const { result } = await harness.dataSource("previewRecordTypeFieldValues", {
      version,
      connection,
      dynamicRecordType: "Account",
      dynamicFieldName: "Name",
    });
    expect(util.types.isPicklist(result)).toBe(true);
  });
});

describe("mapRecordTypeFields", () => {
  it("should return a valid objectFieldMap", async () => {
    if (!connection) return;

    const mappingFields = {
      fields: [
        {
          field: { key: "name", label: "Name" },
          defaultObject: { key: "account", label: "Account" },
          defaultField: { key: "contactName", label: "Contact Name" },
        },
      ],
    };
    const objectSelection = [
      {
        object: { key: "account", label: "Account" },
      },
    ];
    const includeSupplementalMetadata = false;

    const { result } = await harness.dataSource("mapRecordTypeFields", {
      version,
      connection,
      mappingFields,
      objectSelection,
      includeSupplementalMetadata,
    });
    expect(util.types.isObjectFieldMap(result)).toBe(true);
  });
});
