import { type KeyValuePair, input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput, toMongoDBObjectId } from "./util";
import type { Document } from "mongodb";

export const queryFilter = input({
  label: "Query Fields",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  comments:
    'Filters are used to narrow down the results of a query, or to determine which documents to update or delete. For example, you can search for documents whose key "firstName" is "John". To search by ID, provide a key of "_id". Use the "Comparison Operator" input to specify the type of comparison to perform if needed.',
  clean: (value) => {
    const query = util.types.keyValPairListToObject(
      (value as KeyValuePair[]) || [],
    );
    
    if (query._id) {
      query._id = toMongoDBObjectId(query._id);
    }
    return query;
  },
});

export const document = input({
  label: "Document Fields",
  comments:
    "Provide key and value pairs that make up the properties of your document.",
  type: "data",
  required: true,
  collection: "keyvaluelist",
  clean: (value) => {
    return util.types.keyValPairListToObject((value as KeyValuePair[]) || []);
  },
});

export const documentUpdate = input({
  label: "Update Fields",
  comments:
    "Provide key and value pairs to be inserted/updated in your document.",
  type: "data",
  required: false,
  collection: "keyvaluelist",
  clean: (value) => {
    return util.types.keyValPairListToObject((value as KeyValuePair[]) || []);
  },
});

export const documentList = input({
  label: "Documents",
  comments:
    "For each item, provide a document ( Javascript Object ) to be inserted into the collection.",
  type: "data",
  required: true,
  collection: "valuelist",
});

export const upsert = input({
  label: "Upsert",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "If true, creates a new document when no document matches the query criteria.",
  clean: util.types.toBool,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The maximum number of documents to return.",
  clean: (value) => util.types.toInt(value) || undefined,
});

export const skip = input({
  label: "Skip",
  type: "string",
  required: false,
  comments: "The number of documents to skip when paginating.",
  clean: (value) => util.types.toInt(value) || undefined,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const comparisonOperator = input({
  label: "Comparison Operator",
  type: "string",
  required: false,
  model: [
    { value: "$eq", label: "Equal" },
    { value: "$gt", label: "Greater Than" },
    { value: "$gte", label: "Greater Than or Equal" },
    { value: "$lt", label: "Less Than" },
    { value: "$lte", label: "Less Than or Equal" },
    { value: "$ne", label: "Not Equal" },
  ],
  comments:
    'The comparison operator to use when filtering documents. Use this field in conjunction with the "Query Fields" input.',
  clean: cleanStringInput,
});

export const convertValuesToNumbers = input({
  label: "Convert Values to Numbers",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    'If true, number values detected in the "Query Fields" input will be converted to numeric types.',
  clean: util.types.toBool,
});

export const executeCommand = input({
  label: "Execute Command",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Provide the command to execute. See [MongoDB documentation](https://www.mongodb.com/docs/v6.0/reference/command/) for more information.",
  example: JSON.stringify({ ping: 1 }, null, 2),
  clean: (value: unknown) => cleanCodeInput(value, "Execute Command"),
});

export const runAdminCommand = input({
  label: "Run Admin Command",
  type: "boolean",
  required: false,
  default: "false",
  comments: "If true, the command will be executed against the admin database.",
  clean: util.types.toBool,
});

export const pipeline = input({
  label: "Aggregation Pipeline",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      { $match: { categories: "Bakery" } },
      { $group: { _id: "$stars", count: { $sum: 1 } } },
    ],
    null,
    2,
  ),
  comments:
    "An array of aggregation pipeline stages that process documents in the collection.",
  clean: (value: unknown) => {
    if (!value) {
      throw new Error("Aggregation pipeline is required.");
    }

    return cleanCodeInput(value, "Aggregation Pipeline") as Document[];
  },
});

export const aggregationOptions = input({
  label: "Aggregation Options",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      allowDiskUse: true,
      batchSize: 1000,
      bypassDocumentValidation: false,
      cursor: { batchSize: 1000 },
    },
    null,
    2,
  ),
  comments:
    "Provide key and value pairs to configure the aggregation operation.",
  clean: (value: unknown) => cleanCodeInput(value, "Aggregation Options"),
});
