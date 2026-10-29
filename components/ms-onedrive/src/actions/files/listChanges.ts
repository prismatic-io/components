import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";

export const listChanges = action({
  display: {
    label: "List Changes",
    description: "Track changes in a driveItem and its children over time.",
  },
  inputs: listChangesInputs,
  perform: async (
    context,
    { oneDriveConnection, deltaURL, $expand, $select, $top },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.get(deltaURL, {
      params: {
        $expand,
        $select,
        $top,
      },
    });
    return { data };
  },
  examplePayload: listChangesExamplePayload,
});
