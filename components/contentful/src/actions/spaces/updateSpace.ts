import { action } from "@prismatic-io/spectral";
import type { Space, SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { updateSpaceExamplePayload } from "../../examplePayloads";
import { updateSpaceInputs } from "../../inputs";

export const updateSpace = action({
  display: {
    label: "Update Space",
    description: "Updates an existing space.",
  },
  perform: async (context, { connection, spaceId, spaceName }) => {
    const client = createClient(connection, context);
    const space: Space = await client.getSpace(spaceId);

    space.name = spaceName;

    const data: SpaceProps = (await space.update()).toPlainObject();
    return {
      data,
    };
  },
  inputs: updateSpaceInputs,
  examplePayload: { data: updateSpaceExamplePayload },
});
