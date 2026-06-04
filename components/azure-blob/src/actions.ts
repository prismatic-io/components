import {
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "./client";
import {
  blobName,
  connectionInput,
  containerName,
  fileContents,
  pageBlobOffset,
  pageBlobSize,
  prefix,
  sasExpiresOnDate,
  sasPermissions,
  sasStartsOnDate,
} from "./inputs";

const fakeAzureResponse = {
  _response: {
    parsedHeaders: {},
    status: 200,
    headers: {},
    request: {
      url: "www.example.com",
      method: "POST",
      headers: undefined,
      withCredentials: false,
      timeout: 500,
      requestId: "exampleID",
      validateRequestProperties: undefined,
      prepare: undefined,
      clone: undefined,
    },
  },
};

const exampleAzure = {
  data: fakeAzureResponse,
};

const listContainers = action({
  display: {
    label: "List Containers",
    description: "Get a list of containers available in the account",
  },
  perform: async (_context, params) => {
    const client = createAuthorizedClient(params.azureConnection);
    const containers = [];
    for await (const container of client.listContainers({})) {
      containers.push(container);
    }
    return {
      data: containers,
    };
  },
  inputs: { azureConnection: connectionInput },
  examplePayload: {
    data: [
      {
        name: "Example",
        properties: {
          lastModified: new Date("2020-01-01"),
          etag: "Example Tag",
        },
      },
    ],
  },
});

const createContainer = action({
  display: {
    label: "Create Container",
    description: "Create a container",
  },
  perform: async (_context, { containerName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const { containerCreateResponse } = await client.createContainer(containerName);
    return {
      data: containerCreateResponse,
    };
  },
  inputs: { containerName, azureConnection: connectionInput },
  examplePayload: exampleAzure,
});

const deleteContainer = action({
  display: {
    label: "Delete Container",
    description: "Delete a container",
  },
  perform: async (_context, { containerName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    return {
      data: await client.deleteContainer(containerName),
    };
  },
  inputs: { containerName, azureConnection: connectionInput },
  examplePayload: exampleAzure,
});

const listBlobs = action({
  display: {
    label: "List Blobs",
    description: "Get a list of blobs in a container",
  },
  perform: async (_context, { containerName, prefix, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobs = [];
    for await (const blob of containerClient.listBlobsFlat({
      prefix: prefix,
    })) {
      blobs.push(blob);
    }
    return {
      data: blobs,
    };
  },
  inputs: { containerName, prefix, azureConnection: connectionInput },
  examplePayload: {
    data: [
      {
        name: "Example",
        deleted: false,
        snapshot: "",
        properties: {
          lastModified: new Date("2020-01-01"),
          etag: "Example Tag",
        },
      },
    ],
  },
});

const createAppendBlob = action({
  display: {
    label: "Create Append Blob",
    description: 'Create an empty append blob object (use "Append to Append Blob" to add blocks)',
  },
  perform: async (_context, { containerName, blobName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getAppendBlobClient(util.types.toString(blobName));
    const result = await blobClient.create();
    return {
      data: result,
    };
  },
  inputs: { containerName, blobName, azureConnection: connectionInput },
  examplePayload: exampleAzure,
});

const appendToAppendBlob = action({
  display: {
    label: "Append to Append Blob",
    description: "Append blocks to an existing append blob",
  },
  perform: async (_context, { containerName, blobName, fileContents, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getAppendBlobClient(util.types.toString(blobName));

    const { data } = util.types.toData(fileContents);
    const result = await blobClient.appendBlock(data, Buffer.byteLength(data));
    return {
      data: result,
    };
  },
  inputs: {
    containerName,
    blobName,
    fileContents,
    azureConnection: connectionInput,
  },
  examplePayload: exampleAzure,
});

const createPageBlob = action({
  display: {
    label: "Create Page Blob",
    description: "Create a page blob with a specific size (must be a multiple of 512 bytes)",
  },
  perform: async (_context, { containerName, blobName, pageBlobSize, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getPageBlobClient(util.types.toString(blobName));
    const result = await blobClient.create(Number(pageBlobSize));
    return {
      data: result,
    };
  },
  inputs: {
    containerName,
    blobName,
    pageBlobSize,
    azureConnection: connectionInput,
  },
  examplePayload: exampleAzure,
});

const resizePageBlob = action({
  display: {
    label: "Resize Page Blob",
    description: "Resize an existing page blob (must be a multiple of 512 bytes)",
  },
  perform: async (_context, { containerName, blobName, pageBlobSize, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getPageBlobClient(util.types.toString(blobName));
    const result = await blobClient.resize(Number(pageBlobSize));
    return {
      data: result,
    };
  },
  inputs: {
    containerName,
    blobName,
    pageBlobSize,
    azureConnection: connectionInput,
  },
  examplePayload: exampleAzure,
});

const uploadToPageBlob = action({
  display: {
    label: "Upload to Page Blob",
    description:
      "Upload to an existing page blob (both data size and offset must be a multiple of 512)",
  },
  perform: async (
    _context,
    { containerName, blobName, pageBlobOffset, fileContents, azureConnection },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getPageBlobClient(util.types.toString(blobName));

    const { data } = util.types.toData(fileContents);
    const result = await blobClient.uploadPages(
      data,
      Number(pageBlobOffset),
      Buffer.byteLength(data),
    );
    return {
      data: result,
    };
  },
  inputs: {
    containerName,
    blobName,
    pageBlobOffset,
    fileContents,
    azureConnection: connectionInput,
  },
  examplePayload: exampleAzure,
});

const uploadBlockBlob = action({
  display: {
    label: "Upload Block Blob",
    description: "Upload file data to a block blob object",
  },
  perform: async (_context, { containerName, blobName, fileContents, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(util.types.toString(blobName));

    const { data } = util.types.toData(fileContents);
    const result = await blobClient.upload(data, Buffer.byteLength(data));
    return {
      data: result,
    };
  },
  inputs: {
    containerName,
    blobName,
    fileContents,
    azureConnection: connectionInput,
  },
  examplePayload: exampleAzure,
});

const downloadBlob = action({
  display: {
    label: "Download Blob",
    description: "Download a blob",
  },
  perform: async (_context, { containerName, blobName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(util.types.toString(blobName));
    const { contentType } = await blobClient.getProperties();
    return {
      data: await blobClient.downloadToBuffer(),
      contentType,
    };
  },
  inputs: { containerName, blobName, azureConnection: connectionInput },
  examplePayload: {
    data: Buffer.from("Example"),
    contentType: "application/octet",
  },
});

const deleteBlob = action({
  display: {
    label: "Delete Blob",
    description: "Delete a blob",
  },
  perform: async (_context, { containerName, blobName, azureConnection }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);
    const response = await containerClient.deleteBlob(util.types.toString(blobName));
    return {
      data: response,
    };
  },
  inputs: { containerName, blobName, azureConnection: connectionInput },
  examplePayload: exampleAzure,
});

const generateSasUrl = action({
  display: {
    label: "Generate Shared Access Signature URL",
    description: "Generate a pre-signed URL (Shared Access Signature or SAS) for a blob",
  },
  inputs: {
    azureConnection: connectionInput,
    containerName,
    blobName: {
      ...blobName,
      comments: "A blob is a file that is saved in a 'container'. This represents the file's name.",
    },
    sasStartsOnDate,
    sasPermissions,
    sasExpiresOnDate,
  },
  perform: async (
    _context,
    { azureConnection, sasPermissions, sasExpiresOnDate, sasStartsOnDate, blobName, containerName },
  ) => {
    const client = createAuthorizedClient(azureConnection);
    const parsedBlobName = util.types.toString(blobName);
    const containerClient = client.getContainerClient(containerName);

    const sharedKeyCredential = new StorageSharedKeyCredential(
      util.types.toString(azureConnection.fields.accountName),
      util.types.toString(azureConnection.fields.accountKey),
    );

    const sasOptions = {
      containerName: containerClient.containerName,
      blobName: parsedBlobName,
      startsOn: new Date(util.types.toString(sasStartsOnDate)),
      expiresOn: new Date(util.types.toString(sasExpiresOnDate)),
      permissions: BlobSASPermissions.parse(util.types.toString(sasPermissions)),
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

    return Promise.resolve({
      data: `${containerClient.getBlockBlobClient(parsedBlobName).url}?${sasToken}`,
    });
  },
});

export default {
  listContainers,
  createContainer,
  deleteContainer,
  listBlobs,
  createAppendBlob,
  appendToAppendBlob,
  createPageBlob,
  resizePageBlob,
  uploadToPageBlob,
  uploadBlockBlob,
  downloadBlob,
  deleteBlob,
  generateSasUrl,
};
