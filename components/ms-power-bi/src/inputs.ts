import { util, input } from "@prismatic-io/spectral";
import { pollResourceModel } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const datasetId = input({
  label: "Dataset ID",
  type: "string",
  required: true,
  example: "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
  placeholder: "Enter Dataset ID",
  comments:
    "The unique identifier of the dataset. A dataset is a collection of tables that can be used to generate reports and visuals in Power BI. Datasets must be 'Push' datasets to be accessible via API.",
  dataSource: "selectDataset",
});

export const tableName = input({
  label: "Table Name",
  type: "string",
  required: true,
  example: "SalesData",
  placeholder: "Enter table name",
  comments: "The name of the table within the dataset.",
  clean: util.types.toString,
  dataSource: "selectTable",
});

export const datasetName = input({
  label: "Dataset Name",
  type: "string",
  example: "SalesDataset",
  placeholder: "Enter dataset name",
  comments: "The name for the new dataset to create.",
  required: true,
  clean: util.types.toString,
});

export const rows = input({
  label: "Rows",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of row objects to insert into the table. Each object should contain key-value pairs matching the table's column names.",
  example: JSON.stringify(
    [
      {
        ProductID: 1,
        Name: "Adjustable Race",
        Category: "Components",
        IsCompete: true,
        ManufacturedOn: "07/30/2014",
      },
      {
        ProductID: 2,
        Name: "LL Crankarm",
        Category: "Components",
        IsCompete: true,
        ManufacturedOn: "07/30/2014",
      },
      {
        ProductID: 3,
        Name: "HL Mountain Frame - Silver",
        Category: "Bikes",
        IsCompete: true,
        ManufacturedOn: "07/30/2014",
      },
    ],
    null,
    2
  ),
  clean: util.types.toObject,
});

export const columns = input({
  label: "Columns",
  type: "code",
  language: "json",
  required: true,
  comments:
    "An array of column definitions that define the table schema. Each column must have a name and dataType. Supported data types: Int64, Double, Boolean, DateTime, String, Decimal.",
  example: JSON.stringify(
    [
      {
        name: "ProductID",
        dataType: "Int64",
      },
      {
        name: "Name",
        dataType: "string",
      },
      {
        name: "Category",
        dataType: "string",
      },
      {
        name: "IsCompete",
        dataType: "bool",
      },
      {
        name: "ManufacturedOn",
        dataType: "DateTime",
      },
      {
        name: "Sales",
        dataType: "Int64",
        formatString: "Currency",
      },
    ],
    null,
    2
  ),
  clean: util.types.toObject,
});

export const top = input({
  label: "Top",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return. Must be a value between 1 and 1000.",
  example: "100",
  placeholder: "Enter maximum number of results",
  clean: (value) => util.types.toNumber(value) || undefined,
});

export const skipToken = input({
  label: "Page Offset",
  type: "string",
  required: false,
  comments:
    "The number of entries to skip for pagination. Used to retrieve results beyond the first page.",
  example: "100",
  placeholder: "Enter page offset",
  clean: (value) => util.types.toNumber(value) || undefined,
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});
