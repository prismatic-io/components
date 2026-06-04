import { action } from "@prismatic-io/spectral";
import type { EnvironmentProps } from "contentful-management";
import { createClient } from "../../client";
import { getEnvironmentExamplePayload } from "../../examplePayloads";
import { getEnvironmentInputs } from "../../inputs";
import { getEnvironment as getEnvironmentFn } from "../../util";

export const getEnvironment = action({
  display: {
    label: "Get Environment",
    description: "Retrieves a single environment by ID.",
  },
  perform: async (context, { connection, spaceId, environmentId }) => {
    const client = createClient(connection, context);
    const data: EnvironmentProps = (
      await getEnvironmentFn(client, spaceId, environmentId)
    ).toPlainObject();
    return {
      data,
    };
  },
  inputs: getEnvironmentInputs,
  examplePayload: { data: getEnvironmentExamplePayload },
});
