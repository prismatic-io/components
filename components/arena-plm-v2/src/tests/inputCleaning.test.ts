import {
  addItemToChangeInputs,
  changeFileCheckoutStatusInputs,
  changeLifecycleStatusInputs,
  createExportInputs,
  createExtractInputs,
  createImportInputs,
  createItemImageInputs,
  createSupplierInputs,
  downloadExportRunFileContentInputs,
  listExportRunsInputs,
  listOutboundEventIntegrationEventsInputs,
  listOutboundEventResourcesInputs,
  runExportInputs,
  updateChangeImplementationTaskNoteInputs,
  updateQualityProcessInputs,
  updateSupplierInputs,
} from "../inputs";
type CleanableInput = {
  clean?: (value: unknown) => unknown;
};
const cleanOf = (definition: unknown, name: string) => {
  const { clean } = definition as CleanableInput;
  if (typeof clean !== "function") {
    throw new Error(`${name} defines no clean function`);
  }
  return clean;
};
const dataInputs: [string, unknown][] = [
  ["createExport.exportData", createExportInputs.exportData],
  ["createExtract.extractData", createExtractInputs.extractData],
  ["createImport.importData", createImportInputs.importData],
  ["updateQualityProcess.data", updateQualityProcessInputs.data],
  ["runExport.runData", runExportInputs.runData],
  [
    "changeLifecycleStatus.administrators",
    changeLifecycleStatusInputs.administrators,
  ],
  [
    "changeLifecycleStatus.implementationStatus",
    changeLifecycleStatusInputs.implementationStatus,
  ],
  ["createSupplier.addresses", createSupplierInputs.addresses],
  ["createSupplier.phoneNumbers", createSupplierInputs.phoneNumbers],
  ["updateSupplier.addresses", updateSupplierInputs.addresses],
  ["updateSupplier.phoneNumbers", updateSupplierInputs.phoneNumbers],
];
const optionalDataInputs: [string, unknown][] = [
  ["runExport.runData", runExportInputs.runData],
  [
    "changeLifecycleStatus.administrators",
    changeLifecycleStatusInputs.administrators,
  ],
  [
    "changeLifecycleStatus.implementationStatus",
    changeLifecycleStatusInputs.implementationStatus,
  ],
  ["createSupplier.addresses", createSupplierInputs.addresses],
  ["createSupplier.phoneNumbers", createSupplierInputs.phoneNumbers],
  ["updateSupplier.addresses", updateSupplierInputs.addresses],
  ["updateSupplier.phoneNumbers", updateSupplierInputs.phoneNumbers],
];
describe("data input cleaning", () => {
  it.each(
    dataInputs,
  )("%s keeps an array an array, so Array.isArray gates still fire", (name, definition) => {
    const result = cleanOf(definition, name)([{ guid: "3RR44SS55TT66UU77" }]);
    expect(Array.isArray(result)).toBe(true);
  });
  it.each(
    dataInputs,
  )("%s parses a JSON array string into an array", (name, definition) => {
    const result = cleanOf(definition, name)('[{"guid":"3RR44SS55TT66UU77"}]');
    expect(Array.isArray(result)).toBe(true);
  });
  it.each(dataInputs)("%s never yields a string", (name, definition) => {
    const result = cleanOf(definition, name)({ name: "Widget Assembly" });
    expect(typeof result).not.toBe("string");
    expect(result).toEqual({ name: "Widget Assembly" });
  });
});
describe("optional data inputs", () => {
  it.each(
    optionalDataInputs,
  )("%s cleans a blank value to undefined so the key is omitted", (name, definition) => {
    const clean = cleanOf(definition, name);
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
    expect(clean(null)).toBeUndefined();
  });
});
describe("latestCompleted export-run filter", () => {
  const clean = () =>
    cleanOf(
      listExportRunsInputs.latestCompleted,
      "listExportRuns.latestCompleted",
    );
  it("is omitted when left blank rather than sent as false", () => {
    expect(clean()("")).toBeUndefined();
    expect(clean()(undefined)).toBeUndefined();
    expect(clean()(null)).toBeUndefined();
  });
  it("still maps an explicit choice to a boolean", () => {
    expect(clean()("true")).toBe(true);
    expect(clean()("false")).toBe(false);
  });
});
describe("required inputs coerce their value", () => {
  const requiredScalars: [string, unknown][] = [
    ["addItemToChange.newItemRevision", addItemToChangeInputs.newItemRevision],
    [
      "updateChangeImplementationTaskNote.noteGuid",
      updateChangeImplementationTaskNoteInputs.noteGuid,
    ],
    [
      "downloadExportRunFileContent.exportGuid",
      downloadExportRunFileContentInputs.exportGuid,
    ],
    [
      "downloadExportRunFileContent.exportRunGuid",
      downloadExportRunFileContentInputs.exportRunGuid,
    ],
    ["createItemImage.content", createItemImageInputs.content],
  ];
  it.each(requiredScalars)("%s coerces to a string", (name, definition) => {
    const clean = cleanOf(definition, name);
    expect(typeof clean("ABC123")).toBe("string");
    expect(clean(123)).toBe("123");
  });
  it("changeFileCheckoutStatus.fileCheckoutData parses to a record", () => {
    const clean = cleanOf(
      changeFileCheckoutStatusInputs.fileCheckoutData,
      "fileCheckoutData",
    );
    const result = clean('{"fileGuid":"ABC123","action":"checkin"}');
    expect(result).toEqual({ fileGuid: "ABC123", action: "checkin" });
  });
});
describe("single-choice integration filters", () => {
  it("objectType stays a scalar safe to interpolate into a path", () => {
    const clean = cleanOf(
      listOutboundEventResourcesInputs.objectType,
      "objectType",
    );
    const result = clean("items");
    expect(typeof result).toBe("string");
    expect(result).toBe("items");
  });
  const threeStateFilters: [string, unknown][] = [
    [
      "listOutboundEventResources.reconciled",
      listOutboundEventResourcesInputs.reconciled,
    ],
    [
      "listOutboundEventIntegrationEvents.resourcesReconciled",
      listOutboundEventIntegrationEventsInputs.resourcesReconciled,
    ],
  ];
  it.each(
    threeStateFilters,
  )('%s omits the filter when "Any" is chosen', (name, definition) => {
    expect(cleanOf(definition, name)("any")).toBeUndefined();
  });
  it.each(
    threeStateFilters,
  )("%s maps an explicit choice to a boolean", (name, definition) => {
    const clean = cleanOf(definition, name);
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });
});
