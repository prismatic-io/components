import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericUpdateResponse } from "../../examplePayloads";
import {
  bodyData,
  connection,
  copyright,
  description,
  id,
  name,
} from "../../inputs";

export const updateAsset = action({
  display: {
    label: "Update Asset",
    description: "Edit an existing asset ",
  },
  inputs: {
    id: {
      ...id,
      dataSource: "selectAsset",
    },
    name,
    description,
    copyright,
    bodyData: {
      ...bodyData,
      example: JSON.stringify(
        {
          isPublic: true,
          limited: true,
          archive: true,
          tags: "scenery,grassland,Holland",
        },
        null,
        2,
      ),
    },
    connection,
  },
  perform: async (
    context,
    { connection, id, bodyData, copyright, description, name },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/media/${id}`, {
      name,
      description,
      copyright,
      ...bodyData,
    });
    return { data };
  },
  examplePayload: {
    data: genericUpdateResponse,
  },
});
