import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import {
  oneDriveConnection,
  $select,
  $expand,
  $top,
  deltaURL,
} from "../inputs";
import { listChangesExamplePayload } from "../examplePayloads";

export const listChanges = action({
  display: {
    label: "List Changes",
    description: "Track changes in a driveItem and its children over time.",
  },
  inputs: {
    oneDriveConnection,
    deltaURL,
    $select,
    $expand,
    $top,
  },
  perform: async (
    context,
    { oneDriveConnection, deltaURL, $expand, $select, $top },
  ) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.get(deltaURL, {
      params: {
        $expand: $expand || undefined,
        $select: $select || undefined,
        $top: $top || undefined,
      },
    });
    return { data };
  },
  examplePayload: listChangesExamplePayload,
});
