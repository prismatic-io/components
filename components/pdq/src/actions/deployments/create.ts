import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { SUCCESS_EMPTY_PAYLOAD } from "../../constants";
import { createDeploymentInputs } from "../../inputs/deployment/create";
import { connection } from "../../inputs/general";

export const createDeployment = action({
  display: {
    label: "Create Deployment",
    description: "Deploy a package version to target devices or groups",
  },
  inputs: {
    ...createDeploymentInputs,
    connection,
  },
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
  examplePayload: {
    data: SUCCESS_EMPTY_PAYLOAD,
  },
});
