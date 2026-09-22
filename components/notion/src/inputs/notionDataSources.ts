import { input, util } from "@prismatic-io/spectral";
import { propertiesInputsExample, sortInputExample } from "../examplePayloads";
import { cleanObject, toOptionalString } from "../utils";
import {
  connectionInput,
  databaseTitle,
  fetchAllInput,
  filterInput,
  icon,
  paginationInput,
  startCursorInput,
} from "./common";
import { databaseIdInput } from "./databases";
export const dataSourceIdInput = input({
  label: "Data Source ID",
  required: true,
  type: "string",
  placeholder: "Enter data source ID",
  example: "668d797c76fa49349b05ad288df2d136",
  comments:
    "The unique identifier of the data source. Find this in the Notion URL or database settings menu. See [Notion API Data Sources](https://developers.notion.com/docs/working-with-databases).",
  clean: util.types.toString,
  dataSource: "selectDataSource",
});
const resultTypeInput = input({
  label: "Result Type",
  type: "string",
  required: false,
  default: "database",
  comments:
    "Type of results to return. Use 'data_source' (recommended) for the new API or 'database' for legacy support.",
  model: [
    { label: "Data Sources (Recommended)", value: "data_source" },
    { label: "Databases (Legacy)", value: "database" },
  ],
  clean: toOptionalString,
});
const filterPropertiesInput = input({
  type: "code",
  label: "Filter Properties",
  language: "json",
  required: false,
  placeholder: "Enter a JSON object of property names and values",
  example: JSON.stringify(
    {
      Name: "example",
      Tag: ["tag1", "tag2"],
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "Limit the properties included in the response. Provide an object where keys are property names and values are property values or arrays of values.",
});
const sortInput = input({
  type: "code",
  label: "Sort",
  language: "json",
  required: false,
  placeholder: "Enter a JSON array of sort objects",
  example: JSON.stringify(sortInputExample, null, 2),
  clean: cleanObject,
  comments:
    "Array of sort objects defining the order of query results. Earlier sorts take precedence. See [Notion API Sort Documentation](https://developers.notion.com/reference/post-database-query-sort).",
});
const dataSourcePropertiesInput = input({
  type: "code",
  label: "Properties",
  language: "json",
  required: false,
  placeholder: "Enter a JSON property schema object",
  example: JSON.stringify(propertiesInputsExample, null, 2),
  clean: cleanObject,
  comments:
    "Property schema of the data source. The keys are the names of properties as they appear in Notion.",
});
export const retrieveDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
};
export const queryDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
  fetchAll: fetchAllInput,
  sorts: sortInput,
  filter: filterInput,
  pagination: paginationInput,
  resultType: resultTypeInput,
  filterProperties: filterPropertiesInput,
};
export const updateDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
  properties: dataSourcePropertiesInput,
  title: databaseTitle,
  icon,
  databaseId: {
    ...databaseIdInput,
    required: false,
    comments:
      "If provided, the parent of the data source will be changed to the specified database ID.",
  },
};
export const listDataSourcesInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  startCursor: startCursorInput,
};
export const createDataSourceInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  properties: dataSourcePropertiesInput,
  title: databaseTitle,
  icon,
};
