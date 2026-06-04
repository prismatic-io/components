import { type IdentityType, ListIdentitiesCommand } from "@aws-sdk/client-ses";
import { action, util } from "@prismatic-io/spectral";
import { awsRegion } from "aws-utils";
import { createClient } from "../auth";
import { listIdentitiesExamplePayload } from "../examplePayloads";
import { connectionInput, fetchAll, identityType, nextToken } from "../inputs";
import { getAllIdentities } from "../util";

export const listIdentities = action({
  display: {
    label: "List Identities",
    description: "List Identities available in Amazon SES",
  },
  perform: async (context, params) => {
    const client = await createClient({
      awsConnection: params.awsConnection,
      awsRegion: util.types.toString(params.awsRegion),
    });

    if (params.fetchAll) {
      const { identities, lastResponse } = await getAllIdentities({
        client,
        identityType: params.identityType as IdentityType,
      });

      return {
        data: {
          $metadata: lastResponse.$metadata,
          Identities: identities,
        },
      };
    }

    const command = new ListIdentitiesCommand({
      IdentityType: params.identityType as IdentityType,
      NextToken: params.nextToken || undefined,
    });
    const response = await client.send(command);
    return { data: response };
  },
  inputs: {
    awsConnection: connectionInput,
    awsRegion,
    identityType,
    fetchAll,
    nextToken,
  },
  examplePayload: listIdentitiesExamplePayload,
});
