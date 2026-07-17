import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createProblemExamplePayload as examplePayload } from "../../examplePayloads";
import { createProblemInputs as inputs } from "../../inputs/problems";
export const createProblem = action({
  display: {
    label: "Create Problem",
    description: "Creates a new problem in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
      subject,
      email,
      description,
      dueBy,
      priority,
      status,
      impact,
      categorization,
      problemsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const payload = {
      subject,
      email,
      description,
      due_by: dueBy,
      priority,
      status,
      impact,
      category: categorization.category,
      sub_category: categorization.subCategory,
      item_category: categorization.itemCategory,
      ...problemsAdditionalFields,
    };
    const { data } = await client.post(`/problems`, payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
