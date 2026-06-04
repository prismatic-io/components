import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { createSoftwareInputs as inputs } from "../../inputs/software";

export const createSoftware = action({
  display: {
    label: "Create Software",
    description: "Creates a new software application in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
      name,
      description,
      applicationType,
      status,
      managedById,
      notes,
      category,
      source,
      workspaceId,
      softwareAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      application: {
        name,
        description,
        application_type: applicationType,
        category,
        status,
        source,
        managed_by_id: managedById,
        notes,
        workspace_id: workspaceId,
        ...softwareAdditionalFields,
      },
    };

    const { data } = await client.post(`/applications`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
