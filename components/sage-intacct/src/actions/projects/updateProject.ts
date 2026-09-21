import { action, outputSchema } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  checkSuccess,
  convertResultToGenericObject,
  executeAction,
  getObjectFromArray,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractProject } from "@intacct/intacct-sdk/dist/Functions/Projects";
import { updateProjectExamplePayload } from "../../examplePayloads";
import { updateProjectInputs } from "../../inputs";
import { updateProjectOutputSchema } from "../../outputSchemas";
export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Updates an existing project.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      projectIdInput,
      projectNameInput,
      projectCategoryInput,
      projectDescriptionInput,
      parentProjectIdInput,
      invoiceWithParentInput,
      projectTypeInput,
      projectStatusInput,
      statusInput,
      additionalFields,
    },
  ) => {
    const updateProject = new Functions.Projects.ProjectUpdate();
    assignParametersToObject(updateProject, {
      projectId: projectIdInput,
      projectName: projectNameInput,
      projectCategory: projectCategoryInput,
      description: projectDescriptionInput,
      parentProjectId: parentProjectIdInput,
      invoiceWithParent: invoiceWithParentInput,
      projectType: projectTypeInput,
      projectStatus: projectStatusInput,
      active: statusInput,
    } as unknown as AbstractProject);
    Object.assign(updateProject, additionalFields);
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(updateProject, null, 2));
    }
    const result = await executeAction(connection, updateProject);
    const { _data: projectsArray, _status } =
      convertResultToGenericObject(result);
    checkSuccess(_status, "Failed to update project");
    return {
      data: getObjectFromArray(projectsArray),
    };
  },
  inputs: updateProjectInputs,
  examplePayload: updateProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateProjectOutputSchema,
  }),
  examplePerform: async () => ({ data: updateProjectExamplePayload.data }),
});
