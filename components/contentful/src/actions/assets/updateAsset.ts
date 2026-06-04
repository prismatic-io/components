import { action } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { updateAssetExamplePayload } from "../../examplePayloads";
import { updateAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const updateAsset = action({
  display: {
    label: "Update Asset",
    description: "Updates an existing asset.",
  },
  perform: async (
    context,
    { connection, environmentId, spaceId, title, description, assetId },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const asset: Asset = await environment.getAsset(assetId);

    if (title) {
      const locale = Object.keys(title)[0];
      asset.fields.title[locale] = (title as AssetProps["fields"]["title"])[
        locale
      ];
    }

    if (description && asset.fields.description) {
      const locale = Object.keys(description)[0];
      asset.fields.description[locale] = (
        description as Record<string, string>
      )[locale];
    }
    const data = (await asset.update()).toPlainObject();
    return {
      data: data as unknown, 
    };
  },
  inputs: updateAssetInputs,
  examplePayload: { data: updateAssetExamplePayload },
});
