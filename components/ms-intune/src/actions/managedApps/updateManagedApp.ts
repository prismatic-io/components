import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateManagedAppExamplePayload } from "../../examplePayloads";
import { updateManagedAppInputs } from "../../inputs";
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
      isFeatured,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, true);
    const largeIcon =
      additionalFields.largeIconType && additionalFields.largeIconValue
        ? {
            "@odata.type": "microsoft.graph.mimeContent",
            type: additionalFields.largeIconType,
            value: additionalFields.largeIconValue,
          }
        : undefined;
    const payload = {
      "@odata.type": odataTypeApp,
      displayName,
      description,
      publisher: additionalFields.publisher,
      largeIcon,
      isFeatured,
      privacyInformationUrl: additionalFields.privacyInformationUrl,
      informationUrl: additionalFields.informationUrl,
      owner: additionalFields.owner,
      developer: additionalFields.developer,
      notes: additionalFields.notes,
      ...(additionalFields.specificPlatformProperties &&
        additionalFields.specificPlatformProperties),
    };
    const { data } = await client.patch(
      `${ENDPOINTS.MOBILE_APPS}/${mobileAppId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: updateManagedAppInputs,
  examplePayload: updateManagedAppExamplePayload,
});
