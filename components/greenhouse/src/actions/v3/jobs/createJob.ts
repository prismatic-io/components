import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { createJobV3ExamplePayload } from "../../../examplePayloads/v3/jobs";
import { createJobV3Inputs } from "../../../inputs/v3/jobs";
import { generatePayload } from "../../../util";

export const createJobV3 = action({
  display: {
    label: "Create Job",
    description: "Creates a new job from an existing template.",
  },
  inputs: createJobV3Inputs,
  perform: async (
    context,
    {
      connection,
      templateJobId,
      numberOfOpenings,
      jobName,
      jobPostName,
      notes,
      requisitionId,
      departmentId,
      externalDepartmentId,
      officeIds,
      externalOfficeIds,
      openingIds,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);

    const body = generatePayload({
      template_job_id: templateJobId,
      number_of_openings: numberOfOpenings,
      job_name: jobName,
      job_post_name: jobPostName,
      notes,
      requisition_id: requisitionId,
      department_id: departmentId,
      external_department_id: externalDepartmentId,
      office_ids: officeIds,
      external_office_ids: externalOfficeIds,
      opening_ids: openingIds,
      custom_fields: customFields,
    });

    const { data } = await client.post("/jobs", body);
    return { data };
  },
  examplePayload: createJobV3ExamplePayload,
});
