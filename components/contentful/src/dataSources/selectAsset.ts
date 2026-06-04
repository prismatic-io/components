import { dataSource, type Element } from "@prismatic-io/spectral";
import type {
  Asset,
  AssetProps,
  Environment,
  Space,
} from "contentful-management";
import { createClient } from "../client";
import { selectAssetExamplePayload } from "../examplePayloads";
import { selectAssetInputs } from "../inputs";
import { getAllPaginatedItems } from "../util";

const getAssetLabel = (asset: AssetProps): string => {
  const { fields } = asset;
  if (fields?.title) {
    const firstLocale = Object.keys(fields.title)[0];
    if (firstLocale && fields.title[firstLocale]) {
      return String(fields.title[firstLocale]);
    }
  }
  return asset.sys.id;
};

export const selectAsset = dataSource({
  display: {
    label: "Select Asset",
    description: "Select an asset from a dropdown menu.",
  },
  inputs: selectAssetInputs,
  perform: async (_context, { connection, spaceId, environmentId }) => {
    const client = createClient(connection);
    const space: Space = await client.getSpace(spaceId);
    const environment: Environment = await space.getEnvironment(environmentId);

    const allItems: AssetProps[] = await getAllPaginatedItems<
      Asset,
      AssetProps
    >(environment.getAssets.bind(environment));

    const result: Element[] = allItems
      .map<Element>((item) => ({
        label: getAssetLabel(item),
        key: item.sys.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectAssetExamplePayload,
});
