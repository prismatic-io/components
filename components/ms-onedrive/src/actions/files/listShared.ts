import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { listSharedExamplePayload } from "../../examplePayloads";
import { listSharedInputs } from "../../inputs";

export const listShared = action({
  display: {
    label: "List Shared",
    description: "List shared items in SharePoint or OneDrive",
  },
  inputs: listSharedInputs,
  perform: async (context, { connection }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(client.get("/me/insights/shared")),
    };
  },
  examplePayload: listSharedExamplePayload,
});

export default listShared;
