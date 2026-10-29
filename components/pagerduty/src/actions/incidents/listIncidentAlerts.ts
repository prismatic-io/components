import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listIncidentsAlertsExamplePayload } from "../../examplePayloads";
import {
  alertKey,
  connectionInput,
  fetchAll,
  incidentId,
  alertInclude as includeAlert,
  limit,
  offset,
  alertSortBy as sortByAlert,
  statuses,
  total,
} from "../../inputs";
import { fetchAllWithPagination } from "../../util/fetchAllWithPagination";

export const listIncidentAlerts = action({
  display: {
    label: "List Incident Alerts",
    description: "List alerts for an incident.",
  },
  perform: async (
    context,
    {
      connection,
      id,
      limit,
      offset,
      total,
      alertKey,
      statuses,
      sortBy,
      include,
      fetchAll,
    },
  ) => {
    const endpoint = ENDPOINTS.INCIDENTS_ALERTS(id);
    const client = createClient(connection, context.debug.enabled);
    const params = {
      limit,
      offset,
      total,
      alert_key: alertKey,
      "statuses[]": statuses,
      sort_by: sortBy,
      "include[]": include,
    };

    if (fetchAll) {
      return {
        data: await fetchAllWithPagination({
          client,
          configVars: params,
          endpoint,
          objectKey: "alerts",
        }),
      };
    }

    const { data } = await client.get(endpoint, {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: incidentId,
    fetchAll,
    limit,
    offset,
    total,
    alertKey,
    statuses,
    sortBy: sortByAlert,
    include: includeAlert,
  },
  examplePayload: listIncidentsAlertsExamplePayload,
});
