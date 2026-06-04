import { action } from "@prismatic-io/spectral";
import {
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
  modelBooleanUpdateInput,
} from "../inputs";
import {
  assignParametersToObject,
  checkSuccess,
  convertResultToGenericObject,
  executeAction,
  getObjectFromArray,
} from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractProject } from "@intacct/intacct-sdk/dist/Functions/Projects";
import { updateProjectPayload } from "../examplePayloads/updateProjectPayload";
import {
  CREATE_PROJECT_ADDITIONAL_FIELDS,
  TO_BE_UPDATED_TEXT,
} from "../constants";

export const updateProject = action({
  display: {
    label: "Update Project",
    description: "Updates an existing project.",
  },
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
  inputs: {
    connection,
    projectIdInput: {
      ...projectIdInput,
      required: true,
      comments: "Project ID to update.",
      dataSource: "selectProject",
    },
    projectNameInput: {
      ...projectNameInput,
      required: false,
      comments: `${projectNameInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },
    projectCategoryInput: {
      ...projectCategoryInput,
      required: false,
      comments: `${projectCategoryInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },
    projectDescriptionInput: {
      ...projectDescriptionInput,
      comments: `${projectDescriptionInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },
    parentProjectIdInput: {
      ...parentProjectIdInput,
      comments: `${parentProjectIdInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },

    invoiceWithParentInput: {
      ...modelBooleanUpdateInput,
      label: invoiceWithParentInput.label,
    },
    projectTypeInput: {
      ...projectTypeInput,
      comments: `${projectTypeInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },
    projectStatusInput: {
      ...projectStatusInput,
      comments: `${projectStatusInput.comments} ${TO_BE_UPDATED_TEXT}`,
    },
    statusInput: {
      ...modelBooleanUpdateInput,
      label: statusInput.label,
    },
    additionalFields: {
      ...additionalFields,
      example: JSON.stringify(CREATE_PROJECT_ADDITIONAL_FIELDS, null, 2),
    },
  },
  examplePayload: updateProjectPayload,
});
