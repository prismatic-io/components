import { action } from "@prismatic-io/spectral";
import type { Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteUploadInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const deleteUpload = action({
  display: {
    label: "Delete Upload",
    description: "Deletes a file from temporary data storage.",
  },
  perform: async (
    context,
    { connection, environmentId, spaceId, uploadId },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const upload = await environment.getUpload(uploadId);
    await upload.delete();
    return {
      data: {},
    };
  },
  inputs: deleteUploadInputs,
  examplePayload: { data: {} },
});
