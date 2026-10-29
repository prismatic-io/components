import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { deleteInstancedWebhooksExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import { connection, consumerOrgId, projectId, workspaceId } from "../inputs";
import type { Registrations } from "../types/Registrations";

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description:
      "Delete all Adobe I/O Webhook Registrations entitled to the provided Workspace ID",
  },
  examplePayload: deleteInstancedWebhooksExamplePayload,
  perform: async (
    context,
    { connection, consumerOrgId, projectId, workspaceId },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    try {
      const { data: registrationsData } = await client.get<Registrations>(
        `/${consumerOrgId}/${projectId}/${workspaceId}/registrations`,
      );

      const webhookRegistrations =
        registrationsData._embedded.registrations.filter(
          (registration) => registration.delivery_type === "webhook",
        );

      const deletePromises: Promise<{
        message: string;
      }>[] = webhookRegistrations.map(async (registration) => {
        try {
          await client.delete(
            `/${consumerOrgId}/${projectId}/${workspaceId}/registrations/${registration.registration_id}`,
          );
          return {
            message: `Registration ${registration.registration_id} was successfully deleted.`,
          };
        } catch (error) {
          return {
            message: `Failed to delete registration ${
              registration.registration_id
            }: ${JSON.stringify(error)}`,
          };
        }
      });

      const results = await Promise.all(deletePromises);

      return { data: results };
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
