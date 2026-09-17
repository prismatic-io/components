import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { createSoftwareInputs as inputs } from "../../inputs";
import { softwareOutputSchema } from "../../outputSchemas";
export const createSoftware = action({
  display: {
    label: "Create Software",
    description: "Creates a new software application in Freshservice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      name,
      description,
      applicationType,
      managedById,
      additionalFields,
      workspaceId,
      softwareAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      application: {
        name,
        description,
        application_type: applicationType,
        category: additionalFields.category,
        status: additionalFields.status,
        source: additionalFields.source,
        managed_by_id: managedById,
        notes: additionalFields.notes,
        workspace_id: workspaceId,
        ...softwareAdditionalFields,
      },
    };
    const { data } = await client.post(`/applications`, payload);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: softwareOutputSchema,
  }),
  inputs,
  examplePayload,
});
