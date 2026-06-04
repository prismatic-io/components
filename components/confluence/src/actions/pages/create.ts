import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  status,
  title,
  spaceId,
  parentId,
  body,
  embedded,
  privateInput,
  queryParameters,
} from "../../inputs";
import { getPageExamplePayload as createPageExamplePayload } from "../../examplePayloads";

export const createPage = action({
  display: {
    label: "Create Page",
    description: "Creates a page in the space.",
  },
  inputs: {
    connectionInput,
    spaceId,
    status,
    title,
    parentId,
    body,
    embedded,
    privateInput,
    queryParameters,
  },
  perform: async (
    context,
    {
      connectionInput,
      body,
      parentId,
      spaceId,
      status,
      title,
      embedded,
      privateInput,
      queryParameters,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      "/pages",
      {
        body: body || undefined,
        parentId: parentId || undefined,
        spaceId: spaceId || undefined,
        status: status || undefined,
        title: title || undefined,
      },
      {
        params: {
          embedded: embedded || undefined,
          private: privateInput || undefined,
          ...queryParameters,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createPageExamplePayload,
  },
});
