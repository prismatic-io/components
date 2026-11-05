import type { Element } from "@prismatic-io/spectral";
import type { AemJob, AssetSearchHit, DeletedAsset, ImportJob } from "../types";

const exampleAssetSearchHit: AssetSearchHit = {
  assetId: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
  repositoryMetadata: {
    "repo:name": "city.jpeg",
    "repo:path": "/content/dam/wknd-shared/en/city.jpeg",
    "repo:assetId": "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
    "repo:createDate": "2026-04-14T06:31:07.174Z",
    "repo:modifyDate": "2026-04-15T05:01:44.229Z",
    "repo:ancestors": ["urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456"],
    "dc:format": "image/jpeg",
    "repo:size": 338049,
    "aem:published": "2026-04-15T05:03:47.229Z",
  },
  assetMetadata: {
    "dc:title": "City Skyline",
    "xcm:keywords": [
      {
        tagId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        value: "WKND Shared : Region / City",
        "repo:ancestors": ["wknd-shared", "region", "city"],
      },
    ],
  },
};

export const searchAssetsExamplePayload = {
  data: {
    hits: { results: [exampleAssetSearchHit] },
    cursor: "eyJzZWFyY2hBZnRlciI6WzE3MTMxNTc3MDQyMjldfQ",
    search_metadata: { count: 1, totalCount: { total: 1, relation: "eq" }, searchDuration: 42 },
  },
};

export const getAssetMetadataExamplePayload = {
  data: {
    assetId: exampleAssetSearchHit.assetId,
    repositoryMetadata: exampleAssetSearchHit.repositoryMetadata,
    assetMetadata: exampleAssetSearchHit.assetMetadata,
  },
};

export const listAssetRenditionsExamplePayload = {
  data: {
    assetId: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
    "repo:name": "city.jpeg",
    items: [
      {
        name: "cq5dam.web.1280.1280.jpeg",
        format: "image/jpeg",
        size: 102400,
        dimensions: { width: 1280, height: 998 },
      },
      {
        name: "cq5dam.thumbnail.319.319.png",
        format: "image/png",
        size: 40960,
        dimensions: { width: 319, height: 249 },
      },
    ],
  },
};

export const downloadAssetExamplePayload = {
  data: Buffer.from("example binary content"),
  contentType: "image/jpeg",
};

export const downloadAssetRenditionExamplePayload = {
  data: Buffer.from("example binary content"),
  contentType: "image/jpeg",
};

export const importAssetFromUrlExamplePayload: { data: ImportJob } = {
  data: {
    id: "6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d",
    operation: "aem.assets.import.fromurl",
    state: "PROCESSING",
    data: {
      id: "6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d",
      config: {
        folder: "/content/dam/wknd-shared/en",
        items: ["https://www.example.com/images/city.jpeg"],
      },
      progress: {
        step: "QUEUED",
        total: 1,
        imported: 0,
        failed: 0,
        skipped: 0,
        size: 338049,
        transferred: 0,
        started: "2026-04-15T05:00:12.418Z",
        lastUpdated: "2026-04-15T05:00:12.418Z",
      },
    },
  },
};

export const getImportJobStatusExamplePayload: { data: ImportJob } = {
  data: {
    id: "6a7b8c9d-0e1f-4a2b-8c3d-4e5f6a7b8c9d",
    operation: "aem.assets.import.fromurl",
    status: 202,
    description: "OK",
    state: "PROCESSING",
    progress: {
      step: "IMPORTING",
      total: 1,
      imported: 0,
      failed: 0,
      skipped: 0,
      size: 338049,
      transferred: 169024,
      started: "2026-04-15T05:00:12.418Z",
      lastUpdated: "2026-04-15T05:00:14.902Z",
    },
    errors: [],
  },
};

export const updateAssetMetadataExamplePayload = getAssetMetadataExamplePayload;

export const getAssetJobStatusExamplePayload: { data: AemJob } = {
  data: { jobId: "7b8c9d0e-1f2a-4b3c-9d4e-5f6a7b8c9d0e", state: "PROCESSING" },
};

export const deleteAssetExamplePayload: { data: DeletedAsset } = {
  data: { assetId: "urn:aaid:aem:4f2e8b1a-6c3d-4e5f-9a7b-8c9d0e1f2a3b", deleted: true },
};

export const selectAssetExamplePayload: { result: Element[] } = {
  result: [
    {
      key: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
      label: "/content/dam/wknd-shared/en/city.jpeg",
    },
  ],
};

export const selectAssetRenditionExamplePayload: { result: Element[] } = {
  result: [
    { key: "cq5dam.thumbnail.319.319.png", label: "cq5dam.thumbnail.319.319.png" },
    { key: "cq5dam.web.1280.1280.jpeg", label: "cq5dam.web.1280.1280.jpeg" },
  ],
};
