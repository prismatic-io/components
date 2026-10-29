import { LambdaClient } from "@aws-sdk/client-lambda";
import { type ClientProps, getClientParams } from "aws-utils";
import { accessKeySecretPair } from "./connections";

export const createClient = async ({
  awsRegion,
  awsConnection,
  dynamicAccessKeyId,
  dynamicSecretAccessKey,
  dynamicSessionToken,
}: ClientProps): Promise<LambdaClient> => {
  const { region, credentials } = await getClientParams({
    awsRegion,
    awsConnection,
    validConnectionKeys: [accessKeySecretPair.key],
    dynamicAccessKeyId,
    dynamicSecretAccessKey,
    dynamicSessionToken,
  });
  return new LambdaClient({
    region,
    credentials,
  });
};
