import { dataSource } from "@prismatic-io/spectral";
import type { Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  connection,
  role,
  teamId,
  userPrincipalName,
  webinarId,
} from "../inputs";
import type { Channel, Team, User, Webinar } from "../interfaces";
import { getUserPath, paginateResults } from "../utils";

const teamNames = dataSource({
  display: {
    label: "Select Team",
    description: "A picklist of Teams.",
  },
  inputs: { connection, userPrincipalName },
  perform: async (context, { connection, userPrincipalName }) => {
    const client = await createClient(connection);
    const data = await paginateResults(
      client,
      `${getUserPath(userPrincipalName)}/joinedTeams`,
      true,
      {},
    );
    const result = ((data?.value as Team[]) || []).map<Element>(
      ({ displayName, id }) => ({
        label: displayName,
        key: id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});

const channelNames = dataSource({
  display: {
    label: "Select Channel",
    description: "A picklist of Channels.",
  },
  inputs: {
    connection,
    teamId: {
      ...teamId,
      dataSource: undefined,
    },
  },
  perform: async (context, { connection, teamId }) => {
    const client = await createClient(connection);
    const data = await paginateResults(
      client,
      `/teams/${teamId}/channels`,
      true,
      {},
    );

    const result = ((data?.value as Channel[]) || []).map<Element>(
      ({ displayName, id }) => ({
        label: displayName,
        key: id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});

export const userNames = dataSource({
  display: {
    label: "Select User",
    description: "A picklist of Users.",
  },
  inputs: { connection },
  perform: async (context, { connection }) => {
    const client = await createClient(connection);
    const data = await paginateResults(client, "/users", true, {});
    const result = (data.value as User[]).map<Element>(
      ({ displayName, id }) => ({
        label: displayName,
        key: id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});

export const webinarNames = dataSource({
  display: {
    label: "Select Webinar",
    description: "A picklist of Webinars.",
  },
  inputs: {
    connection,
    role: {
      ...role,
      model: undefined,
      default: "organizer",
      comments:
        "Should pick either 'organizer' or 'coOrganizer' as possible values.",
    },
  },
  perform: async (context, { connection, role }) => {
    const client = await createClient(connection);
    let endpointUrl = "/solutions/virtualEvents/webinars";
    if (role) {
      endpointUrl += `/getByUserRole(role='${role}')`;
    }

    const data = await paginateResults(client, endpointUrl, false, {});
    const result = (data.value as Webinar[]).map<Element>(
      ({ displayName, id }) => ({
        label: displayName,
        key: id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});

interface VirtualEventSession {
  id: string;
  subject?: string;
}

const selectWebinarSession = dataSource({
  display: {
    label: "Select Webinar Session",
    description: "A picklist of sessions for a webinar.",
  },
  inputs: {
    connection,
    webinarId: {
      ...webinarId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, webinarId }) => {
    const client = await createClient(connection);
    const data = await paginateResults(
      client,
      `/solutions/virtualEvents/webinars/${webinarId}/sessions`,
      true,
      {},
    );
    const result = ((data.value as VirtualEventSession[]) || []).map<Element>(
      ({ subject, id }) => ({
        label: subject || id,
        key: id,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
});

export default {
  teamNames,
  channelNames,
  userNames,
  webinarNames,
  selectWebinarSession,
};
