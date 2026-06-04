import { dataSource } from "@prismatic-io/spectral";
import {
  connection,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  organization,
  returnUuidOnly,
  sort,
  status,
  user,
} from "../inputs";
import { getCalendlyClient } from "../client";
import { getEvents, extractUuidFromUri } from "../util";

export const events = dataSource({
  display: {
    label: "Select Event",
    description: "Select an Event.",
  },
  inputs: {
    connection,
    inviteeEmail,
    maxStartTime,
    minStartTime,
    organization,
    returnUuidOnly,
    sort,
    status,
    user,
  },
  perform: async (
    context,
    {
      connection,
      inviteeEmail,
      maxStartTime,
      minStartTime,
      organization,
      returnUuidOnly,
      sort,
      status,
      user,
    },
  ) => {
    const client = getCalendlyClient(connection, false);
    const data = await getEvents(
      client,
      inviteeEmail,
      maxStartTime,
      minStartTime,
      organization,
      sort,
      status,
      user,
    );

    return {
      result: data.map((event: { name: string; uri: string }) => ({
        key: returnUuidOnly ? extractUuidFromUri(event.uri) : event.uri,
        label: event.name,
      })),
    };
  },
  dataSourceType: "picklist",
});
