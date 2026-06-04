import { input, util } from "@prismatic-io/spectral";
import { cleanJsonInput, cleanStringInput } from "./util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const instanceUrlInput = input({
  label: "Instance URL",
  placeholder: "Instance URL",
  type: "string",
  required: true,
  comments:
    "The URL of the specific ServiceNow instance to use for API requests",
  example: "https://instance.service-now.com",
  clean: cleanStringInput,
});

export const apiVersionInput = input({
  label: "API Version",
  placeholder: "API Version",
  type: "string",
  required: true,
  comments: "The version of the ServiceNow API file_name, to use",
  model: [
    { label: "Latest", value: "latest" },
    { label: "v2", value: "v2" },
    { label: "v1", value: "v1" },
  ],
  example: "v2",
  clean: cleanStringInput,
});

export const tableNameInput = input({
  label: "Table",
  placeholder: "Table",
  type: "string",
  required: true,
  comments: "The name of the ServiceNow table in which to create a record",
  example: "incident",
  clean: util.types.toString,
  dataSource: "selectTable",
});
export const fieldValuesInputNonRequired = input({
  label: "Values",
  placeholder: "Values",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "The names of the fields and their values to use when creating a record",
});
export const fieldValuesInput = input({
  label: "Values",
  placeholder: "Values",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "The names of the fields and their values to use when creating a record",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. The offset/limit inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

export const sysparmFields = input({
  label: "Sysparm Fields",
  type: "string",
  required: false,
  example: "sys_id,label",
  placeholder: "sys_id,label",
  comments:
    "Comma-separated list of fields to return. If not specified, all fields are returned.",
  clean: cleanStringInput,
});

export const sysparmLimit = input({
  label: "Sysparm Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "100",
  comments:
    "Max number of records to return. Large values can impact performance. For pagination with large data sets include the Sysparm Offset",
  clean: cleanStringInput,
});

export const sysparmOffset = input({
  label: "Sysparm Offset",
  type: "string",
  example: "0",
  placeholder: "0",
  required: false,
  comments:
    "Starting record index for which to begin retrieving records. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks. For example, the first time you call this endpoint, sysparm_offset is set to '0'. To simply page through all available records, use sysparm_offset=sysparm_offset+sysparm_limit, until you reach the end of all records.",
  clean: cleanStringInput,
});

export const sysparmQuery = input({
  label: "Sysparm Query",
  type: "string",
  required: false,
  comments:
    "Encoded query used to filter the result set. Syntax: sysparm_query=<col_name><operator><value>.",
  example: "active=true^ORDERBYnumber^ORDERBYDESCcategory",
  placeholder: "active=true^ORDERBYnumber^ORDERBYDESCcategory",
  clean: cleanStringInput,
});

export const sysId = input({
  label: "Sys ID",
  type: "string",
  required: true,
  comments: "The Sys ID of the record being queried",
  clean: cleanStringInput,
  example: "d71f7935c0a8016700802b64c67c11c6",
  placeholder: "d71f7935c0a8016700802b64c67c11c6",
  dataSource: "selectAttachment",
});

export const userName = input({
  label: "User Id",
  type: "string",
  required: false,
  comments: "The Username of the User",
});

export const email = input({
  label: "Email",
  type: "string",
  required: false,
  comments: "The Email of the User",
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The User's First Name",
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The User's Last Name",
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "Encoded query to use to filter the result set.",
  example: "score=-1.0^ORDERBYnumber",
  placeholder: "score=-1.0^ORDERBYnumber",
  clean: cleanStringInput,
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  example: "active,sys_id",
  placeholder: "active,sys_id",
  comments:
    "Comma-separated list of fields from the Knowledge [kb_knowledge] table to show details in results.",
  clean: cleanStringInput,
});

export const kb = input({
  label: "Knowledge Base Sys ID's",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of knowledge base sys_ids from the Knowledge Bases [kb_knowledge_base] table to restrict results to.",
  example: "a7e8a78bff0221009b20ffffffffff17,a7e8a78bff0221009b20ffffffffff18",
  placeholder:
    "a7e8a78bff0221009b20ffffffffff17,a7e8a78bff0221009b20ffffffffff18",
  clean: cleanStringInput,
});

export const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments:
    "List of comma-separated languages in two-letter ISO 639-1 language code format to restrict results to. Alternatively type 'all' to search in all valid installed languages on an instance.",
  example: "en",
  placeholder: "en",
  clean: cleanStringInput,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "100",
  comments:
    "Maximum number of records to return. Unusually large limit values can impact system performance. For requests that exceed this number of records, use the Offset input to paginate record retrieval.",
  clean: cleanStringInput,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  example: "0",
  placeholder: "0",
  comments:
    "Starting record index for which to begin retrieving records. Use this value to paginate record retrieval. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks. For example, the first time this endpoint is called, offset is set to '0'.",
  clean: cleanStringInput,
});

export const query = input({
  label: "Query",
  type: "string",
  required: false,
  comments: "Text to search for, can be empty.",
  example: "incident",
  placeholder: "incident",
  clean: cleanStringInput,
});

