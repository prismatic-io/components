import { action, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { rejectApplicationV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { rejectApplicationV3Inputs } from "../../../inputs/v3/applications";
import { generatePayload } from "../../../util";
export const rejectApplicationV3 = action({
  display: {
    label: "Reject Application",
    description: "Rejects an application with a specified rejection reason.",
  },
  perform: async (
    context,
    {
      connection,
      applicationId,
      rejectionReasonId,
      rejectionNotes,
      rejectionEmail: { sendEmailAt, emailTemplateId, emailFromUserId } = {},
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const rejectionEmail =
      sendEmailAt !== undefined ||
      emailTemplateId !== undefined ||
      emailFromUserId !== undefined
        ? generatePayload({
            send_email_at: sendEmailAt,
            email_template_id: emailTemplateId,
            email_from_user_id: emailFromUserId,
          })
        : undefined;
    const body = generatePayload({
      rejection_reason_id: util.types.toNumber(rejectionReasonId),
      notes: rejectionNotes,
      rejection_email: rejectionEmail,
      custom_fields: customFields,
    });
    await client.post(`/applications/${applicationId}/reject`, body);
    return { data: { success: true } };
  },
  inputs: rejectApplicationV3Inputs,
  examplePayload: rejectApplicationV3ExamplePayload,
});
