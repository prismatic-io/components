import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRequestResponse as examplePayload } from "../../examplePayloads";
import { createRequestInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const createRequest = action({
  display: {
    label: "Create Request",
    description: "Create a new request",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
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
    const { data } = await client.post("/requests", payload);
    return { data };
  },
  examplePayload,
});
