import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createJobExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  department_id,
  external_department_id,
  external_office_ids,
  job_name,
  job_post_name,
  number_of_openings,
  office_ids,
  on_behalf_of_user_id,
  opening_ids,
  requisition_id,
  template_job_id,
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const createJob = action({
  display: {
    label: "Create Job",
    description: "Creates a new job.",
  },
  perform: async (context, { connection, version, user_id, ...params }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const jobPayload = generatePayload(params);
    const { data } = await client.post(`/jobs`, jobPayload, {
      headers: {
        "On-Behalf-Of": user_id,
      },
    });
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    user_id: on_behalf_of_user_id,
    template_job_id,
    number_of_openings,
    job_post_name,
    job_name,
    department_id: {
      ...department_id,
      comments:
        "The department of the new job. This should be a department id from the Departments endpoint. If this element is omitted, the new job will receive the department of the template job. If this element is included but blank, it will create the job with no departments. If the organization requires jobs to have a department, this case will return a 422 response.",
    },
    external_department_id,
    office_ids: {
      ...office_ids,
      comments:
        "The offices of the new job. These should be office ids from the Offices endpoint. If this element is omitted, the new job will receive the offices of the template job. If this element is included but blank, it will create the job with no offices. If the organization requires jobs to have an office, this case will return a 422 response.",
    },
    external_office_ids,
    requisition_id,
    opening_ids,
  },
  examplePayload: createJobExamplePayload,
});
