import type { Element } from "@prismatic-io/spectral";
import type {
  AssetProps,
  ContentTypeProps,
  EntryProps,
  EnvironmentProps,
  KeyValueMap,
  OrganizationProp,
  SpaceProps,
} from "contentful-management";
export const getAssetLabel = (asset: AssetProps): string => {
  const { fields } = asset;
  if (fields?.title) {
    const firstLocale = Object.keys(fields.title)[0];
    if (firstLocale && fields.title[firstLocale]) {
      return String(fields.title[firstLocale]);
    }
  }
  return asset.sys.id;
};
export const getEntryLabel = (entry: EntryProps<KeyValueMap>): string => {
  const { fields } = entry;
  if (fields?.title) {
    const firstLocale = Object.keys(fields.title)[0];
    if (firstLocale && fields.title[firstLocale]) {
      return String(fields.title[firstLocale]);
    }
  }
  if (fields?.name) {
    const firstLocale = Object.keys(fields.name)[0];
    if (firstLocale && fields.name[firstLocale]) {
      return String(fields.name[firstLocale]);
    }
  }
  return entry.sys.id;
};
export const mapItemsForPicklist = (
  allItems:
    | SpaceProps[]
    | EnvironmentProps[]
    | OrganizationProp[]
    | ContentTypeProps[],
  dataSourceReturn: string,
): Element[] =>
  allItems.map<Element>(({ name, sys: { id } }) => ({
    label: name,
    key: dataSourceReturn === "id" ? id : name,
  }));
