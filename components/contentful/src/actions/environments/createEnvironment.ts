import { action } from "@prismatic-io/spectral";
import type { EnvironmentProps, Space } from "contentful-management";
import { createClient } from "../../client";
import { createEnvironmentExamplePayload } from "../../examplePayloads";
import { createEnvironmentInputs } from "../../inputs";

export const createEnvironment = action({
  display: {
    label: "Create Environment",
    description: "Creates a new environment.",
  },
  perform: async (context, { connection, spaceId, environmentId, name }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);

    const data: EnvironmentProps = (
      await space.createEnvironmentWithId(environmentId, {
        name,
      })
    ).toPlainObject();

    return {
      data,
    };
  },
  inputs: createEnvironmentInputs,
  examplePayload: { data: createEnvironmentExamplePayload },
});
