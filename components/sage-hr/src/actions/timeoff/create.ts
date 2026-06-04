import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTimeOffRequestsExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  date,
  details,
  employee_id,
  hours,
  part_of_day,
  replacement_id,
  time_off_policy_id,
  type,
} from "../../inputs";

export const createTimeOffRequests = action({
  display: {
    label: "Create Time Off Requests",
    description: "Create new time off request",
  },
  inputs: {
    connectionInput,
    type,
    time_off_policy_id,
    employee_id,
    replacement_id,
    date: {
      ...date,
      comments: "format: YYYY-MM-DD; required if type is single",
    },
    date_from: {
      ...date,
      comments: "format: YYYY-MM-DD; required if type is multi",
    },
    date_to: {
      ...date,
      comments: "format: YYYY-MM-DD; required if type is multi",
    },
    part_of_day,
    hours,
    time_from: {
      ...date,
      comments: "format: H:M; required if part_of_day is specific_timespan",
      example: "9:00",
    },
    time_to: {
      ...date,
      comments: "format: H:M; required if part_of_day is specific_timespan",
      example: "15:00",
    },
    details,
  },
  perform: async (
    context,
    {
      connectionInput,
      type,
      time_off_policy_id,
      employee_id,
      replacement_id,
      date,
      date_from,
      date_to,
      part_of_day,
      hours,
      time_from,
      time_to,
      details,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(`/leave-management/requests`, {
      type: type || undefined,
      time_off_policy_id: time_off_policy_id || undefined,
      employee_id: employee_id || undefined,
      replacement_id: replacement_id || undefined,
      date: date || undefined,
      date_from: date_from || undefined,
      date_to: date_to || undefined,
      part_of_day: part_of_day || undefined,
      hours: hours || undefined,
      time_from: time_from || undefined,
      time_to: time_to || undefined,
      details: details || undefined,
    });
    return {
      data,
    };
  },
  examplePayload: createTimeOffRequestsExamplePayload,
});
