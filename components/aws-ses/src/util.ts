import {
  type IdentityType,
  ListIdentitiesCommand,
  type ListIdentitiesCommandOutput,
  type SESClient,
} from "@aws-sdk/client-ses";
import { util } from "@prismatic-io/spectral";
import { paginateAwsResults } from "aws-utils";

export const cleanStringList = (value: unknown): string[] =>
  (value as unknown[])
    .map((item) => util.types.toString(item).split(","))
    .flat()
    .filter(Boolean);

export const getAllIdentities = async ({
  client,
  identityType,
}: {
  client: SESClient;
  identityType: IdentityType | undefined;
}) => {
  const { allItems, lastResponse } =
    await paginateAwsResults<ListIdentitiesCommandOutput>({
      client,
      createCommand: (token) =>
        new ListIdentitiesCommand({
          IdentityType: identityType,
          NextToken: token,
        }),
      itemsKey: "Identities",
    });

  return {
    identities: allItems,
    lastResponse,
  };
};
