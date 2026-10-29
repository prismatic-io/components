import { dataSource, type Element } from "@prismatic-io/spectral";
import type {
  ContentType,
  ContentTypeProps,
  Environment,
  Space,
} from "contentful-management";
import { createClient } from "../client";
import { selectContentTypeExamplePayload } from "../examplePayloads";
import { selectContentTypeInputs } from "../inputs";
import { getAllPaginatedItems, mapItemsForPicklist } from "../util";

export const selectContentType = dataSource({
  display: {
    label: "Select Content Type",
    description: "Select a content type from a dropdown menu.",
  },
  inputs: selectContentTypeInputs,
  perform: async (
    _context,
    { connection, spaceId, environmentId, dataSourceReturn },
  ) => {
    const client = createClient(connection);
    const space: Space = await client.getSpace(spaceId);
    const environment: Environment = await space.getEnvironment(environmentId);

    const allItems: ContentTypeProps[] = await getAllPaginatedItems<
      ContentType,
      ContentTypeProps
    >(environment.getContentTypes.bind(environment));

    const result: Element[] = mapItemsForPicklist(allItems, dataSourceReturn);
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectContentTypeExamplePayload,
});
