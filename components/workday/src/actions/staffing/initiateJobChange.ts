import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { initiateJobChangeExamplePayload } from "../../examplePayloads";
import { initiateJobChangeInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const initiateJobChange = action({
  display: {
    label: "Initiate Job Change",
    description:
      "Initiates a job change request for the specified worker. Returns a new job change ID that can be submitted with POST `/jobChanges/{ID}/submit`.",
  },
  perform: async (
    context,
    {
      connection,
      workerId,
      effectiveDate,
      targetWorkerId,
      jobId,
      reasonId,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      date: effectiveDate,
      worker: getIdObject(targetWorkerId),
      job: getIdObject(jobId),
      reason: getIdObject(reasonId),
      ...(additionalFields || {}),
    };
    const { data } = await client.post(
      `${SERVICES.staffing}/workers/${workerId}/jobChanges`,
      body,
    );
    return {
      data,
    };
  },
  inputs: initiateJobChangeInputs,
  examplePayload: initiateJobChangeExamplePayload,
});
