import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { provideLeadFeedbackExamplePayload } from "../../examplePayloads";
import { provideLeadFeedbackInputs } from "../../inputs";
import { provideLeadFeedbackOutputSchema } from "../../outputSchemas";
import { buildLeadFeedbackBody, leadResourceName } from "../../util";

export const provideLeadFeedback = action({
  display: {
    label: "Provide Lead Feedback",
    description:
      "Submits satisfaction feedback on a Local Services lead and returns whether Google issued a bonus credit.",
  },
  inputs: provideLeadFeedbackInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: provideLeadFeedbackOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      leadId,
      surveyAnswer,
      managerCustomerId,
      satisfiedReason,
      dissatisfiedReason,
      otherReasonComment,
    },
  ) => {
    const body = buildLeadFeedbackBody({
      surveyAnswer,
      satisfiedReason,
      dissatisfiedReason,
      otherReasonComment,
    });
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/${leadResourceName(customerId, leadId)}:provideLeadFeedback`,
      body,
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    provideLeadFeedbackExamplePayload,
  examplePayload: provideLeadFeedbackExamplePayload,
});
