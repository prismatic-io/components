import type { Element } from "@prismatic-io/spectral";
import type {
  AemJob,
  FolderCommandResult,
  FolderListingResponse,
  FolderTreeAsset,
} from "../types";

export const listFolderContentsExamplePayload: { data: FolderListingResponse } =
  {
    data: {
      self: {
        type: "FOLDER",
        folderId: "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456",
        name: "en",
        title: "English",
        path: "/content/dam/wknd-shared/en",
      },
      children: [
        {
          type: "FOLDER",
          folderId: "urn:aaid:aem:bcde2345-bc23-bc23-bc23-bcdef2345678",
          name: "adventures",
          title: "Adventures",
          path: "/content/dam/wknd-shared/en/adventures",
        },
        {
          type: "ASSET",
          assetId: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
          name: "city.jpeg",
          size: 338049,
          lastModifiedAt: "2026-04-15T05:01:44.229Z",
        },
      ],
      cursor: "eyJvZmZzZXQiOjUwfQ",
    },
  };

const exampleFolderTreeAsset: FolderTreeAsset = {
  type: "ASSET",
  assetId: "urn:aaid:aem:4f2b6c1e-8d3a-4b5c-9e7f-0a1b2c3d4e5f",
  name: "city.jpeg",
  size: 338049,
  lastModifiedAt: "2026-04-15T05:01:44.229Z",
  folderPath: "/content/dam/wknd-shared/en",
};

export const listAssetsInFolderTreeExamplePayload = {
  data: [exampleFolderTreeAsset],
};

const folderJobExamplePayload: { data: AemJob } = {
  data: { jobId: "5f8b2c1e-3a4d-4e6f-9b7a-1c2d3e4f5a6b", state: "PROCESSING" },
};

export const deleteFoldersExamplePayload = folderJobExamplePayload;
export const getFolderJobStatusExamplePayload = folderJobExamplePayload;

export const createFoldersExamplePayload: { data: FolderCommandResult } = {
  data: {
    operation: "adobe.folders.createFolders",
    status: 200,
    description: "Created folders",
    data: {
      values: {
        successes: [
          {
            type: "FOLDER",
            name: "adventures",
            folderId: "urn:aaid:aem:72583e15-33e8-4c86-bc8c-1f0557d7aa7b",
            path: "/content/dam/wknd-shared/en/adventures",
          },
        ],
      },
    },
    errors: [],
    warnings: [],
  },
};

export const selectFolderExamplePayload: { result: Element[] } = {
  result: [
    {
      key: "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456",
      label: "/content/dam/wknd-shared/en",
    },
  ],
};

export const selectFolderPathExamplePayload: { result: Element[] } = {
  result: [
    { key: "/content/dam", label: "/content/dam" },
    {
      key: "/content/dam/wknd-shared/en",
      label: "/content/dam/wknd-shared/en",
    },
  ],
};
