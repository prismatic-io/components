import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  apiVersionInput,
  connection,
  fetchAll,
  instanceUrlInput,
} from "./common";
const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "Encoded query to use to filter the result set.",
  example: "score=-1.0^ORDERBYnumber",
  placeholder: "Enter the filter query",
  clean: cleanStringInput,
});
const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  example: "active,sys_id",
  placeholder: "Enter the field names",
  comments:
    "Comma-separated list of fields from the Knowledge [kb_knowledge] table to show details in results.",
  clean: cleanStringInput,
});
const kb = input({
  label: "Knowledge Base Sys IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of knowledge base sys_ids from the Knowledge Bases [kb_knowledge_base] table to restrict results to.",
  example: "a7e8a78bff0221009b20ffffffffff17,a7e8a78bff0221009b20ffffffffff18",
  placeholder: "Enter the knowledge base Sys IDs",
  clean: cleanStringInput,
});
const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments:
    "List of comma-separated languages in two-letter ISO 639-1 language code format to restrict results to. Alternatively type 'all' to search in all valid installed languages on an instance.",
  example: "en",
  placeholder: "Enter the language code",
  clean: cleanStringInput,
});
const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter the limit",
  comments:
    "Maximum number of records to return. Unusually large limit values can impact system performance. For requests that exceed this number of records, use the Offset input to paginate record retrieval.",
  clean: cleanStringInput,
});
const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  example: "0",
  placeholder: "Enter the offset",
  comments:
    "Starting record index for which to begin retrieving records. Use this value to paginate record retrieval. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks. For example, the first time this endpoint is called, offset is set to '0'.",
  clean: cleanStringInput,
});
const query = input({
  label: "Query",
  type: "string",
  required: false,
  comments: "Text to search for, can be empty.",
  example: "incident",
  placeholder: "Enter the search query",
  clean: cleanStringInput,
});
const articleSysId = input({
  label: "Article Sys ID",
  type: "string",
  required: true,
  comments:
    "Sys_id of the knowledge article with the attachment you intend to retrieve. Located in the Knowledge Bases [kb_knowledge] table.",
  example: "f2765f9fc0a8011b0120ec1b352bf09b",
  placeholder: "Enter the article Sys ID",
  clean: util.types.toString,
});
const attachmentSysId = input({
  label: "Attachment Sys ID",
  type: "string",
  required: true,
  comments: "Sys_id of record to which the attachment belongs.",
  example: "f2765f9fc0a8011b0120ec1b352bf09b",
  placeholder: "Enter the attachment Sys ID",
  clean: util.types.toString,
});
const articleId = input({
  label: "Article ID",
  type: "string",
  required: true,
  comments:
    "Sys_id or knowledge base (KB) number of a knowledge article in the Knowledge [kb_knowledge] table.",
  example: "KB0012345",
  placeholder: "Enter the article ID",
  clean: util.types.toString,
});
const searchId = input({
  label: "Search ID",
  type: "string",
  required: false,
  comments:
    "Optional unless using the 'Search Rank' input. Unique identifier of search that returned this article. You can retrieve this value (articles.id element) using the 'List Knowledge Articles' action.",
  example: "kb_knowledge:3b0fccee0a0a0b9b00d34b36ea41a43e",
  placeholder: "Enter the search ID",
  clean: cleanStringInput,
});
const searchRank = input({
  label: "Search Rank",
  type: "string",
  required: false,
  comments:
    "Optional unless using the 'Search ID' input. Article search rank by click-rate (articles.rank) that you can retrieve using the 'List Knowledge Articles' action.",
  example: "1",
  placeholder: "Enter the search rank",
  clean: cleanStringInput,
});
const updateView = input({
  label: "Update View",
  type: "boolean",
  required: false,
  comments:
    "Update view count and record an entry for the article in the Knowledge Use [kb_use] table.",
  clean: util.types.toBool,
});
const knowledgePagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and offset for paginated retrieval.",
  inputs: { limit, offset },
});
const listKnowledgeArticlesFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { filter, fields, kb, language, query },
});
const listFeaturedAndMostViewedFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { fields, kb, language },
});
export const getKnowledgeArticleInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  articleId,
  fields,
  language,
  searchId,
  searchRank,
  updateView,
};
export const getKnowledgeArticleAttachmentInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  articleSysId,
  attachmentSysId,
};
export const listKnowledgeArticlesInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  filters: listKnowledgeArticlesFilters,
  fetchAll,
  pagination: knowledgePagination,
};
export const listFeaturedKnowledgeArticlesInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  filters: listFeaturedAndMostViewedFilters,
  fetchAll,
  pagination: knowledgePagination,
};
export const listMostViewedKnowledgeArticlesInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  filters: listFeaturedAndMostViewedFilters,
  fetchAll,
  pagination: knowledgePagination,
};
