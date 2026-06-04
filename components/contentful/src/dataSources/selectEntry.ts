import { dataSource, type Element } from "@prismatic-io/spectral";
import type {
  Entry,
  EntryProps,
  Environment,
  KeyValueMap,
  Space,
} from "contentful-management";
import { createClient } from "../client";
import { selectEntryExamplePayload } from "../examplePayloads";
import { selectEntryInputs } from "../inputs";
import { getAllPaginatedItems } from "../util";

const getEntryLabel = (entry: EntryProps<KeyValueMap>): string => {
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

export const selectEntry = dataSource({
  display: {
    label: "Select Entry",
    description: "Select an entry from a dropdown menu.",
  },
  inputs: selectEntryInputs,
  perform: async (_context, { connection, spaceId, environmentId }) => {
    const client = createClient(connection);
    const space: Space = await client.getSpace(spaceId);
    const environment: Environment = await space.getEnvironment(environmentId);

    const allItems: EntryProps<KeyValueMap>[] = await getAllPaginatedItems<
      Entry,
      EntryProps<KeyValueMap>
    >(environment.getEntries.bind(environment));

    const result: Element[] = allItems
      .map<Element>((item) => ({
        label: getEntryLabel(item),
        key: item.sys.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectEntryExamplePayload,
});
