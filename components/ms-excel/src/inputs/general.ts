import { input, util } from "@prismatic-io/spectral";
import {
  cleanString,
  cleanStringValueListInput,
  is2dArray,
  is3dArray,
  validateFileParsable,
  mapModel,
} from "../helpers";
import { API_VERSIONS } from "../constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments:
    "The Microsoft Excel connection to use. OneDrive and SharePoint connections are supported.",
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  model: mapModel(API_VERSIONS),
  required: true,
  comments: "The version of the Microsoft Graph API to use.",
  placeholder: "Enter API version",
  example: "v1.0",
  clean: cleanString,
});

export const file = input({
  label: "File",
  comments: "A spreadsheet file or buffer to be parsed into array values.",
  type: "string",
  required: true,
  placeholder: "Enter file path or reference",
  clean: validateFileParsable,
});

export const sheetData = input({
  label: "Spreadsheet Data",
  type: "code",
  language: "json",
  comments:
    "A 2D array of cell values to insert into the spreadsheet. Each inner array represents a row.",
  required: true,
  placeholder: "Enter 2D JSON array of cell values",
  default: JSON.stringify(
    [
      [1, 2, 3, 4, 5],
      ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
      [true, false, null, "sheetjs"],
    ],
    null,
    2,
  ),
  clean: is2dArray,
});

export const multiSheetData = input({
  label: "Spreadsheet Data",
  type: "code",
  language: "json",
  comments:
    "A 3D array of sheet data. Each top-level array is a sheet, containing rows of cell values.",
  required: true,
  placeholder: "Enter 3D JSON array of sheet data",
  default: JSON.stringify(
    [
      [
        [4, 5, 6],
        [7, 8, 9, 10],
        [11, 12, 13, 14],
        ["baz", null, "qux"],
      ],
      [
        [1, 2, 3, 4, 5],
        ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
        [true, false, null, "sheetjs"],
      ],
    ],
    null,
    2,
  ),
  clean: is3dArray,
});

export const fileName = input({
  label: "File Name",
  example: "mySheet",
  placeholder: "Enter file name",
  comments: "The name to assign to the generated spreadsheet file.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const sheetNames = input({
  label: "Sheet Names",
  example: "mySheet",
  placeholder: "Enter sheet name",
  comments: "The name to assign to each sheet in the spreadsheet.",
  type: "string",
  required: false,
  collection: "valuelist",
  clean: cleanStringValueListInput,
});

export const alternativeSheetNames = input({
  label: "Structured Sheet Names",
  example: JSON.stringify(["Sheet1", "Sheet2"]),
  placeholder: "Enter JSON array of sheet names",
  comments:
    "A JSON array of sheet names as an alternative to the Sheet Names input. Takes priority over the Sheet Names input when both are provided.",
  type: "code",
  language: "json",
  required: false,
  clean: (value: unknown) => util.types.toObject(value) as string[],
});

export const createOptions = input({
  label: "Create Options",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter spreadsheet creation options as JSON",
  comments:
    "Configuration options for spreadsheet generation, such as column widths. Accepts a JSON object with node-xlsx compatible options.",
  default: JSON.stringify(
    { "!cols": [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }] },
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const fileUrl = input({
  label: "File URL",
  type: "string",
  required: true,
  comments: "The URL of the xlsx file to download and parse.",
  example: "https://example.com/file.xlsx",
  placeholder: "Enter file URL",
  clean: util.types.toString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  comments:
    "An OData filter expression to narrow down results. For example: startswith(givenName,'J').",
  required: false,
  placeholder: "Enter filter expression",
  example: "startswith(givenName,'J')",
  clean: cleanString,
});

export const $select = input({
  label: "Select",
  type: "string",
  comments:
    "A comma-separated list of properties to include in the response. Reduces payload size.",
  required: false,
  placeholder: "Enter comma-separated property names",
  example: "givenName,surname",
  clean: cleanString,
});

export const $expand = input({
  label: "Expand",
  type: "string",
  comments:
    "A comma-separated list of related resources to expand and include in the response.",
  required: false,
  placeholder: "Enter related resource to expand",
  example: "members",
  clean: cleanString,
});

export const $orderBy = input({
  label: "Order By",
  type: "string",
  comments:
    "An OData orderBy expression to sort results. For example: displayName desc.",
  required: false,
  placeholder: "Enter order by expression",
  example: "displayName desc",
  clean: cleanString,
});

export const $top = input({
  label: "Top",
  type: "string",
  comments: "The maximum number of results to return per page.",
  required: false,
  placeholder: "Enter page size",
  example: "10",
  clean: util.types.toNumber,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  comments:
    "Indexes into a result set. Also used by some APIs to implement paging and can be used together with $top to manually page results.",
  required: false,
  placeholder: "Enter number of items to skip",
  example: "10",
  clean: cleanString,
});

export const $search = input({
  label: "Search",
  type: "string",
  comments:
    "A search string to filter results by matching against indexed properties.",
  required: false,
  placeholder: "Enter search terms",
  example: "pizza",
  clean: cleanString,
});

export const $format = input({
  label: "Format",
  type: "string",
  comments: "The media format for the response. For example: json.",
  required: false,
  placeholder: "Enter media format",
  example: "json",
  clean: cleanString,
});

export const $skipToken = input({
  label: "Skip Token",
  type: "string",
  comments:
    "Retrieves the next page of results from result sets that span multiple pages.",
  required: false,
  placeholder: "Enter skip token",
  example: "X%274453707402000100000017...",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const oDataParams = {
  fetchAll,
  $expand,
  $filter,
  $format,
  $orderBy,
  $search,
  $select,
  $skip,
  $skipToken,
  $top,
};

export const driveOrSiteId = input({
  label: "Drive or Site ID",
  type: "string",
  comments: "The ID of the OneDrive or SharePoint site to list workbooks from.",
  required: true,
  example: "b!WumF-zsD8ku93Y0QqhKM9jVTjPefo6RGrpVCkPpe547Qrf38sox_TYIFuj9sqJhv",
  placeholder: "Enter Drive or Site ID",
  dataSource: "selectDriveOrSite",
  clean: util.types.toString,
});

export const workbookId = input({
  label: "Workbook ID",
  type: "string",
  required: true,
  comments: "The ID of the workbook to retrieve.",
  example: "02J363WTJPABCDEFGTIRHYMKT7BX7JJZXQ",
  placeholder: "Enter Workbook ID",
  dataSource: "selectWorkbook",
  clean: util.types.toString,
});

export const worksheetId = input({
  label: "Worksheet ID",
  type: "string",
  required: true,
  comments: "The ID or name of the worksheet to retrieve.",
  example: "{00000000-0001-0000-0000-000000000000}",
  placeholder: "Enter Worksheet ID",
  dataSource: "selectWorksheet",
  clean: util.types.toString,
});
