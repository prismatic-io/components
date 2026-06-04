import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  email,
  organization,
  sort,
  status,
  uuid,
} from "../../inputs";
import { listEventInviteesExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";

export const listEventInvitees = action({
  display: {
    label: "List Event Invitees",
    description: "Returns a list of Invitees for an event.",
  },
  perform: async (context, { connection, uuid, email, sort, status }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, `/scheduled_events/${uuid}/invitees`, {
      email: email || undefined,
      sort: sort || undefined,
      status: status || undefined,
    });

    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: { ...uuid, dataSource: "events" },
    email,
    sort,
    status,
  },
  examplePayload: listEventInviteesExamplePayload,
});
