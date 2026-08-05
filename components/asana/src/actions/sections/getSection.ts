import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getSectionExamplePayload } from "../../examplePayloads";
import { getSectionInputs } from "../../inputs";
export const getSection = action({
  display: {
    label: "Get Section",
    description: "Get the information and metadata of a section.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/sections/${params.sectionId}`);
    return { data };
  },
  inputs: getSectionInputs,
  examplePayload: getSectionExamplePayload,
});
