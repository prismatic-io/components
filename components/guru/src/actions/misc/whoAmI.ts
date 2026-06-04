import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { whoAmIInputs } from "../../inputs";
import { whoAmIPayload } from "../../examplePayloads";

export const whoAmI = action({
  display: {
    label: "Who Am I",
    description: "Get information about the current authenticated user",
  },
  perform: async (context, { connection }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get("/whoami");

    return { data };
  },
  inputs: whoAmIInputs,
  examplePayload: whoAmIPayload,
});
