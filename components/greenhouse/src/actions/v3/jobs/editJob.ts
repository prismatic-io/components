import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { editJobV3ExamplePayload } from "../../../examplePayloads/v3/jobs";
import { editJobV3Inputs } from "../../../inputs/v3/jobs";
import { generatePayload } from "../../../util";

export const editJobV3 = action({
  display: {
    label: "Edit Job",
    description: "Updates an existing job by ID.",
  },
  inputs: editJobV3Inputs,
  perform: async (
    context,
    {
      connection,
      jobId,
      name,
      notes,
      requisitionId,
      teamAndResponsibilities,
      howToSellThisJob,
      anywhere,
      officeIds,
      externalOfficeIds,
      departmentId,
      externalDepartmentId,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);

    const body = generatePayload({
      name,
      notes,
      requisition_id: requisitionId,
      team_and_responsibilities: teamAndResponsibilities,
      how_to_sell_this_job: howToSellThisJob,
      anywhere,
      office_ids: officeIds,
      external_office_ids: externalOfficeIds,
      department_id: departmentId,
      external_department_id: externalDepartmentId,
      custom_fields: customFields,
    });

    const { data } = await client.patch(`/jobs/${jobId}`, body);
    return { data };
  },
  examplePayload: editJobV3ExamplePayload,
});
