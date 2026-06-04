import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import {
  dataAssetExample,
  dataSetExample,
  dataStoreExample,
  reportExampleRequest,
} from "./jsonExamples";
import {
  jsonInputClean,
  pollResourceModel,
  valueListInputToString,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const dataSetId = input({
  label: "Data Set ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the data set you would like to retrieve.",
  required: true,
  dataSource: "selectDataSet",
  clean: util.types.toString,
});

export const spaceId = input({
  label: "Space ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the space you would like to retrieve.",
  required: true,
  dataSource: "selectSpace",
  clean: util.types.toString,
});

export const ownerId = input({
  label: "Owner ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The user ID of the space owner.",
  required: true,
  dataSource: "selectUser",
  clean: util.types.toString,
});

export const reportId = input({
  label: "Report ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the report you would like to retrieve.",
  required: true,
  clean: util.types.toString,
});

export const dataAssetsId = input({
  label: "Data Assets ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the data set you would like to retrieve.",
  required: true,
  dataSource: "selectDataAsset",
  clean: util.types.toString,
});

export const dataStoreId = input({
  label: "Data Store ID",
  type: "string",
  example: "edaeaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the data store you would like to retrieve.",
  required: true,
  dataSource: "selectDataStore",
  clean: util.types.toString,
});

export const appId = input({
  label: "App ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The ID of the app you would like to retrieve.",
  required: true,
  dataSource: "selectApp",
  clean: util.types.toString,
});

export const dataFileId = input({
  label: "Data File ID",
  type: "string",
  example: "f5ceaff0-faa1-41c4-a479-03ff004839dc",
  comments: "The id of the data file you would like to retrieve.",
  required: true,
  dataSource: "selectDataFile",
  clean: util.types.toString,
});

export const projections = input({
  label: "Projections",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Fields name to return in the response.",
  clean: valueListInputToString,
});

export const sort = input({
  label: "Sort",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Comma-separated fields and field start with '-' character sorts the result set in descending order.",
  clean: valueListInputToString,
  example: "name,-createdTime",
});

export const dataSetIds = input({
  label: "Data Set IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "The IDs of the data sets you would like to delete.",
  clean: valueListInputToString,
});

export const qri = input({
  label: "QRI",
  type: "string",
  example:
    "string<qdf:<store-type>:<tenant-guid>:<<uid@/sid@>user/space guid>:<path-to-file>>",
  comments:
    "All the parts in the format must be separated by ':'. The first part denotes the resourceType, followed by dataStoreType and tenant guid. The spaceGuid or userGuid is to be populated based on if the dataset is in shared or private space and finally the full file name. This field is auto populated for the dataSet generated for qix-datafiles.",
  required: true,
  clean: util.types.toString,
});

export const name = input({
  label: "Name",
  type: "string",
  example: "New Data Set Name",
  comments: "The name of the data set.",
  required: false,
  clean: util.types.toString,
});

export const dataSetInput = input({
  label: "Data Set",
  type: "code",
  language: "json",
  comments: "The data set to create or update.",
  default: JSON.stringify(dataSetExample, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const attributeName = input({
  label: "Attribute Name",
  type: "string",
  example: "An attribute name.",
  comments: "The name of the attribute",
  required: false,
  clean: util.types.toString,
});

export const attributeDescription = input({
  label: "Attribute Description",
  type: "string",
  example: "An attribute description.",
  comments: "The description of the attribute",
  required: false,
  clean: util.types.toString,
});

export const usage = input({
  label: "Usage",
  type: "string",
  example: "ANALYTICS",
  comments:
    "Indicates whether the app is used for Analytics or DataPreparation",
  required: true,
  model: [
    {
      label: "ANALYTICS",
      value: "ANALYTICS",
    },
    {
      label: "DATA_PREPARATION",
      value: "DATA_PREPARATION",
    },
  ],
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  example: "EN_US",
  comments: "Set custom locale instead of the system default",
  required: true,
  clean: util.types.toString,
});

export const json = input({
  label: "JSON",
  type: "code",
  language: "json",
  comments: "The data set to create or update.",
  default: JSON.stringify(
    {
      appId: "34b91a1-0dc3-44ac-a847-51cb84122c84",
      sourceId: "566baa1-0dc3-44ac-a847-51cb84122c84",
      connectionId: "28203sd-0dc3-44ac-a847-51cb84122c84",
      tempContentFileId: "2dv03sd-0dc3-44ac-a847-51cb84122c84",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const fileInput = input({
  label: "File",
  type: "data",
  required: true,
  clean: util.types.toData,
  example: "Some binary file",
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "Name that will be given to the uploaded file.",
  clean: util.types.toString,
  example: "some-file-name.csv",
});

export const appType = input({
  label: "App Type",
  type: "string",
  required: true,
  comments: "Type of the application",
  clean: util.types.toString,
  example: "An App Type",
});

export const technicalName = input({
  label: "Technical Name",
  type: "string",
  required: true,
  comments: "Technical name of the application",
  clean: util.types.toString,
  example: "Some technical name",
});

export const secureQri = input({
  label: "Secure QRI",
  type: "string",
  required: true,
  comments: "Secure QRI of the application",
  clean: util.types.toString,
  example: "Some secure QRI",
});

export const dataAssetInput = input({
  label: "Data Asset",
  type: "code",
  language: "json",
  comments: "The data asset to create or update.",
  default: JSON.stringify(dataAssetExample, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "If present, the maximum number of data files to return.",
  clean: util.types.toString,
  default: "20",
  example: "20",
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments:
    "If present, the cursor that starts the page of data that is returned.",
  clean: util.types.toString,
  example: "asdasl123posidcs",
});

export const paramsInputFields = input({
  label: "Query Params",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "A list of params to send with the request.",
  example: "appId=f5ceaff0-faa1-41c4-a479-03ff004839dc",
  clean: (value: unknown) => {
    const myObject = util.types.keyValPairListToObject(
      value as KeyValuePair<unknown>[],
    );
    return myObject;
  },
});

export const uri = input({
  label: "URI",
  type: "string",
  required: true,
  comments: "The uri for the data store.",
  clean: util.types.toString,
  example: "https://some-uri.com",
});

export const type = input({
  label: "Type",
  type: "string",
  required: true,
  comments: "The Type for the data store.",
  clean: util.types.toString,
  example: "some-type",
});

export const dataStoreInput = input({
  label: "Data Store",
  type: "code",
  language: "json",
  comments: "The data store to create or update.",
  default: JSON.stringify(dataStoreExample, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const reportInput = input({
  label: "Report",
  type: "code",
  language: "json",
  comments: "The report data to create.",
  default: JSON.stringify(reportExampleRequest, null, 2),
  clean: jsonInputClean,
  required: false,
});

export const spaceType = input({
  label: "Type",
  type: "string",
  default: "shared",
  comments: "The type of space such as shared, managed, and so on.",
  required: true,
  model: [
    {
      label: "shared",
      value: "shared",
    },
    {
      label: "managed",
      value: "managed",
    },
    {
      label: "data",
      value: "data",
    },
  ],
  clean: util.types.toString,
});



const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The type of Qlik resource to poll for changes.",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
