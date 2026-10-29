import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { deleteRegistrationExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import {
  connection,
  consumerOrgId,
  projectId,
  registrationId,
  workspaceId,
} from "../inputs";

export const deleteRegistration = action({
  display: {
    label: "Delete Registration (Webhook/Journal)",
    description: "Delete Registration by Registration ID (Webhook/Journal)",
  },
  examplePayload: deleteRegistrationExamplePayload,
  perform: async (
    context,
    { connection, consumerOrgId, projectId, workspaceId, registrationId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    try {
      const { data } = await client.delete(
        `/${consumerOrgId}/${projectId}/${workspaceId}/registrations/${registrationId}`,
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
    registrationId,
  },
});
