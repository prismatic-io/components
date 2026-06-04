import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateRequestResponse as examplePayload } from "../../examplePayloads";
import { updateRequestInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const updateRequest = action({
  display: {
    label: "Update Request",
    description: "Update a request",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      toUpdateRequestId,
      requestSubject,
      requestDescription,
      impactDetails,
      emailIdsToNotify,
      deletePreTemplateTasks,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      request: {
        subject: requestSubject,
        description: requestDescription,
        impact_details: impactDetails,
        email_ids_to_notify: emailIdsToNotify,
        delete_pre_template_tasks: deletePreTemplateTasks,
        ...additionalFields,
      },
    });
    const { data } = await client.put(
      `/requests/${toUpdateRequestId}`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
