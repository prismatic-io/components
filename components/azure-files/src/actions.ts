import {
  type DirectoryCreateResponse,
  type DirectoryDeleteResponse,
  type FileCreateResponse,
  type FileDeleteResponse,
  type FileStartCopyResponse,
  type ShareCreateResponse,
  type ShareDeleteResponse,
  type ShareItem,
} from "@azure/storage-file-share";
import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "./client";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  connectionInput,
  fileContents,
  fromPath,
  path,
  shareName,
  sourceUrlInput,
  toPath,
} from "./inputs";
import {
  listSharesExamplePayload,
  createShareExamplePayload,
  deleteShareExamplePayload,
  listFolderExamplePayload,
  createFolderExamplePayload,
  deleteFolderExamplePayload,
  uploadFileExamplePayload,
  saveFromUrlExamplePayload,
  downloadFileExamplePayload,
  deleteFileExamplePayload,
  copyFileExamplePayload,
} from "./examplePayloads";

const listShares = action({
  display: {
    label: "List Shares",
    description: "Get a list of file shares available in the account",
  },
  perform: async (context, params) => {
    const client = createAuthorizedClient(params.azureConnection);
    const shares: ShareItem[] = [];
    for await (const share of client.listShares()) {
      shares.push(share);
    }
    return { data: shares };
  },
  inputs: { azureConnection: connectionInput },
  examplePayload: listSharesExamplePayload,
});

const createShare = action({
  display: {
    label: "Create Share",
    description: "Create a file share",
  },
  perform: async (context, { shareName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const { shareCreateResponse } = await client.createShare(shareName);

    return {
      data: shareCreateResponse as Omit<ShareCreateResponse, "_response">,
    };
  },
  inputs: { shareName, azureConnection: connectionInput },
  examplePayload: createShareExamplePayload,
});

const deleteShare = action({
  display: {
    label: "Delete Share",
    description: "Delete a file share",
  },
  perform: async (context, { shareName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    return {
      data: (await client.deleteShare(shareName)) as Omit<
        ShareDeleteResponse,
        "_response"
      >,
    };
  },
  inputs: { shareName, azureConnection: connectionInput },
  examplePayload: deleteShareExamplePayload,
});

const listFolder = action({
  display: {
    label: "List Folder",
    description: "List files and folders in a folder",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const directoryClient = shareClient.getDirectoryClient(path);
    const entries = [];
    for await (const entry of directoryClient.listFilesAndDirectories()) {
      entries.push(entry);
    }
    return { data: entries };
  },
  inputs: {
    shareName,
    path: { ...path, required: false },
    azureConnection: connectionInput,
  },
  examplePayload: listFolderExamplePayload,
});

const createFolder = action({
  display: {
    label: "Create Folder",
    description: "Create a folder under an existing path",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const { directoryCreateResponse } = await shareClient.createDirectory(path);
    return {
      data: directoryCreateResponse as Omit<
        DirectoryCreateResponse,
        "_response"
      >,
    };
  },
  inputs: { shareName, path, azureConnection: connectionInput },
  examplePayload: createFolderExamplePayload,
});

const deleteFolder = action({
  display: {
    label: "Delete Folder",
    description: "Delete an empty folder under an existing path",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const response = await shareClient.deleteDirectory(path);
    return { data: response as Omit<DirectoryDeleteResponse, "_response"> };
  },
  inputs: { shareName, path, azureConnection: connectionInput },
  examplePayload: deleteFolderExamplePayload,
});

const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file under an existing path",
  },
  perform: async (
    context,
    { shareName, path, fileContents, azureConnection },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);

    context.logger.info({ contentType: fileContents.contentType });

    
    
    const { fileClient, fileCreateResponse } = await shareClient.createFile(
      path,
      Buffer.byteLength(fileContents.data),
    );
    await fileClient.uploadData(fileContents.data, {
      fileHttpHeaders: {
        fileContentType: fileContents.contentType,
      },
    });
    return {
      data: fileCreateResponse as Omit<FileCreateResponse, "_response">,
    };
  },
  inputs: { shareName, path, fileContents, azureConnection: connectionInput },
  examplePayload: uploadFileExamplePayload,
});

export const saveFromUrl = action({
  display: {
    label: "Save From URL",
    description: "Save a file from a URL to Azure Files",
  },
  perform: async (context, { azureConnection, shareName, sourceUrl, path }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);

    
    const response = await createClient({
      baseUrl: sourceUrl,
    }).get("", {
      responseType: "stream",
    });

    const fileSize = Number(response.headers["content-length"]);

    if (!fileSize) {
      throw new Error(
        "Source file server did not include a content-length header. Azure Files requires that the file size is known ahead of time.",
      );
    }

    const { fileClient, fileCreateResponse } = await shareClient.createFile(
      path,
      fileSize,
    );

    
    await fileClient.uploadStream(response.data, fileSize, 4 * 1024 * 1024, 4);

    return {
      data: fileCreateResponse as Omit<FileCreateResponse, "_response">,
    };
  },
  inputs: {
    azureConnection: connectionInput,
    shareName,
    path,
    sourceUrl: sourceUrlInput,
  },
  examplePayload: saveFromUrlExamplePayload,
});

const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const fileClient = shareClient.rootDirectoryClient.getFileClient(path);
    const { contentType } = await fileClient.getProperties();
    return {
      data: await fileClient.downloadToBuffer(),
      contentType,
    };
  },
  inputs: { shareName, path, azureConnection: connectionInput },
  examplePayload: downloadFileExamplePayload,
});

const deleteFile = action({
  display: {
    label: "Delete File",
    description: "Delete a file",
  },
  perform: async (context, { shareName, path, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const response = await shareClient.deleteFile(path);
    return { data: response as Omit<FileDeleteResponse, "_response"> };
  },
  inputs: { shareName, path, azureConnection: connectionInput },
  examplePayload: deleteFileExamplePayload,
});

const copyFile = action({
  display: {
    label: "Copy File",
    description: "Copy a file",
  },
  perform: async (
    context,
    { shareName, toPath, fromPath, azureConnection },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const fromFileClient =
      shareClient.rootDirectoryClient.getFileClient(fromPath);
    const toFileClient = shareClient.rootDirectoryClient.getFileClient(toPath);
    return {
      data: (await toFileClient.startCopyFromURL(fromFileClient.url)) as Omit<
        FileStartCopyResponse,
        "_response"
      >,
    };
  },
  inputs: { shareName, fromPath, toPath, azureConnection: connectionInput },
  examplePayload: copyFileExamplePayload,
});

export default {
  listShares,
  createShare,
  deleteShare,
  listFolder,
  createFolder,
  deleteFolder,
  uploadFile,
  saveFromUrl,
  downloadFile,
  deleteFile,
  copyFile,
};