export const articleSysId = input({
  label: "Article Sys ID",
  type: "string",
  required: true,
  comments:
    "Sys_id of the knowledge article with the attachment you intend to retrieve. Located in the Knowledge Bases [kb_knowledge] table.",
  example: "f2765f9fc0a8011b0120ec1b352bf09b",
  placeholder: "f2765f9fc0a8011b0120ec1b352bf09b",
  clean: cleanStringInput,
});

export const attachmentSysId = input({
  label: "Attachment Sys ID",
  type: "string",
  required: true,
  comments: "Sys_id of record to which the attachment belongs.",
  example: "f2765f9fc0a8011b0120ec1b352bf09b",
  placeholder: "f2765f9fc0a8011b0120ec1b352bf09b",
  clean: cleanStringInput,
});

export const articleId = input({
  label: "Article ID",
  type: "string",
  required: true,
  comments:
    "Sys_id or knowledge base (KB) number of a knowledge article in the Knowledge [kb_knowledge] table.",
  example: "KB0012345",
  placeholder: "KB0012345",
  clean: cleanStringInput,
});

export const searchId = input({
  label: "Search ID",
  type: "string",
  required: false,
  comments:
    "Optional unless using the 'Search Rank' input. Unique identifier of search that returned this article. You can retrieve this value (articles.id element) using the 'List Knowledge Articles' action.",
  example: "kb_knowledge:3b0fccee0a0a0b9b00d34b36ea41a43e",
  placeholder: "kb_knowledge:3b0fccee0a0a0b9b00d34b36ea41a43e",
  clean: cleanStringInput,
});

export const searchRank = input({
  label: "Search Rank",
  type: "string",
  required: false,
  comments:
    "Optional unless using the 'Search ID' input. Article search rank by click-rate (articles.rank) that you can retrieve using the 'List Knowledge Articles' action.",
  example: "1",
  placeholder: "1",
  clean: cleanStringInput,
});

export const updateView = input({
  label: "Update View",
  type: "boolean",
  required: false,
  comments:
    "Update view count and record an entry for the article in the Knowledge Use [kb_use] table.",
  clean: util.types.toBool,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "Name to give the attachment.",
  example: "issue_screenshot",
  placeholder: "issue_screenshot",
  clean: cleanStringInput,
});

export const file = input({
  label: "File",
  type: "string",
  required: true,
  comments: "The file to attach to the record.",
  clean: util.types.toData,
});

export const className = input({
  label: "Class Name",
  type: "string",
  required: true,
  comments:
    "CMDB class name. This is the name of the table that contains the desired CI records",
  example: "cmdb_ci_linux_server",
  clean: cleanStringInput,
});

export const relSysId = input({
  label: "Relationship Sys ID",
  type: "string",
  required: true,
  comments: "Sys Id of the relation to perform the operation on.",
  example: "d71f7935c0a8016700802b64c67c11c6",
  placeholder: "d71f7935c0a8016700802b64c67c11c6",
  clean: util.types.toString,
});

export const configurationItemAttributes = input({
  label: "Configuration Item Attributes",
  type: "code",
  language: "json",
  required: false,
  comments: "The attributes of the configuration item to create.",
  example: JSON.stringify(
    {
      name: "lnux999",
      firewall_status: "Intranet",
    },
    null,
    2,
  ),
  placeholder: JSON.stringify(
    {
      name: "lnux999",
      firewall_status: "Intranet",
    },
    null,
    2,
  ),
  clean: cleanJsonInput,
});

export const configurationItemInboundRelations = input({
  label: "Configuration Item Inbound Relations",
  type: "code",
  language: "json",
  required: false,
  comments: "The inbound relations of the configuration item to create.",
  example: JSON.stringify([
    {
      target:
        "{Sys_id of the target inbound relation to associate with the specified CI}",
      type: "{Sys_id of the type of relation to associate with the specified CI}",
    },
  ]),
  placeholder: JSON.stringify([
    {
      target:
        "{Sys_id of the target inbound relation to associate with the specified CI}",
      type: "{Sys_id of the type of relation to associate with the specified CI}",
    },
  ]),
  clean: cleanJsonInput,
});

export const configurationItemOutboundRelations = input({
  label: "Configuration Item Outbound Relations",
  type: "code",
  language: "json",
  required: false,
  comments: "The outbound relations of the configuration item to create.",
  example: JSON.stringify([
    {
      target:
        "{Sys_id of the target outbound relation to associate with the specified CI}",
      type: "{Sys_id of the type of relation to associate with the specified CI}",
    },
  ]),
  clean: cleanJsonInput,
});

export const configurationItemSource = input({
  label: "Configuration Item Source",
  type: "string",
  required: true,
  comments:
    "Entity that created/updated the information. This must be one of the choice values specified in the discovery_source field in the Configuration Item [cmdb_ci] table.",
  example: "ServiceNow",
  placeholder: "ServiceNow",
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records that were updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});
