import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  driveId,
  fetchAll,
  fileData,
  fileName,
  folderId,
  itemId,
  pageLimit,
  pageToken,
  recursive,
  siteId,
} from "../inputs";
import { Readable } from "node:stream";
import { URL } from "node:url";
import { getFilesFromDriveFN, paginateResults } from "../utils";

const listDrives = action({
  display: {
    label: "List Drives",
    description: "List all drives within any given SharePoint site",
  },
  inputs: {
    connection,
    siteId,
    pageLimit,
    pageToken,
    fetchAll,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = `/sites/${params.siteId}/drives`;

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint);
      return { data: results };
    }

    const { data } = await client.get(endpoint, {
      params:
        params.pageLimit || params.pageToken
          ? {
              $top: params.pageLimit,
              $skipToken: params.pageToken,
            }
          : undefined,
    });

    if (data["@odata.nextLink"]) {
      const nextLink = new URL(data["@odata.nextLink"]);
      data["@odata.nextToken"] = nextLink.searchParams.get("$skipToken");
    }

    return { data };
  },
  examplePayload: {
    data: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
      value: [
        {
          createdDateTime: "2025-06-14T05:14:52Z",
          description: "",
          id: "b!o2UaIfdNxk-5091VjGz1sDVso2efo6RGrpVCkPpe547Qrf38sox_TYIFuj9QrJhv",
          lastModifiedDateTime: "2025-12-09T08:30:00Z",
          name: "Documents",
          webUrl: "https://example.sharepoint.com/Shared%20Documents",
          driveType: "documentLibrary",
          createdBy: {
            user: {
              displayName: "System Account",
            },
          },
          owner: {
            group: {
              id: "9705118a-6ce1-4fa3-adba-09f94b69d568",
              displayName: "Example Team Site Owners",
            },
          },
          quota: {
            deleted: 0,
            remaining: 27487789251101,
            state: "normal",
            total: 27487790694400,
            used: 1443299,
          },
        },
      ],
    },
  },
});

