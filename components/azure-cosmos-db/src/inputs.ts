import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { cleanJsonInput, toOptionalNumber, toOptionalString } from "./utils";

const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments:
    "Azure Cosmos DB connection configured with endpoint URL and access key.",
});

const databaseIdInput = input({
  label: "Database ID",
  type: "string",
  required: true,
  example: "myDatabase",
  placeholder: "Enter database ID",
  comments: "The ID of the database.",
  dataSource: "selectDatabase",
  clean: util.types.toString,
});

const collectionIdInput = input({
  label: "Collection ID",
  type: "string",
  required: true,
  example: "myCollection",
  placeholder: "Enter collection ID",
  comments: "The ID of the collection.",
  dataSource: "selectCollection",
  clean: util.types.toString,
});

const documentIdInput = input({
  label: "Document ID",
  type: "string",
  required: true,
  example: "doc1",
  placeholder: "Enter document ID",
  comments: "The ID of the document.",
  dataSource: "selectDocument",
  clean: util.types.toString,
});

const partitionKeyPathInput = input({
  label: "Partition Key Path",
  type: "string",
  required: false,
  example: "/partition1",
  placeholder: "Enter partition key path",
  comments:
    "The path used as the partition key when creating the collection, e.g., `/category`.",
  clean: toOptionalString,
});

const partitionKeyValueInput = input({
  label: "Partition Key Value",
  type: "string",
  required: false,
  example: "electronics",
  placeholder: "Enter partition key value",
  comments:
    "The value of the partition key for the document (required for partitioned collections).",
  clean: toOptionalString,
});

const documentInput = input({
  label: "Document",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    { id: "doc1", name: "Sample Document", category: "example" },
    null,
    2,
  ),
  comments: "The document as JSON string.",
  clean: (value: unknown) => cleanJsonInput(value, "Document"),
});

const etagInput = input({
  label: "ETag",
  type: "string",
  required: false,
  example: '"00000000-0000-0000-0000-000000000000"',
  placeholder: "Enter ETag value",
  comments: "The ETag value for optimistic concurrency control.",
  clean: toOptionalString,
});

const maxItemCountInput = input({
  label: "Max Item Count",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter maximum number of items",
  comments: "Maximum number of items to return.",
  clean: toOptionalNumber,
});

const continuationTokenInput = input({
  label: "Continuation Token",
  type: "string",
  required: false,
  example: `{"token":"kVEpAK0lM0gBAAAAAAAAAA==","range":{"min":"","max":"FF"}}`,
  placeholder: "Enter continuation token from previous response",
  comments: "Token for pagination to get the next set of results.",
  clean: toOptionalString,
});

const fetchAllInput = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If enabled, retrieves all documents by automatically fetching every page of results. This overrides 'Max Item Count' and ignores any 'Continuation Token'.",
  clean: util.types.toBool,
});

const throughputInput = input({
  label: "Throughput (RU/s)",
  type: "string",
  required: false,
  example: "400",
  placeholder: "Enter throughput in Request Units per second",
  comments:
    "The provisioned throughput for the collection in Request Units per second. <strong>Note:</strong> Serverless collections do not support setting throughput.",
  clean: toOptionalString,
});

export const createCollectionInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  partitionKey: partitionKeyPathInput,
  throughput: throughputInput,
};

export const deleteCollectionInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
};

export const getCollectionInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
};

export const listCollectionsInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};

export const createDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};

export const deleteDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};

export const getDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};

export const listDatabasesInputs = {
  connection: connectionInput,
};

export const createDocumentInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  document: documentInput,
  partitionKey: partitionKeyValueInput,
};

export const deleteDocumentInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  documentId: documentIdInput,
  partitionKey: partitionKeyValueInput,
  etag: etagInput,
};

export const getDocumentInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  documentId: documentIdInput,
  partitionKey: partitionKeyValueInput,
};

export const listDocumentsInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  maxItemCount: maxItemCountInput,
  continuationToken: continuationTokenInput,
  fetchAll: fetchAllInput,
};

export const updateDocumentInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  collectionId: collectionIdInput,
  documentId: documentIdInput,
  document: documentInput,
  partitionKey: partitionKeyValueInput,
  etag: etagInput,
};

const { debugRequest: _, ...rawRequestInputsFromHttp } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...rawRequestInputsFromHttp,
  url: {
    ...rawRequestInputsFromHttp.url,
    comments:
      "Input the path only (/dbs/myDatabase/colls/myCollection), The base URL is already included. For example, to connect to `https://your-cosmos-account.documents.azure.com/dbs/myDatabase/colls/myCollection`, only `/dbs/myDatabase/colls/myCollection` is entered in this field.",
    example: "/dbs/myDatabase/colls/myCollection",
  },
};

export const selectCollectionInputs = {
  connection: connectionInput,
  databaseId: {
    ...databaseIdInput,
    dataSource: undefined,
  },
};

export const selectDatabaseInputs = {
  connection: connectionInput,
};

export const selectDocumentInputs = {
  connection: connectionInput,
  databaseId: {
    ...databaseIdInput,
    dataSource: undefined,
  },
  collectionId: {
    ...collectionIdInput,
    dataSource: undefined,
  },
};
