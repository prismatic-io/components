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
import { createProjectExamplePayload } from "../../examplePayloads";
import { createProjectInputs } from "../../inputs";
import { createProjectOutputSchema } from "../../outputSchemas";
export const createProject = action({
  display: {
    label: "Create Project",
    description: "Creates a new project.",
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
    const createProject = new Functions.Projects.ProjectCreate();
    assignParametersToObject(createProject, {
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
    Object.assign(createProject, additionalFields);
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(createProject, null, 2));
    }
    const result = await executeAction(connection, createProject);
    const { _data: projectsArray, _status } =
      convertResultToGenericObject(result);
    checkSuccess(_status, "Failed to create project");
    return {
      data: getObjectFromArray(projectsArray),
    };
  },
  inputs: createProjectInputs,
  examplePayload: createProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProjectOutputSchema,
  }),
  examplePerform: async () => ({ data: createProjectExamplePayload.data }),
});
