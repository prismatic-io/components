import { SQS } from "@aws-sdk/client-sqs";
import { type ClientProps, getClientParams } from "aws-utils";
import { accessKeySecretPair } from "./connections";

export const createSQSClient = async ({
  awsRegion,
  awsConnection,
  dynamicAccessKeyId,
  dynamicSecretAccessKey,
  dynamicSessionToken,
}: ClientProps): Promise<SQS> => {
  const { region, credentials } = await getClientParams({
    awsRegion,
    awsConnection,
    validConnectionKeys: [accessKeySecretPair.key],
    dynamicAccessKeyId,
    dynamicSecretAccessKey,
    dynamicSessionToken,
  });
  return new SQS({
    credentials,
    region,
  });
};
