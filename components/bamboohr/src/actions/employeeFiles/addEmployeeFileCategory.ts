import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
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
    const { data } = await client.post("/v1/employees/files/categories", [
      params.categoryName,
    ]);
    return { data };
  },
  examplePayload: addEmployeeFileCategoryExamplePayload,
});
