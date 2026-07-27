import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { paginateResults } from "ms-utils";
import { connectionInput, fetchAll, odataParams } from "../../inputs/general";
import { listCompaniesExamplePayload } from "../../examplePayloads";
export const listCompanies = action({
  display: {
    label: "List Companies",
    description:
      "Retrieve the properties and relationships of companies in your Business Central organization.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      $count,
      $expand,
      $format,
      $orderBy,
      $search,
      $select,
      $skip,
      $skipToken,
      $top,
      $filter,
    },
  ) => {
    const client = getMsBusinessCentralClient(
      connection,
      context,
      context.debug.enabled,
    );
    const params = {
      $count,
      $expand,
      $format,
      $orderBy,
      $search,
      $select,
      $skip,
      $skipToken,
      $filter,
    };
    return await paginateResults<
      (typeof listCompaniesExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/companies",
      params,
      fetchAll,
      pageSize: $top,
    });
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    ...odataParams,
  },
  examplePayload: listCompaniesExamplePayload,
});
