import { action } from "@prismatic-io/spectral";
import type { SpaceProps } from "contentful-management";
import { createClient } from "../../client";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { getSpaceInputs } from "../../inputs";

export const getSpace = action({
  display: {
    label: "Get Space",
    description: "Retrieves a single space by ID.",
  },
  perform: async (context, { connection, spaceId }) => {
    const client = createClient(connection, context);
    const data: SpaceProps = (await client.getSpace(spaceId)).toPlainObject();
    return {
      data,
    };
  },
  inputs: getSpaceInputs,
  examplePayload: { data: getSpaceExamplePayload },
});
