import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollNewHireStatusInputs } from "../inputs";
import type {
  InProgressNewHire,
  NewHireStatusChange,
  NewHireStatusEntry,
  NewHireStatusPollingState,
} from "../types";
import { fetchAllPages, getTenantIdentifier } from "../util";







export const pollNewHireStatus = pollingTrigger({
  display: {
    label: "New Hire Status",
    description: "Checks for new and updated new hire onboarding records on a configured schedule.",
  },
  inputs: pollNewHireStatusInputs,
  perform: async (context, payload, { connection }) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as NewHireStatusPollingState;
    const lastStatusMap = pollState.lastStatusMap || {};

    if (context.debug.enabled) {
      context.logger.debug(`Polling state: ${JSON.stringify(pollState)}`);
    }

    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const inProgressHires = await fetchAllPages<InProgressNewHire>(
      client,
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/in-progress`,
    );

    const completedHires = await fetchAllPages<InProgressNewHire>(
      client,
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/completed`,
    );

    const allHires = [...inProgressHires, ...completedHires];
    const changes: NewHireStatusChange[] = [];
    const currentStatusMap: Record<string, NewHireStatusEntry> = {};

    for (const hire of allHires) {
      const hireId = hire.id;
      const currentStatus = hire.onboardingStatus;
      const currentProgress = 0;

      currentStatusMap[hireId] = { status: currentStatus, progress: currentProgress };

      const previous = lastStatusMap[hireId];

      if (!previous) {
        changes.push({
          newHireId: hireId,
          firstName: hire.contactInformation.name.first,
          lastName: hire.contactInformation.name.last,
          changeType: "NewHireAdded",
          currentStatus,
          currentProgress,
          detectedAt: now,
        });
      } else if (previous.status !== currentStatus) {
        changes.push({
          newHireId: hireId,
          firstName: hire.contactInformation.name.first,
          lastName: hire.contactInformation.name.last,
          changeType: "StatusChange",
          previousStatus: previous.status,
          currentStatus,
          previousProgress: previous.progress,
          currentProgress,
          detectedAt: now,
        });
      } else if (previous.progress !== currentProgress) {
        changes.push({
          newHireId: hireId,
          firstName: hire.contactInformation.name.first,
          lastName: hire.contactInformation.name.last,
          changeType: "ProgressUpdate",
          previousStatus: previous.status,
          currentStatus,
          previousProgress: previous.progress,
          currentProgress,
          detectedAt: now,
        });
      }
    }

    context.polling.setState({
      lastStatusMap: currentStatusMap,
      lastPollTime: now,
    });

    return {
      payload: {
        ...payload,
        body: {
          data: changes,
          inProgressCount: inProgressHires.length,
          completedCount: completedHires.length,
        },
      },
      polledNoChanges: changes.length === 0,
    };
  },
});
