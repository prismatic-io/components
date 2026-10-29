import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import {
  EVENT_STEPS_PAGE_SIZE,
  ISO_DATE_LENGTH,
  TRIGGER_BATCH_SIZE,
} from "../constants";
import { newEventStepsPollingTriggerExamplePayload } from "../examplePayloads";
import { newEventStepsPollingInputs } from "../inputs";
import type {
  EventStepChange,
  EventStepChangesObject,
  PollingState,
} from "../types";
import {
  fetchEventStepsSince,
  getEventStepsWindow,
  resolveEventStepChanges,
  selectNewEventSteps,
} from "../util";

export const newEventStepsPollingTrigger = pollingTrigger({
  display: {
    label: "New Event Steps",
    description:
      "Retrieves existing and newly created business process event steps from Workday, emitting new event steps only and never changes to existing ones. Load history once, check for new event steps on a schedule, or both.",
  },
  examplePayload: newEventStepsPollingTriggerExamplePayload,
  inputs: newEventStepsPollingInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): EventStepChange[] =>
      resolveEventStepChanges(payload.body.data as EventStepChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const window = getEventStepsWindow(state, params.lookBackDate, now);

    const client = getClient(params.connection, context.debug.enabled);
    const steps = await fetchEventStepsSince(
      client,
      {
        createdOnOrAfter: window.since.slice(0, ISO_DATE_LENGTH),
        businessProcess: params.businessProcess,
        stepType: params.stepType,
      },
      EVENT_STEPS_PAGE_SIZE,
    );
    const nextWindow = getEventStepsWindow({ lastPolledAt: now }, "", now);
    const { created, seen } = selectNewEventSteps(
      steps,
      window,
      state.seen ?? [],
      nextWindow.since,
      context.logger,
    );
    context.polling.setState({ lastPolledAt: now, seen });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled event steps created on or after ${window.since.slice(0, ISO_DATE_LENGTH)}: ${steps.length} steps, ${created.length} new`,
      );
    }

    return {
      payload: { ...payload, body: { data: { created } } },
      polledNoChanges: created.length === 0,
    };
  },
});
