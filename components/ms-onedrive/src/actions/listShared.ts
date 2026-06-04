import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection } from "../inputs";
import { handleErrors } from "../errors";
import { listSharedExamplePayload } from "../examplePayloads";

export const listShared = action({
  display: {
    label: "List Shared",
    description: "List shared items in SharePoint or OneDrive",
  },
  inputs: {
    connection: oneDriveConnection,
  },
  perform: async (context, { connection }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(client.get("/me/insights/shared")),
    };
  },
  examplePayload: listSharedExamplePayload,
});

export default listShared;
