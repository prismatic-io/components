const sampleCreator = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleImport = {
  guid: "1IM22IM33IM44IM55IM66IM7",
  url: {
    api: "https://api.arenasolutions.com/v1/imports/1IM22IM33IM44IM55IM66IM7",
    app: "https://app.bom.com/imports/1IM22IM33IM44IM55IM66IM7",
  },
  number: 128,
  name: "Weekly Item Master Import",
  description: "Imports the latest item master export from the ERP system.",
  resource: "ITEMS",
  mode: "CREATE_AND_UPDATE",
  creator: sampleCreator,
  creationDateTime: "2026-03-14T10:00:00Z",
  lastModifiedDateTime: "2026-03-18T14:30:00Z",
};
const sampleImportRun = {
  guid: "2IR33IR44IR55IR66IR77IR8",
  url: {
    api: "https://api.arenasolutions.com/v1/imports/1IM22IM33IM44IM55IM66IM7/runs/2IR33IR44IR55IR66IR77IR8",
    app: "https://app.bom.com/imports/1IM22IM33IM44IM55IM66IM7/runs/2IR33IR44IR55IR66IR77IR8",
  },
  number: 342,
  status: "COMPLETE",
  creator: sampleCreator,
  creationDateTime: "2026-03-18T15:00:00Z",
  completedDateTime: "2026-03-18T15:02:14Z",
  rowsProcessed: 148,
  rowsSucceeded: 146,
  rowsFailed: 2,
  committed: true,
};
export const createImportExamplePayload = { data: sampleImport };
export const updateImportExamplePayload = {
  data: {
    ...sampleImport,
    name: "Weekly Item Master Import (revised)",
    description:
      "Imports the latest item master export, now including BOM rows.",
    lastModifiedDateTime: "2026-03-20T09:15:00Z",
  },
};
export const getImportExamplePayload = { data: sampleImport };
export const listImportsExamplePayload = {
  data: {
    results: [
      sampleImport,
      {
        guid: "3IM44IM55IM66IM77IM88IM9",
        url: {
          api: "https://api.arenasolutions.com/v1/imports/3IM44IM55IM66IM77IM88IM9",
          app: "https://app.bom.com/imports/3IM44IM55IM66IM77IM88IM9",
        },
        number: 129,
        name: "Supplier BOM Import",
        description:
          "Imports BOM structures supplied by the contract manufacturer.",
        resource: "BOM",
        mode: "CREATE",
        creator: sampleCreator,
        creationDateTime: "2026-03-16T11:20:00Z",
        lastModifiedDateTime: "2026-03-16T11:20:00Z",
      },
    ],
    count: 2,
  },
};
export const runImportExamplePayload = {
  data: {
    ...sampleImportRun,
    status: "RUNNING",
    completedDateTime: undefined,
    rowsProcessed: 0,
    rowsSucceeded: 0,
    rowsFailed: 0,
    committed: false,
  },
};
export const rerunImportExamplePayload = {
  data: {
    ...sampleImportRun,
    number: 343,
    guid: "4IR55IR66IR77IR88IR99IR0",
    status: "RUNNING",
    creationDateTime: "2026-03-19T08:45:00Z",
    completedDateTime: undefined,
    rowsProcessed: 0,
    rowsSucceeded: 0,
    rowsFailed: 0,
    committed: false,
  },
};
export const forceCompleteImportExamplePayload = {
  data: {
    ...sampleImportRun,
    status: "COMPLETE",
    completedDateTime: "2026-03-18T15:05:00Z",
    rowsFailed: 2,
    committed: true,
  },
};
export const getImportRunExamplePayload = { data: sampleImportRun };
export const listImportRunsExamplePayload = {
  data: {
    results: [
      sampleImportRun,
      {
        guid: "5IR66IR77IR88IR99IR00IR1",
        url: {
          api: "https://api.arenasolutions.com/v1/imports/1IM22IM33IM44IM55IM66IM7/runs/5IR66IR77IR88IR99IR00IR1",
          app: "https://app.bom.com/imports/1IM22IM33IM44IM55IM66IM7/runs/5IR66IR77IR88IR99IR00IR1",
        },
        number: 344,
        status: "ERROR",
        creator: sampleCreator,
        creationDateTime: "2026-03-20T09:00:00Z",
        completedDateTime: "2026-03-20T09:00:47Z",
        rowsProcessed: 150,
        rowsSucceeded: 120,
        rowsFailed: 30,
        committed: false,
      },
    ],
    count: 2,
  },
};
export const getImportRunSubmitContentExamplePayload = {
  data:
    "Item Number,Name,Category,Quantity\n" +
    "PRT-002045,Ceramic Capacitor 10uF,Capacitors,2\n" +
    "PRT-002110,Resistor 4.7k Ohm,Resistors,1\n",
};
export const getImportRunResultContentExamplePayload = {
  data:
    "Item Number,Name,Status,Message\n" +
    "PRT-002045,Ceramic Capacitor 10uF,SUCCESS,Created\n" +
    "PRT-002110,Resistor 4.7k Ohm,SUCCESS,Updated\n",
};
export const getImportRunErrorContentExamplePayload = {
  data:
    "Row,Item Number,Error\n" +
    '14,PRT-002500,Category "Widgets" not found\n' +
    '27,PRT-002600,Required field "Name" is missing\n',
};
