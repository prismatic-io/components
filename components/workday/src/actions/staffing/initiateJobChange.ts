import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { initiateJobChangeExamplePayload } from "../../examplePayloads";
import { initiateJobChangeInputs } from "../../inputs";
import { getIdObject } from "../../util";
import { initiateJobChangeOutputSchema } from "../../outputSchemas";

export const initiateJobChange = action({
  display: {
    label: "Initiate Job Change",
    description:
      "Initiates a job change request for the specified worker. Returns a new job change ID that can be submitted with POST `/jobChanges/{ID}/submit`.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      workerId,
      effectiveDate,
      jobId,
      reasonId,
      supervisoryOrganizationId,
      locationId,
      extraBody,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      date: effectiveDate,
      worker: getIdObject(workerId),
      job: getIdObject(jobId),
      reason: getIdObject(reasonId),
      supervisoryOrganization: getIdObject(supervisoryOrganizationId),
      location: getIdObject(locationId),
      ...(extraBody || {}),
    };
    const { data } = await client.post(
      `${SERVICES.staffing}/workers/${workerId}/jobChanges`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => initiateJobChangeExamplePayload,
  inputs: initiateJobChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: initiateJobChangeOutputSchema,
  }),
  examplePayload: initiateJobChangeExamplePayload,
});
