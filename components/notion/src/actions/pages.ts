import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  filterPropertiesInputPage,
  pageIdInput,
  startCursorInput,
  parent,
  properties,
  children,
  icon,
  coverImage,
  fetchAllInput,
} from "../inputs";
import { createClient } from "../client";
import { createPageResponse, listPagesResponse } from "../examplePayloads";
import { getPaginatedData } from "../util";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";

const getPage = action({
  display: {
    label: "Get Page",
    description: "Retrieve a page by ID with optional property filters",
  },
  inputs: {
    connection: connectionInput,
    pageId: pageIdInput,
    filterProperties: filterPropertiesInputPage,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    
    const filterProperties = params.filterProperties as string;
    const filterParams = filterProperties
      ? { params: { filter_properties: filterProperties.split(",") } }
      : {};

    const { data } = await client.get(`/pages/${params.pageId}`, filterParams);
    return { data };
  },
  examplePayload: createPageResponse,
});

const listPages = action({
  display: {
    label: "List Pages",
    description: "List all pages",
  },
  inputs: {
    connection: connectionInput,
    startCursor: startCursorInput,
    fetchAll: fetchAllInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      params.fetchAll,
      {
        filter: {
          value: "page",
          property: "object",
        },
        start_cursor: params.fetchAll ? undefined : params.startCursor,
        page_size: MAX_PAGE_SIZE,
      },
    );
    return { data };
  },
  examplePayload: listPagesResponse,
});

const createPage = action({
  display: {
    label: "Create Page",
    description:
      "Creates a new page that is a child of an existing page or database.",
  },
  inputs: {
    connection: connectionInput,
    parent,
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
  examplePayload: createPageResponse,
});

export default { getPage, listPages, createPage };
