import { action, outputSchema } from "@prismatic-io/spectral";
import type { Environment, UploadProps } from "contentful-management";
import { createClient } from "../../client";
import { getUploadExamplePayload } from "../../examplePayloads";
import { getUploadInputs } from "../../inputs";
import { getUploadOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const getUpload = action({
  display: {
    label: "Get Upload",
    description: "Retrieves an unmodified image.",
  },
  performSafety: "safe",
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
    const data: UploadProps = (
      await environment.getUpload(uploadId)
    ).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  inputs: getUploadInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUploadOutputSchema,
  }),
  examplePayload: getUploadExamplePayload,
});
