import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import createManagedAppInputs from "../../../inputs/apps/managed/createManagedAppInputs";
import { createManagedAppExamplePayload } from "../../../examplePayloads";

export const createManagedApp = action({
  display: {
    label: "Create Managed App",
    description: "Create a new App object.",
  },
  perform: async (
    context,
    {
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
      ...specificPlatformProperties,
    };
    const { data } = await client.post(
      "/deviceAppManagement/mobileApps",
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...createManagedAppInputs,
  },
  examplePayload: createManagedAppExamplePayload,
});
