import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DocumentNode } from "graphql";
import type { GraphQLClient, Variables } from "graphql-request";
import parseLinkHeader from "parse-link-header";
import type { ObjectNodes, PageInfo, PaginationResponse } from "../types";
export const computePageInformation = async (
  client: HttpClient,
  url: string,
  params: Record<string, string>,
  getAlldata = false,
) => {
  const toReturnData: Record<string, unknown[]> = {};
  let toReturnHeaders: unknown;
  let pagination: PaginationResponse;
  do {
    const { data, headers } = await client.get(url, {
      params,
    });
    toReturnHeaders = headers;
    const attributeName = Object.keys(data)[0];
    if (!toReturnData[attributeName]) {
      toReturnData[attributeName] = [];
    }
    toReturnData[attributeName].push(...data[attributeName]);
    const { link } = util.types.lowerCaseHeaders(
      headers as Record<string, string>,
    );
    if (link) {
      pagination = parseLinkHeader(link);
      if (pagination.next?.page_info) {
        params.page_info = pagination.next.page_info;
      } else {
        params.page_info = undefined;
      }
    } else {
      params.page_info = undefined;
    }
  } while (getAlldata && params.page_info);
  return {
    data: toReturnData,
    pagination,
    pageInfo: pagination?.next?.page_info || null,
    rel: pagination?.next?.page_info ? 'rel="next"' : null,
    headers: toReturnHeaders,
  };
};
const getPaginatedObject = <T>(attributePath: string[], data) => {
  const object: ObjectNodes<T> = attributePath.reduce((acc, attribute) => {
    if (!acc[attribute]) {
      throw new Error(`Attribute ${attribute} not found in data.`);
    }
    return acc[attribute];
  }, data);
  return object;
};
export const fetchData = async <T>(
  client: GraphQLClient,
  attributePath: string[],
  listKey: string,
  getAlldata: boolean,
  query: DocumentNode,
  variables: Variables,
) => {
  const data = await client.request(query, variables);
  const object = getPaginatedObject<T>(attributePath, data);
  const allData = {
    [listKey]: object.nodes,
    pageInfo: object.pageInfo,
  } as Record<string, T[]> & {
    pageInfo: PageInfo;
  };
  if (!getAlldata) {
    return allData;
  }
  let hasNextPage = object.pageInfo.hasNextPage;
  let cursor = object.pageInfo.endCursor;
  while (hasNextPage) {
    const newData = await client.request(query, {
      ...variables,
      cursor,
    });
    const newObject = getPaginatedObject<T>(attributePath, newData);
    allData[listKey] = allData[listKey].concat(newObject.nodes);
    allData.pageInfo = newObject.pageInfo;
    hasNextPage = newObject.pageInfo.hasNextPage;
    cursor = newObject.pageInfo.endCursor;
  }
  return allData;
};
