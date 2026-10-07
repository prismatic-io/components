import { action, outputSchema } from "@prismatic-io/spectral";
import type { Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteUploadExamplePayload } from "../../examplePayloads";
import { deleteUploadInputs } from "../../inputs";
import { deleteUploadOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const deleteUpload = action({
  display: {
    label: "Delete Upload",
    description: "Deletes a file from temporary data storage.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteUploadExamplePayload,
  inputs: deleteUploadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteUploadOutputSchema,
  }),
  examplePayload: deleteUploadExamplePayload,
});
