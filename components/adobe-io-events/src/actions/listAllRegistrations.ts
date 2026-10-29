import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { listAllRegistrationsExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import { connection, consumerOrgId, projectId, workspaceId } from "../inputs";

export const listAllRegistrations = action({
  display: {
    label: "List All Registrations",
    description:
      "List all Adobe I/O Events Registrations entitled to the provided Workspace ID",
  },
  examplePayload: listAllRegistrationsExamplePayload,
  perform: async (
    context,
    { connection, consumerOrgId, projectId, workspaceId },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${consumerOrgId}/${projectId}/${workspaceId}/registrations`,
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
  },
});
