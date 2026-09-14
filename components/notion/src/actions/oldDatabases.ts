import { action } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { parent, properties, children, icon, coverImage } from "../inputs";
import { createDatabaseItemResponse } from "../examplePayloads";
const createDatabaseItem = action({
  display: {
    label: "Create Database Item",
    description: "Creates an Item on a database.",
  },
  inputs: {
    connection: connectionInput,
    parent: {
      ...parent,
      comments:
        'The parent database where the new page is inserted. Recommended format: {"type": "data_source_id", "data_source_id": "..."}. Legacy format {"database_id": "..."} is supported for single-source databases.',
      example: JSON.stringify(
        {
          type: "data_source_id",
          data_source_id: "d9824bdc84454327be8b5b47500af6ce",
        },
        null,
        2,
      ),
    },
    properties,
    children,
    icon,
    coverImage,
  },
  perform: async (
    context,
    { children, connection, coverImage, icon, parent, properties },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/pages", {
      parent: parent || undefined,
      properties: properties || undefined,
      children: children || undefined,
      icon: icon || undefined,
      cover: coverImage || undefined,
    });
    return { data };
  },
  examplePayload: createDatabaseItemResponse,
});
export default {
  createDatabaseItem,
};
