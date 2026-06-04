import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { initiateOrganizationAssignmentChangeExamplePayload } from "../../examplePayloads";
import { initiateOrganizationAssignmentChangeInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const initiateOrganizationAssignmentChange = action({
  display: {
    label: "Initiate Organization Assignment Change",
    description:
      "Initiates an organization assignment change for the specified worker. Returns a new change ID that can be submitted with POST `/organizationAssignmentChanges/{ID}/submit`.",
  },
  perform: async (
    context,
    {
      connection,
      workerId,
      effectiveDate,
      targetWorkerId,
      jobId,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      date: effectiveDate,
      worker: getIdObject(targetWorkerId),
      job: getIdObject(jobId),
      ...(additionalFields || {}),
    };
    const { data } = await client.post(
      `${SERVICES.staffing}/workers/${workerId}/organizationAssignmentChanges`,
      body,
    );
    return {
      data,
    };
  },
  inputs: initiateOrganizationAssignmentChangeInputs,
  examplePayload: initiateOrganizationAssignmentChangeExamplePayload,
});
