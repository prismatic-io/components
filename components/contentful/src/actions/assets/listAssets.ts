import { action } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { listAssetsExamplePayload } from "../../examplePayloads";
import { listAssetsInputs } from "../../inputs";
import { getAllPaginatedItems, getEnvironment } from "../../util";

export const listAssets = action({
  display: {
    label: "List Assets",
    description: "Retrieves all assets of a space.",
  },
  perform: async (context, { connection, environmentId, spaceId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const allItems: AssetProps[] = await getAllPaginatedItems<
      Asset,
      AssetProps
    >(environment.getAssets.bind(environment));

    return {
      data: allItems as unknown, 
    };
  },
  inputs: listAssetsInputs,
  examplePayload: { data: listAssetsExamplePayload },
});
