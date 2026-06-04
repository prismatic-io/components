import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { checkItemExistsInputs } from "../../inputs";
import { checkItemExistsExamplePayload } from "../../examplePayloads/items/checkItemExistsExamplePayload";

export const checkItemExists = action({
  display: {
    label: "Check Item Exists",
    description: "Check if a file or folder exists in a SharePoint drive",
  },
  inputs: checkItemExistsInputs,
  perform: async (context, { connection, siteId, driveId, itemPath }) => {
    const client = await createClient(connection, context.debug.enabled);

    try {
      
      const { data } = await client.get(`/sites/${siteId}/drives/${driveId}/root:/${itemPath}`);

      return {
        data: {
          exists: true,
          message: `Item "${itemPath}" exists in the specified drive`,
          item: data,
        },
      };
    } catch (error) {
      const err = error as { status: number };

      const status = err.status;

      
      if (status === 404) {
        return {
          data: {
            exists: false,
            message: `Item "${itemPath}" does not exist in the specified drive`,
          },
        };
      }

      throw error;
    }
  },
  examplePayload: checkItemExistsExamplePayload,
});
