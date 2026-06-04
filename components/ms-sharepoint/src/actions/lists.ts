import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  siteId,
  listId,
  itemId,
  pageLimit,
  pageToken,
  optInFields,
  fields,
  fetchAll,
} from "../inputs";
import { paginateResults } from "../utils";
import {
  listSiteListsExamplePayload,
  getSiteListExamplePayload,
  listItemsInSiteListExamplePayload,
  getItemFromSiteListExamplePayload,
  createItemInSiteListExamplePayload,
} from "../examplePayloads/actions";

const listSiteLists = action({
  display: {
    label: "List Site Lists",
    description: "List all Site Lists",
  },
  inputs: {
    connection,
    siteId,
    fetchAll,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = `/sites/${params.siteId}/lists`;

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint);
      return { data: results };
    }

    const { data } = await client.get(endpoint);
    return { data };
  },
  examplePayload: listSiteListsExamplePayload,
});

const getList = action({
  display: {
    label: "Get Site List",
    description: "Returns the information and metadata of an existing site list",
  },
  inputs: {
    connection,
    siteId,
    listId,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/sites/${params.siteId}/lists/${params.listId}`);
    return { data };
  },
  examplePayload: getSiteListExamplePayload,
});

const getListItemsInSite = action({
  display: {
    label: "List Items in Site List",
    description: "Return all items inside the given site list",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/sites/${params.siteId}/lists/${params.listId}/items`, {
      params:
        params.pageLimit || params.pageToken
          ? {
              $top: params.pageLimit,
              $skipToken: params.pageToken,
              $select: params.optInFields,
            }
          : undefined,
    });
    return { data };
  },
  inputs: {
    connection,
    siteId,
    listId,
    pageLimit,
    pageToken,
    optInFields,
  },
  examplePayload: listItemsInSiteListExamplePayload,
});

const getItemInSite = action({
  display: {
    label: "Get Item from Site List",
    description: "Returns the information and metadata of the given item",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(
      `/sites/${params.siteId}/lists/${params.listId}/items/${params.itemId}`,
      {
        params: params.optInFields
          ? {
              $select: params.optInFields,
            }
          : undefined,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    siteId,
    listId,
    itemId,
    optInFields,
  },
  examplePayload: getItemFromSiteListExamplePayload,
});

const createItemInSite = action({
  display: {
    label: "Create Item in Site List",
    description: "Create a new item inside the given site list",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.post(`/sites/${params.siteId}/lists/${params.listId}/items`, {
      fields: util.types.keyValPairListToObject(params.fields),
    });
    return { data };
  },
  inputs: {
    connection,
    siteId,
    listId,
    fields,
  },
  examplePayload: createItemInSiteListExamplePayload,
});

export default {
  listSiteLists,
  getListItemsInSite,
  createItemInSite,
  getList,
  getItemInSite,
};
