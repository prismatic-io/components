import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { addCompanyFileCategoryExamplePayload } from "../../examplePayloads";
import { addCompanyFileCategoryInputs } from "../../inputs";

export const addCompanyFileCategory = action({
  display: {
    label: "Create Company File Category",
    description: "Create a new company file category (folder).",
  },
  inputs: addCompanyFileCategoryInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.post("/v1/files/categories", [
      params.categoryName,
    ]);
    return { data };
  },
  examplePayload: addCompanyFileCategoryExamplePayload,
});
