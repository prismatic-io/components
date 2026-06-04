import { URL } from "node:url";
import { type DataPayload, util } from "@prismatic-io/spectral";
import axios from "axios";
import type { APIResponse, Data, DriveItem } from "./interfaces";

export const isMultidimensionalArray = (
  arr: unknown[],
  dimension: number,
): boolean => {
  if (!Array.isArray(arr)) {
    return false;
  }
  if (dimension === 1) {
    return true;
  }
  return isMultidimensionalArray(arr[0] as unknown[], dimension - 1);
};

export const is2dArray = (val: unknown) => {
  const value = util.types.toObject(val);
  if (value) {
    if (isMultidimensionalArray(value as unknown[], 2)) {
      return value;
    }
  }
  throw new Error("Expecting a valid 2D array");
};

export const is3dArray = (val: unknown) => {
  const value = util.types.toObject(val);
  if (value) {
    if (isMultidimensionalArray(value as unknown[], 3)) {
      return value;
    }
  }
  throw new Error("Expecting a valid 3D array");
};

export const isSharePointUrl = (url: string) => {
  const regex = new RegExp(/sharepoint.com/);
  return regex.test(url);
};

export const checkDownloadQueryParam = (url: string) => {
  const urlObj = new URL(url);
  if (!urlObj.searchParams.has("download")) {
    
    urlObj.searchParams.set("download", "1");
  }

  return urlObj.toString();
};

export const downloadFileFromSharepoint = async (
  url: string,
): Promise<Buffer> => {
  try {
    
    const authorizationRequestResponse = await axios.get(url, {
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => {
        return status >= 200 && status < 303; 
      },
    });

    
    const location = authorizationRequestResponse.headers.location;
    const cookie = authorizationRequestResponse.headers["set-cookie"];

    if (!location) {
      throw new Error("Location header not found in the response.");
    }

    
    const host = authorizationRequestResponse.request.host;
    const downloadUrl = `https://${host}${location}`;
    const downloadFileRequestResponse = await axios.get<Buffer>(downloadUrl, {
      responseType: "arraybuffer",
      headers: { Cookie: cookie },
    });

    return downloadFileRequestResponse.data;
  } catch (error) {
    if (error instanceof Error && "message" in error) {
      throw new Error(`Error in downloadFileFromSharepoint: ${error.message}`);
    }
    throw error;
  }
};

const isData = (input: unknown): input is Data =>
  typeof input === "object" && "data" in input;

const isParsable = (input: unknown): input is string | ArrayBuffer | Buffer =>
  typeof input === "string" ||
  input instanceof ArrayBuffer ||
  input instanceof Buffer;

export const validateFileParsable = (input: unknown): DataPayload => {
  const file = util.types.toData(input);
  if (!isData(file)) {
    throw new Error("Expecting an object");
  }

  if (!isParsable(file.data)) {
    throw new Error(
      `expecting data to be a string or ArrayBuffer but found ${typeof file.data}`,
    );
  }

  return file;
};

export const cleanStringValueListInput = (value: unknown) => {
  if (value && Array.isArray(value)) {
    return value.map((val) => {
      if (val) {
        return util.types.toString(val);
      }
      throw new Error("Expecting a string value");
    });
  }
  return undefined;
};

export const buildMultidimensionalSheet = <T>(
  sheetData: unknown[],
  sheetNames: string[],
  createOptions = null,
) => {
  if (sheetData.length !== sheetNames.length) {
    throw new Error("The number of sheet data and sheet names must be equal.");
  }
  return sheetData.map((data, index) => {
    return {
      name: sheetNames[index],
      data: data as T,
      options: createOptions,
    };
  });
};

export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumber = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;

export const cleanCode = (value: unknown) =>
  value ? util.types.toObject(value) : undefined;

