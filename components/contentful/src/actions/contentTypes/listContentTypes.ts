import { action } from "@prismatic-io/spectral";
import type {
  ContentType,
  ContentTypeProps,
  Environment,
  Space,
} from "contentful-management";
import { createClient } from "../../client";
import { listContentTypesExamplePayload } from "../../examplePayloads";
import { listContentTypesInputs } from "../../inputs";
import { getAllPaginatedItems } from "../../util";

export const listContentTypes = action({
  display: {
    label: "List Content Types",
    description: "Retrieves all content types of a space.",
  },
  perform: async (context, { connection, environmentId, spaceId }) => {
    const client = createClient(connection, context);

    const space: Space = await client.getSpace(spaceId);
    const environment: Environment = await space.getEnvironment(environmentId);

    const allItems: ContentTypeProps[] = await getAllPaginatedItems<
      ContentType,
      ContentTypeProps
    >(environment.getContentTypes.bind(environment));

    return {
      data: allItems,
    };
  },
  inputs: listContentTypesInputs,
  examplePayload: { data: listContentTypesExamplePayload },
});
