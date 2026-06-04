import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { deleteEventsProviderExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import {
  connection,
  consumerOrgId,
  projectId,
  providerId,
  workspaceId,
} from "../inputs";

export const deleteEventsProvider = action({
  display: {
    label: "Delete Events Provider",
    description: "Delete an Adobe I/O Events Provider by ID",
  },
  examplePayload: deleteEventsProviderExamplePayload,
  perform: async (
    context,
    { connection, consumerOrgId, projectId, workspaceId, providerId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    try {
      const { data } = await client.delete(
        `/${consumerOrgId}/${projectId}/${workspaceId}/providers/${providerId}`,
      );
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
  inputs: {
    connection,
    consumerOrgId,
    projectId,
    workspaceId,
    providerId,
  },
});
