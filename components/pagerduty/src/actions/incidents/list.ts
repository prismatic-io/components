import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listIncidentsExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  dateRange,
  fetchAll,
  incidentKey,
  include,
  limit,
  offset,
  serviceIds,
  since,
  sortBy,
  statuses,
  teamIds,
  timeZone,
  total,
  until,
  urgencies,
  userIds,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listIncidents = action({
  display: {
    label: "List Incidents",
    description: "List incidents with optional filters.",
  },
  perform: async (
    context,
    {
      connection,
      limit,
      offset,
      total,
      dateRange,
      incidentKey,
      serviceIds,
      teamIds,
      userIds,
      urgencies,
      timeZone,
      statuses,
      sortBy,
      include,
      since,
      until,
      fetchAll,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      limit,
      offset,
      total,
      date_range: dateRange,
      incident_key: incidentKey,
      "service_ids[]": serviceIds,
      "team_ids[]": teamIds,
      "user_ids[]": userIds,
      "urgencies[]": urgencies,
      time_zone: timeZone,
      "statuses[]": statuses,
      sort_by: sortBy,
      "include[]": include,
      since,
      until,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint: ENDPOINTS.INCIDENTS,
          objectKey: "incidents",
        }),
      };
    }

    const { data } = await client.get(ENDPOINTS.INCIDENTS, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit,
    offset,
    total,
    dateRange,
    incidentKey,
    serviceIds,
    teamIds,
    userIds,
    urgencies,
    timeZone,
    statuses,
    sortBy,
    include,
    since,
    until,
  },
  examplePayload: listIncidentsExamplePayload,
});
