import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, ODATA_TYPES } from "../../constants";
import { createManagedAppExamplePayload } from "../../examplePayloads";
import { createManagedAppInputs } from "../../inputs";
import { createManagedAppOutputSchema } from "../../outputSchemas";

export const createManagedApp = action({
  display: {
    label: "Create Managed App",
    description: "Create a new App object.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createManagedAppOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      odataTypeApp,
      displayName,
      description,
      isFeatured,
      additionalFields,
      specificPlatformProperties,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, true);
    const largeIcon =
      additionalFields.largeIconType && additionalFields.largeIconValue
        ? {
            "@odata.type": ODATA_TYPES.MIME_CONTENT,
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
      ...specificPlatformProperties,
    };
    const { data } = await client.post(ENDPOINTS.MOBILE_APPS, payload);

    return {
      data,
    };
  },
  examplePerform: async () => createManagedAppExamplePayload,
  inputs: createManagedAppInputs,
  examplePayload: createManagedAppExamplePayload,
});
