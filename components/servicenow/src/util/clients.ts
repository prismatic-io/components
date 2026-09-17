import { type Connection, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import urljoin from "url-join";
import { createClient } from "../client";
const buildKnowledgeManagementApiUrl = (
  apiVersion: string,
  instanceUrlInput: string,
): string => {
  const subpath =
    apiVersion === "latest" ? "/api/sn_km_api" : `/api/sn_km_api/${apiVersion}`;
  return urljoin(instanceUrlInput, subpath);
};
export const getKnowledgeManagementApiClient = (
  connection: Connection,
  instanceUrlInput: string,
  apiVersion: string,
  debug: boolean,
): HttpClient => {
  const baseURL = buildKnowledgeManagementApiUrl(apiVersion, instanceUrlInput);
  return createClient(connection, baseURL, debug);
};
export const createNowApiClient = (
  connection: Connection,
  instanceUrlInput: string,
  apiVersion: string,
  debug: boolean,
): HttpClient => {
  const subpath =
    apiVersion === "latest"
      ? `api/now`
      : `api/now/${util.types.toString(apiVersion)}`;
  const baseURL = urljoin(instanceUrlInput, subpath);
  return createClient(connection, baseURL, debug);
};
