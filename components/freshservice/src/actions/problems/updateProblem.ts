import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { updateProblemInputs as inputs } from "../../inputs/problems";
export const updateProblem = action({
  display: {
    label: "Update Problem",
    description: "Updates an existing problem.",
  },
  perform: async (
    context,
    {
      connection,
      problemId,
      categorization,
      additionalFields,
      problemsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const payload = {
      subject: additionalFields.subject,
      email: additionalFields.email,
      description: additionalFields.description,
      due_by: additionalFields.dueBy,
      priority: additionalFields.priority,
      status: additionalFields.status,
      impact: additionalFields.impact,
      category: categorization.category,
      sub_category: categorization.subCategory,
      item_category: categorization.itemCategory,
      ...problemsAdditionalFields,
    };
    const { data } = await client.put(`/problems/${problemId}`, payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
