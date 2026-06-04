import { input, util } from "@prismatic-io/spectral";
import { connection, description, fetchAll, limit, name, offset } from "./common";

export const datasetId = input({
  label: "DataSet ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Domo DataSet.",
  placeholder: "Enter DataSet ID",
  example: "5168da8d-1c72-4e31-ba74-f609f73071dd",
  dataSource: "selectDataSet",
  clean: util.types.toString,
});

export const rows = input({
  label: "Rows",
  type: "string",
  required: false,
  comments: "The total number of rows to include in the DataSet.",
  placeholder: "Enter number of rows",
  example: "1000",
  clean: util.types.toString,
});

export const columns = input({
  label: "Columns",
  type: "code",
  language: "json",
  required: true,
  comments:
    "A JSON array defining the column schema for the DataSet, including type and name for each column.",
  example: JSON.stringify(
    [
      {
        type: "STRING",
        name: "Friend",
      },
      {
        type: "STRING",
        name: "Attending",
      },
    ],
    null,
    2,
  ),
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: false,
  comments: "The output filename for the exported CSV data.",
  placeholder: "Enter file name",
  example: "export_data.csv",
  clean: util.types.toString,
});

export const includeHeader = input({
  label: "Include Header",
  comments: "When true, includes table header in export.",
  type: "string",
  required: false,
  default: "",
  placeholder: "Select header option",
  model: [
    {
      label: "",
      value: "",
    },
    {
      label: "TRUE",
      value: "true",
    },
    {
      label: "FALSE",
      value: "false",
    },
  ],
  clean: util.types.toString,
});

export const csvBody = input({
  label: "CSV Body",
  type: "text",
  required: true,
  comments: "The CSV-formatted data to import into the DataSet.",
  placeholder: "Enter CSV data",
  example: "Name,Email\nJohn Doe,john@example.com\nJane Smith,jane@example.com",
  clean: util.types.toString,
});

export const nameLike = input({
  label: "Name Like",
  type: "string",
  required: false,
  comments:
    "A case-insensitive filter that limits the list to DataSets with names containing this string.",
  placeholder: "Enter name filter",
  example: "sales",
  clean: util.types.toString,
});

export const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments:
    "The DataSet field to sort by. Prefix with a negative sign to reverse the sort (e.g., '-name').",
  placeholder: "Enter sort field",
  example: "name",
  clean: util.types.toString,
});

export const sql = input({
  label: "SQL",
  type: "string",
  required: true,
  comments: "The SQL query to run against the DataSet.",
  placeholder: "Enter SQL query",
  example: "SELECT * FROM dataset WHERE status = 'active'",
  clean: util.types.toString,
});

export const updateDataSetBody = input({
  label: "Update DataSet Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The DataSet object to update.",
  example: JSON.stringify(
    {
      name: "Leonhard Euler Birthday Bash",
      description: "VIP Guest List",
      pdpEnabled: true,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const createDataSetInputs = {
  connection,
  name: input({
    ...name,
    required: true,
    comments: "Name of the DataSet to create",
  }),
  description,
  rows,
  columns,
};

export const deleteDataSetInputs = {
  connection,
  datasetId,
};

export const exportDataFromDataSetInputs = {
  connection,
  datasetId,
  fileName,
  includeHeader,
};

export const getDataSetInputs = {
  connection,
  datasetId,
};

export const importDataIntoDataSetInputs = {
  connection,
  datasetId,
  csvBody,
};

export const listDataSetsInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of DataSets to return in the list. The default is 50 and the maximum is 50.",
  }),
  nameLike,
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the DataSet ID to begin list of users within the response.",
  }),
  sort,
};

export const queryDataSetInputs = {
  connection,
  datasetId,
  sql,
};

export const updateDataSetInputs = {
  connection,
  datasetId,
  updateDataSetBody,
};
