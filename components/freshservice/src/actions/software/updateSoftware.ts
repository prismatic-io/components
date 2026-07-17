import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { updateSoftwareInputs as inputs } from "../../inputs/software";
export const updateSoftware = action({
  display: {
    label: "Update Software",
    description: "Updates an existing software application.",
  },
  perform: async (
    context,
    {
      connection,
      applicationId,
      managedById,
      additionalFields,
      softwareAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const payload = {
      application: {
        name: additionalFields.name,
        description: additionalFields.description,
        application_type: additionalFields.applicationType,
        category: additionalFields.category,
        status: additionalFields.status,
        source: additionalFields.source,
        managed_by_id: managedById,
        notes: additionalFields.notes,
        ...softwareAdditionalFields,
      },
    };
    const { data } = await client.put(
      `/applications/${applicationId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
