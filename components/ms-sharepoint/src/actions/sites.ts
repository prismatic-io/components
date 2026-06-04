import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, siteId, pageLimit, pageToken, fetchAll } from "../inputs";
import { paginateResults } from "../utils";

const listFollowedSites = action({
  display: {
    label: "List Followed Sites",
    description: "List all Followed Sites",
  },
  inputs: {
    connection,
    pageLimit,
    pageToken,
    fetchAll,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = "/me/followedSites";

    if (params.fetchAll) {
      const results = await paginateResults(client, endpoint);
      return { data: results };
    }

    const { data } = await client.get("/me/followedSites", {
      params:
        params.pageLimit || params.pageToken
          ? {
              $top: params.pageLimit,
              $skipToken: params.pageToken,
            }
          : undefined,
    });
    return { data };
  },
  examplePayload: {
    data: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
      value: [
        {
          displayName: "Example",
          id: "example.sharepoint.com,6c44888f-5883-4ef0-c542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418",
          sharepointIds: {
            siteId: "6c44888f-5883-4ef0-c542-d21a802cfea6",
            webId: "ed2d5d06-e192-4047-afa6-a5d7f25b3418",
          },
          siteCollection: {
            hostname: "example.sharepoint.com",
          },
          webUrl: "https://example.sharepoint.com/sites/Example",
        },
      ],
    },
  },
});

const listSites = action({
  display: {
    label: "List Sites",
    description: "List all SharePoint sites",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const endpoint = "/sites";

    if (params.fetchAll) {
      const results = await paginateResults(client, `${endpoint}?search=`);
      return { data: results };
    }

    const { data } = await client.get(endpoint, {
      params:
        params.pageLimit || params.pageToken
          ? {
              search: "",
              $top: params.pageLimit,
              $skipToken: params.pageToken,
            }
          : { search: "" },
    });
    return { data };
  },
  inputs: {
    connection,
    pageLimit,
    pageToken,
    fetchAll,
  },
  examplePayload: {
    data: {
      value: [
        {
          description: "Example description",
          id: "example.sharepoint.com,c45e332-a998-479d-aeb2-2a",
          name: "Example SharePoint Site",
          webUrl: "https://example.sharepoint.com",
          displayName: "Communication Site",
          root: undefined,
          siteCollection: { hostname: "https://example.sharepoint.com" },
        },
      ],
    },
  },
});

const getRootSite = action({
  display: {
    label: "Get Root Site",
    description: "Returns the information and metadata of the root SharePoint site in your tenant",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get("/sites/root");
    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: {
    data: {
      description: "Example description",
      id: "example.sharepoint.com,c45e332-a998-479d-aeb2-2a",
      name: "Example SharePoint Site",
      webUrl: "https://example.sharepoint.com",
      displayName: "Communication Site",
      root: undefined,
      siteCollection: { hostname: "https://example.sharepoint.com" },
    },
  },
});

const getSite = action({
  display: {
    label: "Get Site",
    description: "Returns the information and metadata of the given SharePoint site",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.get(`/sites/${params.siteId}`);
    return { data };
  },
  inputs: {
    connection,
    siteId,
  },
  examplePayload: {
    data: {
      description: "Example description",
      id: "example.sharepoint.com,c45e332-a998-479d-aeb2-2a",
      name: "Example SharePoint Site",
      webUrl: "https://example.sharepoint.com",
      displayName: "Communication Site",
      root: undefined,
      siteCollection: { hostname: "https://example.sharepoint.com" },
    },
  },
});

export default {
  listSites,
  listFollowedSites,
  getRootSite,
  getSite,
};
