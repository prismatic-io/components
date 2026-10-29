import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { initiateOrganizationAssignmentChangeExamplePayload } from "../../examplePayloads";
import { initiateOrganizationAssignmentChangeInputs } from "../../inputs";
import { getIdObject } from "../../util";
import { initiateOrganizationAssignmentChangeOutputSchema } from "../../outputSchemas";

export const initiateOrganizationAssignmentChange = action({
  display: {
    label: "Initiate Organization Assignment Change",
    description:
      "Initiates an organization assignment change for the specified worker. Returns a new change ID that can be submitted with POST `/organizationAssignmentChanges/{ID}/submit`.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, effectiveDate, jobId, positionId, extraBody },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      date: effectiveDate,
      worker: getIdObject(workerId),
      job: getIdObject(jobId),
      position: getIdObject(positionId),
      ...(extraBody || {}),
    };
    const { data } = await client.post(
      `${SERVICES.staffing}/workers/${workerId}/organizationAssignmentChanges`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () =>
    initiateOrganizationAssignmentChangeExamplePayload,
  inputs: initiateOrganizationAssignmentChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: initiateOrganizationAssignmentChangeOutputSchema,
  }),
  examplePayload: initiateOrganizationAssignmentChangeExamplePayload,
});
