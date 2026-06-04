import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { genericUpdateResponse } from "../../examplePayloads";
import {
  bodyData,
  collectionOptions,
  connection,
  groups,
  id,
  profiles,
  recipients,
} from "../../inputs";

export const shareCollection = action({
  display: {
    label: "Share Collection",
    description: "Share a collection",
  },
  inputs: {
    id: {
      ...id,
      label: "Collection ID",
      comments: "The ID of the collection to retrieve",
      dataSource: "selectCollection",
    },
    collectionOptions,
    recipients,
    groups,
    profiles,
    bodyData: {
      ...bodyData,
      example: JSON.stringify(
        {
          sendMail: true,
          message: "Any message",
        },
        null,
        2,
      ),
    },
    connection,
  },
  perform: async (
    context,
    {
      connection,
      id,
      bodyData,
      collectionOptions,
      groups,
      profiles,
      recipients,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/collections/${id}/share`, {
      collectionOptions,
      recipients,
      groups,
      profiles,
      ...bodyData,
    });
    return { data };
  },
  examplePayload: {
    data: genericUpdateResponse,
  },
});
