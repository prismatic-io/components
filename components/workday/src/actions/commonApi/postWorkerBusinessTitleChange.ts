import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postWorkerBusinessTitleChangeExamplePayload } from "../../examplePayloads";
import { postWorkerBusinessTitleChangeInputs } from "../../inputs";
import { postWorkerBusinessTitleChangeOutputSchema } from "../../outputSchemas";
export const postWorkerBusinessTitleChange = action({
  display: {
    label: "Create Worker Business Title Change",
    description:
      "Creates a new business title change for the specified worker.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      workerId,
      proposedBusinessTitle,
      instanceId,
      instanceHref,
      instanceDescriptor,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      proposedBusinessTitle,
      id: instanceId,
      href: instanceHref,
      descriptor: instanceDescriptor,
    };
    const { data } = await client.post(
      `${SERVICES.common}/workers/${workerId}/businessTitleChanges`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postWorkerBusinessTitleChangeExamplePayload,
  inputs: postWorkerBusinessTitleChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postWorkerBusinessTitleChangeOutputSchema,
  }),
  examplePayload: postWorkerBusinessTitleChangeExamplePayload,
});
