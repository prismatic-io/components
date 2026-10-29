import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectBlobExamplePayload } from "../examplePayloads";
import { connectionInput, containerName, prefix } from "../inputs";

export const selectBlob = dataSource({
  display: {
    label: "Select Blob",
    description: "Select a blob from an Azure Storage container",
  },
  inputs: {
    azureConnection: connectionInput,
    containerName: {
      ...containerName,
      dataSource: undefined,
    },
    prefix: {
      ...prefix,
      comments:
        "Optionally filter blobs by prefix (e.g., 'documents/' to show only blobs in that folder)",
    },
  },
  perform: async (_context, { azureConnection, containerName, prefix }) => {
    const client = createAuthorizedClient(azureConnection);
    const containerClient = client.getContainerClient(containerName);

    const blobs: Element[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      prefix: prefix,
    })) {
      blobs.push({
        label: blob.name,
        key: blob.name,
      });
    }

    return { result: blobs };
  },
  dataSourceType: "picklist",
  examplePayload: selectBlobExamplePayload,
});
