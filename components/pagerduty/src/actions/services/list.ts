import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listServicesExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  limit,
  offset,
  query,
  servicesInclude,
  servicesName,
  servicesSortBy,
  teamIds,
  timeZone,
  total,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listServices = action({
  display: {
    label: "List Services",
    description: "List services with optional filters.",
  },
  perform: async (
    context,
    {
      connection,
      query,
      limit,
      offset,
      total,
      teamIds,
      timeZone,
      sortBy,
      include,
      name,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      query,
      limit,
      offset,
      total,
      "team_ids[]": teamIds,
      time_zone: timeZone,
      sort_by: sortBy,
      "include[]": include,
      name,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.SERVICES,
          objectKey: "services",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.SERVICES, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    query,
    limit,
    offset,
    total,
    teamIds,
    timeZone,
    sortBy: servicesSortBy,
    include: servicesInclude,
    name: servicesName,
  },
  examplePayload: listServicesExamplePayload,
});
