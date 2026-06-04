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
      name,
      description,
      applicationType,
      status,
      managedById,
      notes,
      category,
      source,
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
