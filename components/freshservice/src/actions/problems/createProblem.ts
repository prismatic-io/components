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
      category,
      subCategory,
      itemCategory,
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
      category,
      sub_category: subCategory,
      item_category: itemCategory,
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
