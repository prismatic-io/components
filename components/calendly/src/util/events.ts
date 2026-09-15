import type {
  CalendlyEvent,
  PollingChangesObject,
  PollingRecordChange,
} from "../types";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { paginator } from "./common";
export const getEvents = async (
  client: HttpClient,
  inviteeEmail: string | undefined,
  maxStartTime: string | undefined,
  minStartTime: string | undefined,
  organization: string,
  sort: string | undefined,
  status: string | undefined,
  user: string | undefined,
) => {
  const allData = await paginator(client, "/scheduled_events", {
    invitee_email: inviteeEmail,
    max_start_time: maxStartTime,
    min_start_time: minStartTime,
    organization: organization,
    sort: sort,
    status: status,
    user: user,
  });
  return allData;
};
export const classifyEventsByPollDate = (
  events: CalendlyEvent[],
  lastPolledAt: string,
): {
  created: CalendlyEvent[];
  updated: CalendlyEvent[];
} => {
  const lastPolledAtMs = new Date(lastPolledAt).getTime();
  const created: CalendlyEvent[] = [];
  const updated: CalendlyEvent[] = [];
  for (const event of events) {
    const createdMs = event.created_at
      ? new Date(event.created_at).getTime()
      : Number.NaN;
    const updatedMs = event.updated_at
      ? new Date(event.updated_at).getTime()
      : Number.NaN;
    const isNew = !Number.isNaN(createdMs) && createdMs > lastPolledAtMs;
    const isUpdated =
      !isNew && !Number.isNaN(updatedMs) && updatedMs > lastPolledAtMs;
    if (isNew) {
      created.push(event);
    } else if (isUpdated) {
      updated.push(event);
    }
  }
  return { created, updated };
};
export const resolvePollingRecordChanges = (
  data: PollingChangesObject | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.created ?? []).map(
      (record): PollingRecordChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
  ];
};
