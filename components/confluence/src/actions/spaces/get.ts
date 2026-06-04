import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, spaceId, queryParameters } from "../../inputs";
import { getSpaceExamplePayload } from "../../examplePayloads";

export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Returns a specific space.",
  },
  inputs: {
    connectionInput,
    spaceId,
    queryParameters,
  },
  perform: async (context, { connectionInput, spaceId, queryParameters }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/spaces/${spaceId}`, {
      params: queryParameters,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getSpaceExamplePayload,
  },
});
