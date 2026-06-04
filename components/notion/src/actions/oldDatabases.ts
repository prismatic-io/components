import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  databaseIdInput,
  databaseTitle,
  filterInput,
  listOldDatabasesInputs,
} from "../inputs";
import { createClient, createOldClient } from "../client";
import { parent, properties, children, icon, coverImage } from "../inputs";
import {
  createDatabasePayload,
  createDatabaseResponse,
  getDatabaseResponse,
  listDatabasesResponse,
  queryDatabaseResponse,
  createDatabaseItemResponse,
} from "../examplePayloads";
import { HttpMethod, MAX_PAGE_SIZE } from "../constants";
import { getPaginatedData } from "../util";

const getDatabase = action({
  display: {
    label: "Get Database (Deprecated)",
    description: "Retrieve a database by ID",
  },
  inputs: { connection: connectionInput, databaseId: databaseIdInput },
  perform: async (context, params) => {
    const client = createOldClient(params.connection, context.debug.enabled);
    const { data } = await client.get(`/databases/${params.databaseId}`);
    return { data };
  },
  examplePayload: getDatabaseResponse,
});

const listDatabases = action({
  display: {
    label: "List Databases (Deprecated)",
    description: "List all databases or data sources",
  },
  inputs: listOldDatabasesInputs,
  perform: async (context, { connection, fetchAll, startCursor }) => {
    const client = createOldClient(connection, context.debug.enabled);

    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      fetchAll,
      {
        filter: {
          value: "database",
          property: "object",
        },
        start_cursor: fetchAll ? undefined : startCursor,
        page_size: MAX_PAGE_SIZE,
      },
    );
    return { data };
  },
  examplePayload: listDatabasesResponse,
});

const queryDatabase = action({
  display: {
    label: "Query Database (Deprecated)",
    description: "Query a Notion database or data source",
  },
  inputs: {
    connection: connectionInput,
    databaseId: databaseIdInput,
    filter: filterInput,
  },
  perform: async (context, params) => {
    const client = createOldClient(params.connection, context.debug.enabled);

    const { data } = await client.post(
      `/databases/${params.databaseId}/query`,
      {
        filter: params.filter,
      },
    );
    return { data };
  },
  examplePayload: queryDatabaseResponse,
});

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

const createDatabase = action({
  display: {
    label: "Create Database (Deprecated)",
    description:
      "Creates a database as a subpage in the specified parent page, with the specified properties schema. Currently, the parent of a new database must be a Notion page or a wiki database.",
  },
  inputs: {
    connection: connectionInput,
    parent: {
      ...parent,
      comments:
        'The parent page where the database will be created. Format: {"type": "page_id", "page_id": "..."}',
      example: JSON.stringify(
        { type: "page_id", page_id: "d9824bdc84454327be8b5b47500af6ce" },
        null,
        2,
      ),
    },
    databaseTitle,
    databaseProperties: {
      ...properties,
      comments:
        "Property schema of database. The keys are the names of properties as they appear in Notion. For relation properties, use data_source_id instead of database_id.",
      example: JSON.stringify(createDatabasePayload, null, 2),
    },
  },
  perform: async (
    context,
    { connection, parent, databaseTitle, databaseProperties },
  ) => {
    const client = createOldClient(connection, context.debug.enabled);
    const { data } = await client.post("/databases", {
      parent: parent,
      properties: databaseProperties,
      title: databaseTitle,
    });
    return { data };
  },
  examplePayload: createDatabaseResponse,
});

export default {
  createDatabase,
  createDatabaseItem,
  getDatabase,
  listDatabases,
  queryDatabase,
};
