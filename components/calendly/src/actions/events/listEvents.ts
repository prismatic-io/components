import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  inviteeEmail,
  maxStartTime,
  minStartTime,
  organization,
  sort,
  status,
  user,
} from "../../inputs";
import { listEventsExamplePayload } from "../../examplePayloads";
import { getEvents } from "../../util";

export const listEvents = action({
  display: {
    label: "List Events",
    description: "Returns a list of Events.",
  },
  perform: async (
    context,
    {
      connection,
      inviteeEmail,
      maxStartTime,
      minStartTime,
      organization,
      sort,
      status,
      user,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
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
    return { data };
  },
  inputs: {
    connection,
    inviteeEmail,
    maxStartTime,
    minStartTime,
    organization: { ...organization, dataSource: "organizations" },
    sort,
    status,
    user,
  },
  examplePayload: listEventsExamplePayload,
});
