import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { MESSAGES } from "../../constants";
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
    const response = await client.post("/v1/files/categories", [
      params.categoryName,
    ]);
    const message =
      response.status === 201
        ? MESSAGES.CATEGORY_CREATED
        : MESSAGES.CATEGORY_NOT_CREATED;
    return { data: { message } };
  },
  examplePayload: addCompanyFileCategoryExamplePayload,
});
