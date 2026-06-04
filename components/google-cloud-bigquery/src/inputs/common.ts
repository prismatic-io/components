import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean } from "../util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Cloud BigQuery connection to use.",
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the Google Cloud project.",
  example: "my-project-12345",
  placeholder: "Enter project ID",
  required: true,
  dataSource: "projectsNames",
});

export const datasetId = input({
  label: "Dataset ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the dataset.",
  example: "my_dataset",
  placeholder: "Enter dataset ID",
  required: true,
  dataSource: "selectDataset",
});

export const tableId = input({
  label: "Table ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the table.",
  example: "my_table",
  placeholder: "Enter table ID",
  required: true,
  dataSource: "tablesNames",
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  clean: util.types.toNumber,
  comments:
    "The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection.",
  example: "100",
  placeholder: "Enter maximum results",
  required: false,
});

export const pageToken = input({
  label: "Page Token",
  type: "string",
  clean: cleanString,
  comments:
    "Page token returned by a previous call to request the next page of results.",
  example: "CAESBAgCIAE",
  placeholder: "Enter page token",
  required: false,
});

export const filter = input({
  label: "Filter",
  type: "string",
  clean: cleanString,
  comments:
    "An expression for filtering the results of the request by label. The syntax is 'labels.<name>[:<value>]'. Multiple filters can be ANDed together by connecting with a space. Example: 'labels.department:receiving labels.active'. See [Filtering datasets](https://cloud.google.com/bigquery/docs/labeling-datasets#filtering_datasets_using_labels) using labels for details.",
  example: "labels.department:receiving labels.active",
  placeholder: "Enter filter expression",
  required: false,
});

export const selectedFields = input({
  label: "Selected Fields",
  type: "string",
  clean: util.types.toString,
  comments:
    "tabledata.list of table schema fields to return (comma-separated). If unspecified, all fields are returned. A fieldMask cannot be used here because the fields will automatically be converted from camelCase to snake_case and the conversion will fail if there are underscores. Since these are fields in BigQuery table schemas, underscores are allowed.",
  placeholder: "Enter selected fields",
  required: false,
});

export const startIndex = input({
  label: "Start Index",
  type: "string",
  clean: util.types.toString,
  comments: "Zero-based index of the starting row.",
  example: "0",
  placeholder: "Enter start index",
  required: false,
});

export const kind = input({
  label: "Kind",
  type: "string",
  clean: util.types.toString,
  comments: "Output only. The resource type.",
  example: "bigquery#dataset",
  placeholder: "Enter resource kind",
  required: false,
});

export const etag = input({
  label: "ETag",
  type: "string",
  clean: util.types.toString,
  comments: "Output only. A hash of the resource.",
  example: 'W/"abc123def456"',
  placeholder: "Enter ETag",
  required: false,
});

export const id = input({
  label: "ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. The fully-qualified unique name of the dataset in the format projectId:datasetId. The dataset name without the project name is given in the datasetId field. When creating a new dataset, leave this field blank, and instead specify the datasetId field.",
  example: "my-project:my_dataset",
  placeholder: "Enter ID",
  required: false,
});

export const selfLink = input({
  label: "Self Link",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. A URL that can be used to access the resource again. You can use this URL in Get or Update requests to the resource.",
  example:
    "https://bigquery.googleapis.com/bigquery/v2/projects/my-project/datasets/my_dataset",
  placeholder: "Enter self link",
  required: false,
});

export const friendlyName = input({
  label: "Friendly Name",
  type: "string",
  clean: util.types.toString,
  comments: "Optional. A descriptive name for the dataset.",
  example: "My Dataset",
  placeholder: "Enter friendly name",
  required: false,
});

export const description = input({
  label: "Description",
  type: "string",
  clean: util.types.toString,
  comments: "Optional. A descriptive name for the dataset.",
  example: "This dataset contains sales data",
  placeholder: "Enter description",
  required: false,
});

export const creationTime = input({
  label: "Creation Time",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. The time when this dataset was created, in milliseconds since the epoch.",
  example: "1609459200000",
  placeholder: "Enter creation time",
  required: false,
});

export const lastModifiedTime = input({
  label: "Last Modified Time",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. The date when this dataset was last modified, in milliseconds since the epoch.",
  example: "1640995200000",
  placeholder: "Enter last modified time",
  required: false,
});

export const location = input({
  label: "Location",
  type: "string",
  clean: util.types.toString,
  comments:
    "The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations.",
  example: "US",
  placeholder: "Enter location",
  required: false,
});

export const defaultCollation = input({
  label: "Default Collation",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. Defines the default collation specification of future tables created in the dataset. If a table is created in this dataset without table-level default collation, then the table inherits the dataset default collation, which is applied to the string fields that do not have explicit collation specified. A change to this field affects only tables created afterwards, and does not alter the existing tables. The following values are supported: 'und:ci': undetermined locale, case insensitive.'' empty string. Default to case-sensitive behavior.",
  example: "und:ci",
  placeholder: "Enter default collation",
  required: false,
});

export const defaultRoundingMode = input({
  label: "Default Rounding Mode",
  type: "string",
  clean: util.types.toString,
  required: false,
  comments:
    "Optional. Defines the default rounding mode specification of new tables created within this dataset. During table creation, if this field is specified, the table within this dataset will inherit the default rounding mode of the dataset. Setting the default rounding mode on a table overrides this option. Existing tables in the dataset are unaffected. If columns are defined during that table creation, they will immediately inherit the table's default rounding mode, unless otherwise specified.",
  placeholder: "Select rounding mode",
  model: [
    {
      label: "ROUNDING MODE UNSPECIFIED",
      value: "ROUNDING_MODE_UNSPECIFIED",
    },
    {
      label: "ROUND HALF AWAY FROM ZERO",
      value: "ROUND_HALF_AWAY_FROM_ZERO",
    },
    {
      label: "ROUND HALF EVEN",
      value: "ROUND_HALF_EVEN",
    },
  ],
});

export const encryptionConfiguration = input({
  label: "Encryption Configuration",
  type: "code",
  language: "json",
  comments:
    "Custom encryption configuration (e.g., Cloud KMS keys). This shows the encryption configuration of the model data while stored in BigQuery storage. This field can be used with models.patch to update encryption key for an already encrypted model.",
  example: JSON.stringify({
    kmsKeyName: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const expirationTime = input({
  label: "Expiration Time",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. The time when this model expires, in milliseconds since the epoch. If not present, the model will persist indefinitely. Expired models will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created models.",
  required: false,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const labels = input({
  label: "Labels",
  type: "code",
  language: "json",
  comments:
    "The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See Creating and Updating Dataset Labels for more information.",
  example: JSON.stringify({ name: "wrench", mass: "1.3kg", count: "3" }),
  clean: jsonInputClean,
  required: false,
});
