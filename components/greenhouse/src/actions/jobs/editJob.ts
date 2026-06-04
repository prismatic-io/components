import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { editJobExamplePayload } from "../../examplePayloads";
import {
  anywhere,
  connectionInput,
  custom_fields,
  department_id,
  external_department_id,
  external_office_ids,
  how_to_sell_this_job,
  job_id,
  job_name,
  notes,
  office_ids,
  on_behalf_of_user_id,
  requisition_id,
  team_and_responsibilities,
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const editJob = action({
  display: {
    label: "Edit Job",
    description: "Updates a job by ID.",
  },
  perform: async (
    context,
    { connection, version, job_id, user_id, ...params },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const jobPayload = generatePayload(params);
    const { data } = await client.patch(`/jobs/${job_id}`, jobPayload, {
      headers: {
        "On-Behalf-Of": user_id,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    job_id: { ...job_id, required: true },
    user_id: on_behalf_of_user_id,
    name: {
      ...job_name,
      comments: "The job's name",
    },
    notes,
    anywhere,
    requisition_id,
    team_and_responsibilities,
    how_to_sell_this_job,
    office_ids: {
      ...office_ids,
      comments:
        "Replace the current offices for this job with new offices. If the organization requires at least one office, trying to set this to blank will return an error.",
    },
    external_office_ids,
    department_id,
    external_department_id,
    custom_fields,
  },
  examplePayload: editJobExamplePayload,
});
