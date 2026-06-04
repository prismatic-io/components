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

    const { data } = await client.put(`/problems/${problemId}`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