import {
  type Connection,
  ConnectionError,
  type InputFieldChoice,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";
import { API_URL, API_VERSIONS, WORKBOOK_SOURCES } from "./constants";
import { ConnectionKeys } from "ms-utils";

export const getBaseUrl = (useBeta: boolean): string => {
  const version = useBeta ? API_VERSIONS.beta : API_VERSIONS.v1;
  const baseUrl = `${API_URL}${version}`;
  return baseUrl;
};

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);

  
  const additionalConnectionKeys = [
    ConnectionKeys.SharepointTemplatedOauth,
    ConnectionKeys.SharedOauth,
  ];
  const allValidConnectionKeys: string[] = [
    ...connectionKeys,
    ...additionalConnectionKeys,
  ];
  if (!allValidConnectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

export const mapModel = (source: Record<string, string>): InputFieldChoice[] =>
  Object.keys(source).map((key) => ({
    label: key,
    value: source[key],
  }));

export const mapModelArray = (source: string[]): InputFieldChoice[] =>
  source.map((key) => ({
    label: key,
    value: key,
  }));

export const paginateResults = async <T>(
  client: HttpClient,
  url: string,
  fetchAll: boolean,
  params: Record<string, unknown> | undefined = undefined,
): Promise<APIResponse<T>> => {
  let finalParams = params;
  if (fetchAll) {
    const results = [];
    let nextLink = url;
    let lastResponse = null;
    delete finalParams?.$top;
    delete finalParams?.$skip;
    delete finalParams?.$skipToken;
    do {
      const { data } = await client.get(nextLink, {
        params: finalParams,
      });
      const { value, ...rest } = data;
      lastResponse = rest;
      results.push(...value);
      nextLink = data["@odata.nextLink"];
      
      if (nextLink) {
        finalParams = undefined;
      }
    } while (nextLink);
    return {
      value: results,
      ...lastResponse,
    } as APIResponse<T>;
  }
  const { data } = await client.get(url, {
    params: finalParams,
  });
  return data as APIResponse<T>;
};

export const getSource = (connection: Connection): string => {
  if (connection.fields?.source)
    return util.types.toString(connection.fields.source);

  throw new Error("Source not found in connection fields.");
};

export const getDriveOrSiteBaseUrl = (
  source: string,
  driveOrSiteId: string,
  workbookId: string,
) => {
  switch (source) {
    case "OneDrive":
      return `/drives/${driveOrSiteId}/items/${workbookId}/workbook`;
    case "SharePoint":
      return `/sites/${driveOrSiteId}/drive/items/${workbookId}/workbook`;
    default:
      throw new Error(`Unsupported source ${source}.`);
  }
};

export const getPathUrl = (
  source: string,
  path: string | undefined,
  driveOrSiteId: string | undefined,
  listOrItemId: string | undefined,
) => {
  let url: string;
  const DRIVE_ROOT_URL = `/drives/${driveOrSiteId}/root/children`;
  const DRIVE_ITEM_URL = `/drives/${driveOrSiteId}/items/${listOrItemId}/children`;
  const SITE_ROOT_URL = `/sites/${driveOrSiteId}/drive/root/children`;
  const SITE_ITEM_URL = `/sites/${driveOrSiteId}/drive/items/${listOrItemId}/children`;
  if (path) {
    url = path;
  } else {
    switch (source) {
      case WORKBOOK_SOURCES.OneDrive:
        url = listOrItemId ? DRIVE_ITEM_URL : DRIVE_ROOT_URL;
        break;
      case WORKBOOK_SOURCES.SharePoint:
        url = listOrItemId ? SITE_ITEM_URL : SITE_ROOT_URL;
        break;
      default:
        throw new Error(`Unsupported source ${source}.`);
    }
  }

  if (!url) {
    throw new Error(
      "You must fill Path or Drive Or Site Id to list workbooks.",
    );
  }

  return url;
};

export const isExcelWorkbook = (item: DriveItem) => {
  const types = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
    "application/vnd.ms-excel", 
    "application/vnd.ms-excel.sheet.macroEnabled.12", 
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template", 
    "application/vnd.ms-excel.template.macroEnabled.12", 
  ];
  return item.file && types.includes(item.file.mimeType);
};
