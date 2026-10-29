import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollMobileDevicesInputs } from "../inputs";
import type { MobileDevice, MobileDevicePollingState } from "../types";
import { paginateResults } from "../util";

export const pollNewMobileDevices = pollingTrigger({
  display: {
    label: "New Mobile Devices",
    description:
      "Checks for newly enrolled mobile devices in Jamf Pro on a configured schedule.",
  },
  inputs: pollMobileDevicesInputs,
  perform: async (context, payload, { connection }) => {
    const pollState = context.polling.getState() as MobileDevicePollingState;
    const lastMaxId = pollState.lastMaxId ?? 0;
    const isFirstRun = pollState.lastMaxId === undefined;

    context.logger.debug(
      `Polling for new mobile devices. Last known max ID: ${lastMaxId}`,
    );

    const client = await createClient(connection, context.debug.enabled);
    const { results: allDevices } = await paginateResults<MobileDevice>(
      client,
      "/v2/mobile-devices",
      true,
      {},
    );
    const newMaxId = allDevices.reduce(
      (max, d) => Math.max(max, util.types.toInt(d.id, 10) || 0),
      lastMaxId,
    );

    context.polling.setState({ lastMaxId: newMaxId });

    if (isFirstRun) {
      context.logger.debug(
        `First run — established baseline of ${allDevices.length} devices. Max ID: ${newMaxId}`,
      );
      return {
        payload: { ...payload, body: { data: [] } },
        polledNoChanges: true,
      };
    }

    const newDevices = allDevices.filter(
      (d) => (util.types.toInt(d.id, 10) || 0) > lastMaxId,
    );

    context.logger.debug(
      `Found ${newDevices.length} newly enrolled mobile devices`,
    );

    return {
      payload: { ...payload, body: { data: newDevices } },
      polledNoChanges: newDevices.length === 0,
    };
  },
});
