import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanJsonInput } from "../util";
import {
  apiVersionInput,
  connection,
  fetchAll,
  instanceUrlInput,
  sysId,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
} from "./common";
const className = input({
  label: "Class Name",
  type: "string",
  required: true,
  comments:
    "CMDB class name. This is the name of the table that contains the desired CI records",
  example: "cmdb_ci_linux_server",
  placeholder: "Enter the class name",
  clean: util.types.toString,
});
const relSysId = input({
  label: "Relationship Sys ID",
  type: "string",
  required: true,
  comments: "Sys Id of the relation to perform the operation on.",
  example: "d71f7935c0a8016700802b64c67c11c6",
  placeholder: "Enter the relationship Sys ID",
  clean: util.types.toString,
});
const configurationItemAttributes = input({
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
const configurationItemInboundRelations = input({
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
const configurationItemOutboundRelations = input({
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
const configurationItemSource = input({
  label: "Configuration Item Source",
  type: "string",
  required: true,
  comments:
    "Entity that created/updated the information. This must be one of the choice values specified in the discovery_source field in the Configuration Item [cmdb_ci] table.",
  example: "ServiceNow",
  placeholder: "Enter the discovery source",
  clean: util.types.toString,
});
export const createConfigurationItemInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  className,
  configurationItemAttributes,
  configurationItemInboundRelations,
  configurationItemOutboundRelations,
  configurationItemSource,
};
export const deleteConfigurationItemInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  className,
  sysId,
  relSysId,
};
export const getConfigurationItemAttributesInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  className,
  sysId,
};
const listConfigurationItemsPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and offset for paginated retrieval.",
  inputs: {
    sysparm_limit: {
      ...sysparmLimit,
      comments:
        "Maximum number of records to return. For requests that exceed this number of records, use " +
        "the sysparm_offset parameter to paginate record retrieval. Allows numbers from 0 to 100.",
      example: "100",
      placeholder: "0",
    },
    sysparm_offset: {
      ...sysparmOffset,
      comments:
        "Starting record index for which to begin retrieving records. Use this value to paginate record retrieval. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks." +
        "For example, the first time you call this endpoint, sysparm_offset is set to '0'. To simply page through all available records, use sysparm_offset=sysparm_offset+sysparm_limit, until you reach the end of all records." +
        "Don't pass a negative number in the sysparm_offset parameter.",
      example: "0",
      placeholder: "0",
    },
  },
});
export const listConfigurationItemsInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  className,
  fetchAll,
  pagination: listConfigurationItemsPagination,
  sysparm_query: {
    ...sysparmQuery,
    comments:
      "All parameters are case-sensitive. Queries can contain more than one entry, such as sysparm_query=<col_name><operator><value>[<operator><col_name><operator><value>]. Refer to https://www.servicenow.com/docs/r/yokohama/api-reference/rest-apis/cmdb-instance-api.html#cmdb-GET-instance-classname for more information.",
    example: "ORDERBY<col_name>",
    placeholder: "ORDERBY<col_name>",
  },
};
export const updateConfigurationItemInputs = {
  connection,
  instanceUrlInput,
  sysId,
  apiVersionInput,
  className,
  configurationItemSource,
  configurationItemAttributes,
};
export const getCMDBClassMetaDataInputs = {
  connection,
  instanceUrlInput,
  apiVersionInput,
  className,
};
