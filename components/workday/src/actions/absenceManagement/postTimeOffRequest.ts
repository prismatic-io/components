import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postTimeOffRequestExamplePayload } from "../../examplePayloads";
import { postTimeOffRequestInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const postTimeOffRequest = action({
  display: {
    label: "Post Time Off Request",
    description:
      "Creates a time off request for the specified worker ID and initiates the Request Time Off business process.",
  },
  perform: async (
    context,
    {
      connection,
      workerId,
      actionId,
      overallBusinessProcessId,
      days,
      timeOffComment,
      transactionStatusId,
      timeOffAttachments,
      timeOffForId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      businessProcessParameters: {
        action: getIdObject(actionId),
        overallBusinessProcess: getIdObject(overallBusinessProcessId),
        comment: timeOffComment,
        transactionStatus: getIdObject(transactionStatusId),
        attachments: timeOffAttachments,
        for: getIdObject(timeOffForId),
      },
      days,
    };
    const { data } = await client.post(
      `${SERVICES.absenceManagement}/workers/${workerId}/requestTimeOff`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postTimeOffRequestInputs,
  examplePayload: postTimeOffRequestExamplePayload,
});
