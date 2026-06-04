import { dataSource } from "@prismatic-io/spectral";
import { connection, uuid, returnUuidOnly } from "../inputs";
import { getCalendlyClient } from "../client";
import { paginator, extractUuidFromUri } from "../util";

export const selectEventInvitee = dataSource({
  display: {
    label: "Select Event Invitee",
    description: "Select an Event Invitee.",
  },
  inputs: {
    connection,
    uuid,
    returnUuidOnly,
  },
  perform: async (context, { connection, uuid, returnUuidOnly }) => {
    const client = getCalendlyClient(connection, false);
    const data = await paginator(
      client,
      `/scheduled_events/${uuid}/invitees`,
      {},
    );

    return {
      result: data.map(
        (invitee: { email: string; name: string; uri: string }) => ({
          key: returnUuidOnly ? extractUuidFromUri(invitee.uri) : invitee.uri,
          label: `${invitee.name} <${invitee.email}>`,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
});
