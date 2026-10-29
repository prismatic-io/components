import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postTimeOffRequestExamplePayload } from "../../examplePayloads";
import { postTimeOffRequestInputs } from "../../inputs";
import { createMultipartBody, getIdObject } from "../../util";
import { postTimeOffRequestOutputSchema } from "../../outputSchemas";

export const postTimeOffRequest = action({
  display: {
    label: "Create Time Off Request",
    description:
      "Creates a time off request for the specified worker ID and initiates the Request Time Off business process.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, days, businessProcessParameters = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      businessProcessParameters: {
        action: getIdObject(businessProcessParameters.actionId),
        overallBusinessProcess: getIdObject(
          businessProcessParameters.overallBusinessProcessId,
        ),
        comment: businessProcessParameters.timeOffComment,
        transactionStatus: getIdObject(
          businessProcessParameters.transactionStatusId,
        ),
        attachments: businessProcessParameters.timeOffAttachments,
        for: getIdObject(businessProcessParameters.timeOffForId),
      },
      days,
    };
    const multipart = createMultipartBody(body);
    const { data } = await client.post(
      `${SERVICES.absenceManagement}/workers/${workerId}/requestTimeOff`,
      multipart.body,
      { headers: multipart.headers },
    );
    return {
      data,
    };
  },
  examplePerform: async () => postTimeOffRequestExamplePayload,
  inputs: postTimeOffRequestInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postTimeOffRequestOutputSchema,
  }),
  examplePayload: postTimeOffRequestExamplePayload,
});
