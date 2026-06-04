import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import updateManagedAppInputs from "../../../inputs/apps/managed/updateManagedAppInputs";
import { updateManagedAppExamplePayload } from "../../../examplePayloads";

export const updateManagedApp = action({
  display: {
    label: "Update Managed App",
    description: "Update an App object.",
  },
  perform: async (
    context,
    {
      mobileAppId,
      connection,
      odataTypeApp,
      displayName,
      description,
      publisher,
      isFeatured,
      privacyInformationUrl,
      informationUrl,
      owner,
      developer,
      notes,
      specificPlatformProperties,
      largeIconType,
      largeIconValue,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, true);
    const largeIcon =
      largeIconType && largeIconValue
        ? {
            "@odata.type": "microsoft.graph.mimeContent",
            type: largeIconType,
            value: largeIconValue,
          }
        : undefined;
    const payload = {
      "@odata.type": odataTypeApp,
      displayName,
      description,
      publisher,
      largeIcon,
      isFeatured,
      privacyInformationUrl,
      informationUrl,
      owner,
      developer,
      notes,
      ...(specificPlatformProperties && specificPlatformProperties),
    };
    const { data } = await client.patch(
      `/deviceAppManagement/mobileApps/${mobileAppId}`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateManagedAppInputs,
  },
  examplePayload: updateManagedAppExamplePayload,
});
