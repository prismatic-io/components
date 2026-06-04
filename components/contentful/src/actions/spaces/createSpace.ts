import { action } from "@prismatic-io/spectral";
import type { SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { createSpaceExamplePayload } from "../../examplePayloads";
import { createSpaceInputs } from "../../inputs";
export const createSpace = action({
  display: {
    label: "Create Space",
    description: "Creates a new space.",
  },
  perform: async (
    context,
    { connection, organizationId, name, defaultLocale },
  ) => {
    const client = createClient(connection, context);
    const data: SpaceProps = (
      await client.createSpace(
        {
          name,
          defaultLocale,
        },
        organizationId,
      )
    ).toPlainObject();
    return {
      data,
    };
  },
  inputs: createSpaceInputs,
  examplePayload: { data: createSpaceExamplePayload },
});
