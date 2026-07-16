import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postFilesByContainerIdExamplePayload } from "../../examplePayloads";
import { postFilesByContainerIdInputs } from "../../inputs";
export const postFilesByContainerId = action({
  display: {
    label: "Upload Files by Container ID",
    description:
      "Loads a file into the specified file container. Creates a temporary location to store the file and saves file metadata such as size and checksum.",
  },
  perform: async (context, { connection, tenant, fileContainerId, file }) => {
    const client = getClient(connection, context.debug.enabled);
    const formData = new FormData();
    formData.append("file", file.data);
    const { data } = await client.post(
      `${SERVICES.prismAnalytics}/${tenant}/fileContainers/${fileContainerId}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...formData.getHeaders(),
        },
      },
    );
    return { data };
  },
  inputs: postFilesByContainerIdInputs,
  examplePayload: postFilesByContainerIdExamplePayload,
});
