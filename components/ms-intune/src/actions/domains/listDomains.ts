import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { odataParams, connection } from "../../inputs/general";
import { listDomainsExamplePayload } from "../../examplePayloads";

export const listDomains = action({
  display: {
    label: "List Domains",
    description: "Retrieve a list of domain objects.",
  },
  perform: async (
    context,
    {
      connection,
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter,
      $select,
      $expand,
      $orderBy,
      $top,
      $skip,
      $count,
      $search,
      $format,
      $skipToken,
    };
    const { data } = await client.get("/domains", {
      params,
    });
    return {
      data,
    };
  },
  inputs: {
    connection,
    ...odataParams,
  },
  examplePayload: listDomainsExamplePayload,
});
