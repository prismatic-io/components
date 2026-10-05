import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createS3Client } from "../../client";
import { getCurrentAccountExamplePayload } from "../../examplePayloads";
import { getCurrentAccountInputs } from "../../inputs";
import { getCurrentAccountOutputSchema } from "../../outputSchemas";
export const getCurrentAccount = action({
  display: {
    label: "Get Current Account",
    description: "Get the current AWS account",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      accessKey,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const s3 = await createS3Client({
      awsConnection: accessKey,
      awsRegion: "",
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const sts = new STSClient({ credentials: s3.config.credentials });
    const command = new GetCallerIdentityCommand({});
    const response = await sts.send(command);
    return { data: response };
  },
  inputs: getCurrentAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentAccountOutputSchema,
  }),
  examplePayload: getCurrentAccountExamplePayload,
});
