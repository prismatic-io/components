const sampleCreator = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleExtractDefinition = {
  guid: "EXT123DEF456GHI789JKL012",
  number: "EXT-000074",
  name: "Compliance Data Extract",
  description: "Extracts RoHS and REACH compliance data for audit reporting.",
  enabled: true,
  format: "XLSX",
  creator: sampleCreator,
  creationDateTime: "2026-05-04T09:00:00Z",
  lastModifiedDateTime: "2026-05-06T14:30:00Z",
  url: {
    api: "https://api.arenasolutions.com/v1/extracts/EXT123DEF456GHI789JKL012",
    app: "https://app.bom.com/extracts/EXT123DEF456GHI789JKL012",
  },
};
const sampleExtractRunFile = {
  guid: "EFA123JKL456MNO789PQR012",
  name: "compliance-data-extract.xlsx",
  format: "XLSX",
  mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  size: 61240,
};
const sampleExtractRun = {
  guid: "RUN123ABC456DEF789GHI012",
  number: "1",
  status: "COMPLETED",
  startedDateTime: "2026-05-06T15:00:00Z",
  completedDateTime: "2026-05-06T15:03:12Z",
  creator: sampleCreator,
  files: [sampleExtractRunFile],
  url: {
    api: "https://api.arenasolutions.com/v1/extracts/EXT123DEF456GHI789JKL012/runs/RUN123ABC456DEF789GHI012",
    app: "https://app.bom.com/extracts/EXT123DEF456GHI789JKL012/runs/RUN123ABC456DEF789GHI012",
  },
};
export const createExtractExamplePayload = { data: sampleExtractDefinition };
export const deleteExtractExamplePayload = {
  data: {
    success: true,
    message: "Extract deleted successfully",
  },
};
export const downloadExtractRunFileContentExamplePayload = {
  data: {
    content: "UEsDBBQABgAIAAAAIQ4AAAAAAAAAAAAAAAAAAAA=",
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    filename: "compliance-data-extract.xlsx",
    size: 61240,
  },
};
export const getExtractExamplePayload = { data: sampleExtractDefinition };
export const getExtractRunExamplePayload = { data: sampleExtractRun };
export const listExtractRunFilesExamplePayload = {
  data: {
    results: [
      sampleExtractRunFile,
      {
        ...sampleExtractRunFile,
        guid: "EFA234KLM567NOP890QRS123",
        name: "compliance-summary.csv",
        format: "CSV",
        mimeType: "text/csv",
        size: 8421,
      },
    ],
    count: 2,
  },
};
export const listExtractRunsExamplePayload = {
  data: {
    results: [
      sampleExtractRun,
      {
        ...sampleExtractRun,
        guid: "RUN234BCD567EFG890HIJ123",
        number: "2",
        status: "RUNNING",
        startedDateTime: "2026-05-13T15:00:00Z",
        completedDateTime: undefined,
        files: [],
      },
    ],
    count: 2,
  },
};
export const listExtractsExamplePayload = {
  data: {
    results: [
      sampleExtractDefinition,
      {
        ...sampleExtractDefinition,
        guid: "EXT234DEF567GHI890JKL123",
        number: "EXT-000075",
        name: "Supplier Item Extract",
        description: "Extracts approved supplier item data for procurement.",
        format: "CSV",
      },
    ],
    count: 2,
  },
};
export const getLatestCompletedExtractRunExamplePayload = {
  data: sampleExtractRun,
};
export const runExtractExamplePayload = {
  data: {
    ...sampleExtractRun,
    guid: "RUN345CDE678FGH901IJK234",
    number: "3",
    status: "RUNNING",
    startedDateTime: "2026-05-20T15:00:00Z",
    completedDateTime: undefined,
    files: [],
  },
};
export const updateExtractExamplePayload = {
  data: {
    ...sampleExtractDefinition,
    name: "Compliance Data Extract (Q3 revision)",
    lastModifiedDateTime: "2026-05-18T11:15:00Z",
  },
};
