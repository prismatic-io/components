import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getFilesByContainerIdExamplePayload } from "../../examplePayloads";
import { getFilesByContainerIdInputs } from "../../inputs";
import { getFilesByContainerIdOutputSchema } from "../../outputSchemas";

export const getFilesByContainerId = action({
  display: {
    label: "Get Files by Container ID",
    description:
      "Retrieves all files for a file container. Returns file metadata such as file name, size, checksum, and state (Timed Out, Uploading, Failed, Success). Only files with state 'Success' are ready for upload.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, tenant, fileContainerId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/fileContainers/${fileContainerId}/files`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => getFilesByContainerIdExamplePayload,
  inputs: getFilesByContainerIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFilesByContainerIdOutputSchema,
  }),
  examplePayload: getFilesByContainerIdExamplePayload,
});
