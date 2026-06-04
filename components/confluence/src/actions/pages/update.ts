import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  pageId,
  status,
  title,
  spaceId,
  parentId,
  body,
  version,
} from "../../inputs";
import { getPageExamplePayload as updatePageExamplePayload } from "../../examplePayloads";

export const updatePage = action({
  display: {
    label: "Update Page",
    description: "Update a page by id.",
  },
  inputs: {
    connectionInput,
    pageId,
    status,
    title,
    body,
    version,
    spaceId: {
      ...spaceId,
      required: false,
    },
    parentId,
  },
  perform: async (
    context,
    {
      connectionInput,
      pageId,
      body,
      parentId,
      spaceId,
      status,
      title,
      version,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(`/pages/${pageId}`, {
      id: pageId || undefined,
      body: body || undefined,
      parentId: parentId || undefined,
      spaceId: spaceId || undefined,
      status: status || undefined,
      title: title || undefined,
      version: version || undefined,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updatePageExamplePayload,
  },
});
