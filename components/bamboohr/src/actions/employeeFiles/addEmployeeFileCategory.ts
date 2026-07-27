import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { MESSAGES } from "../../constants";
import { addEmployeeFileCategoryExamplePayload } from "../../examplePayloads";
import { addEmployeeFileCategoryInputs } from "../../inputs";
export const addEmployeeFileCategory = action({
  display: {
    label: "Create Employee File Category",
    description: "Create a new employee file category (folder).",
  },
  inputs: addEmployeeFileCategoryInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const response = await client.post("/v1/employees/files/categories", [
      params.categoryName,
    ]);
    const message =
      response.status === 201
        ? MESSAGES.CATEGORY_CREATED
        : MESSAGES.CATEGORY_NOT_CREATED;
    return { data: { message } };
  },
  examplePayload: addEmployeeFileCategoryExamplePayload,
});
