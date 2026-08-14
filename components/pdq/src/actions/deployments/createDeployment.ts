import { action, outputSchema } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { SUCCESS_EMPTY_PAYLOAD } from "../../constants";
import { createDeploymentExamplePayload } from "../../examplePayloads/deployments";
import { createDeploymentInputs } from "../../inputs";
import { createDeploymentOutputSchema } from "../../outputSchemas";
export const createDeployment = action({
  display: {
    label: "Create Deployment",
    description: "Deploy a package version to target devices or groups.",
  },
  inputs: createDeploymentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createDeploymentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, packageInput, targets }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const body = {
      package: packageInput,
      targets,
    };
    await client.post(`/deployments`, body);
    return {
      data: SUCCESS_EMPTY_PAYLOAD,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: SUCCESS_EMPTY_PAYLOAD,
  }),
  examplePayload: createDeploymentExamplePayload,
});
