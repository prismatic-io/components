import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { templatesListPublicExamplePayload } from "../../examplePayloads";
import { templatesListPublicInputs } from "../../inputs";

export const templatesListPublic = action({
  display: {
    label: "List Public Templates",
    description: "Lists publicly available templates.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, includeAll, page, pageSize },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/templates/public`, {
      params: { includeAll, page, pageSize },
    });
    return { data };
  },
  inputs: templatesListPublicInputs,
  examplePayload: templatesListPublicExamplePayload,
});
