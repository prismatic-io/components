import { action } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { createAssetExamplePayload } from "../../examplePayloads";
import { createAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const createAsset = action({
  display: {
    label: "Create Asset",
    description: "Creates a new asset.",
  },
  perform: async (
    context,
    { connection, environmentId, spaceId, title, description, file },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const asset: Asset = await environment.createAsset({
      fields: {
        title: title as AssetProps["fields"]["title"],
        description: description as AssetProps["fields"]["description"],
        file: file as AssetProps["fields"]["file"],
      },
    });

    const data: AssetProps = (
      await asset.processForAllLocales()
    ).toPlainObject();

    return {
      data: data as unknown, 
    };
  },
  inputs: createAssetInputs,
  examplePayload: { data: createAssetExamplePayload },
});
