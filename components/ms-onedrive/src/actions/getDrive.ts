import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, driveId } from "../inputs";
import { handleErrors } from "../errors";
import { getDriveExamplePayload } from "../examplePayloads";

export const getDrive = action({
  display: {
    label: "Get Drive",
    description: "Get the information and metadata of a drive",
  },
  perform: async (context, { connection, driveId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/drives/${driveId}`)),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    driveId,
  },
  examplePayload: getDriveExamplePayload,
});
