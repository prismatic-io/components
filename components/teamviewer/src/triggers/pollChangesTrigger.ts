import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { POLL_RESOURCE_CONFIG } from "../constants";
import { pollChangesTriggerInputs } from "../inputs/triggers";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { PollingState, TeamViewerRecord } from "../types";
import { fetchDevices, fetchGroups, fetchUsers } from "../util";

const fetchersByResource: Record<
  string,
  (client: HttpClient) => Promise<TeamViewerRecord[]>
> = {
  devices: fetchDevices,
  users: fetchUsers,
  groups: fetchGroups,
};

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Records",
    description:
      "Checks for new devices, users, or groups in TeamViewer on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: async (context, payload, params) => {
    const pollState =
      (context.polling.getState() as unknown as PollingState) || {};
    const knownIds = new Set<string>(pollState.knownIds || []);

    const client = createClient(params.connection, context.debug.enabled);

    const resourceType = params.pollResourceType;
    if (!POLL_RESOURCE_CONFIG[resourceType]) {
      throw new Error(`Unsupported resource type: ${resourceType}`);
    }
    const fetcher = fetchersByResource[resourceType];

    const allRecords = await fetcher(client);

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled ${allRecords.length} ${resourceType} from TeamViewer. Known IDs: ${knownIds.size}`,
      );
    }

    const currentIds = allRecords.map(
      (r: TeamViewerRecord) => String(r.id),
    );

    const isFirstRun = knownIds.size === 0;

    const newRecords = isFirstRun
      ? []
      : allRecords.filter(
          (r: TeamViewerRecord) => !knownIds.has(String(r.id)),
        );

    context.polling.setState({ knownIds: currentIds });

    const outputRecords = params.showNewRecords ? newRecords : [];

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: outputRecords,
            updated: [],
          },
        },
      },
      polledNoChanges: outputRecords.length === 0,
    };
  },
});
