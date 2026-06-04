import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { connectionInput, odataParams } from "../../inputs/general";
import type { Company, MultipleItemsResponse } from "../../interfaces";

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
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const params = {
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
    };

    const { data } = await client.get<MultipleItemsResponse<Company[]>>("/companies", {
      params,
    });

    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...odataParams,
  },
  examplePayload: listCompaniesExamplePayload,
});