const getDrive = action({
  display: {
    label: "Get Drive",
    description: "Returns the information and metadata of a SharePoint drive",
  },
  inputs: {
    connection,
    driveId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/drives/${params.driveId}`);
    return { data };
  },
});

const getFilesFromDrive = action({
  display: {
    label: "List Files in Drive (Deprecated)",
    description:
      "List all the files from a Drive. This version of the action" +
      " is being deprecated. Please replace action with List Files In Drive.",
  },
  inputs: {
    connection,
    driveId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, driveId }) => {
    const client = await createClient(connection, debug);
    const { data } = await client.get(`/drives/${driveId}/root/children`);

    return {
      data: data.value,
    };
  },
});

const getFilesFromDriveFolder = action({
  display: {
    label: "List Folder Files in Drive (Deprecated)",
    description:
      "List all the files inside of a folder from a Drive. This " +
      "version of the action is being deprecated. Please replace action with " +
      "List Folder Files In Drive.",
  },
  inputs: {
    connection,
    driveId,
    folderId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, folderId, driveId }) => {
    const client = await createClient(connection, debug);
    const { data } = await client.get(`/drives/${driveId}/items/${folderId}/children`);

    return {
      data: data.value,
    };
  },
});

const getFilesFromDriveWithPagination = action({
  display: {
    label: "List Files in Drive",
    description: "List all the files from a Drive",
  },
  inputs: {
    connection,
    driveId,
    pageLimit,
    pageToken,
    fetchAll,
    recursive,
  },
  perform: async (context, { connection, driveId, pageLimit, pageToken, fetchAll, recursive }) => {
    const client = await createClient(connection, context.debug.enabled);
    const endpoint = `/drives/${driveId}/root/children`;

    if (fetchAll) {
      if (recursive) {
        const { data } = await getFilesFromDriveRecursive.perform(context, {
          connection,
          driveId,
        });
        return { data };
      }
      const results = await paginateResults(client, endpoint);
      return {
        data: results,
      };
    }

    const { data } = await client.get(endpoint, {
      params: {
        $top: pageLimit,
        $skipToken: pageToken,
      },
    });

    if (data["@odata.nextLink"]) {
      const nextLink = new URL(data["@odata.nextLink"]);
      data["@odata.nextToken"] = nextLink.searchParams.get("$skipToken");
    }

    if (recursive) {
      const allFiles = await getFilesFromDriveFN(client, driveId, data.value);
      return {
        data: {
          ...data,
          value: allFiles,
        },
      };
    }

    return {
      data,
    };
  },
});

const getFilesFromDriveFolderWithPagination = action({
  display: {
    label: "List Folder Files in Drive",
    description: "List all the files inside of a folder from a Drive",
  },
  inputs: {
    connection,
    driveId,
    folderId,
    pageLimit,
    pageToken,
    fetchAll,
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, folderId, driveId, pageLimit, pageToken, fetchAll },
  ) => {
    const endpoint = `/drives/${driveId}/items/${folderId}/children`;
    const client = await createClient(connection, debug);

    if (fetchAll) {
      const results = await paginateResults(client, endpoint);
      return {
        data: results,
      };
    }

    const { data } = await client.get(endpoint, {
      params: {
        $top: pageLimit,
        $skipToken: pageToken,
      },
    });

    if (data["@odata.nextLink"]) {
      const nextLink = new URL(data["@odata.nextLink"]);
      data["@odata.nextToken"] = nextLink.searchParams.get("$skipToken");
    }

    return {
      data,
    };
  },
});

const getFile = action({
  display: {
    label: "Get File",
    description: "Get a file from a Drive",
  },
  inputs: {
    connection,
    driveId,
    itemId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, driveId, itemId }) => {
    const client = await createClient(connection, debug);
    try {
      const { data } = await client.get(`/drives/${driveId}/items/${itemId}/content`);
      return {
        data,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
});

const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified drive or folder's drive",
  },
  inputs: {
    connection,
    driveId,
    fileName,
    fileData,
    folderId,
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, driveId, fileName, folderId, fileData },
  ) => {
    const client = await createClient(connection, debug);
    const { data } = util.types.toData(fileData);
    const { data: uploadedData } = await client.put(
      `/drives/${driveId}/items/${folderId}:/${fileName}:/content`,
      Readable.from(data),
    );

    return {
      data: uploadedData,
    };
  },
});

const updateFile = action({
  display: {
    label: "Update File",
    description: "Update a file to the specified drive",
  },
  inputs: {
    connection,
    driveId,
    itemId,
    fileData,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, driveId, itemId, fileData }) => {
    const client = await createClient(connection, debug);
    const { data } = util.types.toData(fileData);
    const { data: updatedData } = await client.put(
      `/drives/${driveId}/items/${itemId}/content`,
      Readable.from(data),
    );

    return {
      data: updatedData,
    };
  },
});

const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file from the specified drive",
  },
  inputs: {
    connection,
    driveId,
    itemId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, itemId, driveId }) => {
    const client = await createClient(connection, debug);
    try {
      const { data } = await client.get(`/drives/${driveId}/items/${itemId}`);
      const downloadURL = data["@microsoft.graph.downloadUrl"];
      const mimeType = data.file.mimeType;
      const { data: downloadedFile } = await client.get(downloadURL, {
        responseType: "arraybuffer",
      });

      return {
        data: downloadedFile,
        contentType: mimeType,
      };
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
});

const getFilesFromDriveRecursive = action({
  display: {
    label: "List All Files in Drive (Recursive)",
    description: "List all files from a Drive, including files in all subfolders",
  },
  inputs: {
    connection,
    driveId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, driveId }) => {
    const client = await createClient(connection, debug);
    const data = await getFilesFromDriveFN(client, driveId);

    return {
      data,
    };
  },
});

export default {
  listDrives,
  getDrive,
  getFilesFromDrive,
  getFile,
  uploadFile,
  updateFile,
  downloadFile,
  getFilesFromDriveFolder,
  getFilesFromDriveFolderWithPagination,
  getFilesFromDriveWithPagination,
};
