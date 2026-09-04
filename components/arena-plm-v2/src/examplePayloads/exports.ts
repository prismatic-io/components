const sampleCreator = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleExportDefinition = {
  guid: "EXP123DEF456GHI789JKL012",
  number: 128,
  name: "Weekly BOM Export",
  description: "Exports the released BOM structure for downstream ERP sync.",
  format: "CSV",
  enabled: true,
  creator: sampleCreator,
  creationDateTime: "2026-05-04T09:00:00Z",
  lastModifiedDateTime: "2026-05-06T14:30:00Z",
  url: {
    api: "https://api.arenasolutions.com/v1/exports/EXP123DEF456GHI789JKL012",
    app: "https://app.bom.com/exports/EXP123DEF456GHI789JKL012",
  },
};
const sampleExportRun = {
  guid: "RUN123ABC456DEF789GHI012",
  number: 1,
  status: "COMPLETED",
  startedDateTime: "2026-05-06T15:00:00Z",
  completedDateTime: "2026-05-06T15:02:34Z",
  creator: sampleCreator,
  files: [
    {
      guid: "FIL123JKL456MNO789PQR012",
      name: "weekly-bom-export.csv",
      format: "CSV",
      mimeType: "text/csv",
      size: 48213,
    },
  ],
  url: {
    api: "https://api.arenasolutions.com/v1/exports/EXP123DEF456GHI789JKL012/runs/RUN123ABC456DEF789GHI012",
    app: "https://app.bom.com/exports/EXP123DEF456GHI789JKL012/runs/RUN123ABC456DEF789GHI012",
  },
};
export const createExportExamplePayload = { data: sampleExportDefinition };
export const downloadExportRunFileContentExamplePayload = {
  data: {
    content:
      "SXRlbSBOdW1iZXIsUmV2aXNpb24sRGVzY3JpcHRpb24sUXVhbnRpdHkKUFJULTAwMTA0NSxCLE1haW4gQ29udHJvbGxlciBCb2FyZCwxCg==",
    contentType: "text/csv",
    filename: "bom-export-2026-08-11.csv",
    size: 79,
  },
};
export const getExportExamplePayload = { data: sampleExportDefinition };
export const getExportRunExamplePayload = { data: sampleExportRun };
export const listExportRunsExamplePayload = {
  data: {
    results: [
      sampleExportRun,
      {
        ...sampleExportRun,
        guid: "RUN234BCD567EFG890HIJ123",
        number: 2,
        status: "RUNNING",
        startedDateTime: "2026-05-13T15:00:00Z",
        completedDateTime: undefined,
        files: [],
      },
    ],
    count: 2,
  },
};
export const listExportsExamplePayload = {
  data: {
    results: [
      sampleExportDefinition,
      {
        ...sampleExportDefinition,
        guid: "EXP234DEF567GHI890JKL123",
        number: 129,
        name: "Item Master Export",
        description: "Full item master snapshot for reporting.",
        format: "PDF",
      },
    ],
    count: 2,
  },
};
export const getLatestCompletedExportRunExamplePayload = {
  data: sampleExportRun,
};
export const runExportExamplePayload = {
  data: {
    ...sampleExportRun,
    guid: "RUN345CDE678FGH901IJK234",
    number: 3,
    status: "RUNNING",
    startedDateTime: "2026-05-20T15:00:00Z",
    completedDateTime: undefined,
    files: [],
  },
};
