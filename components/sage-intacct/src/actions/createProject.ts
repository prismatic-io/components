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
import { createProjectPayload } from "../examplePayloads/createProjectPayload";
import {
  CREATE_PROJECT_ADDITIONAL_FIELDS,
  TO_BE_CREATED_TEXT,
} from "../constants";

export const createProject = action({
  display: {
    label: "Create Project",
    description: "Creates a new project.",
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
  inputs: {
    connection,
    projectNameInput: {
      ...projectNameInput,
      comments: `${projectNameInput.comments} ${TO_BE_CREATED_TEXT}`,
    },
    projectCategoryInput: {
      ...projectCategoryInput,
      comments: `${projectCategoryInput.comments} ${TO_BE_CREATED_TEXT}`,
    },
    projectIdInput,
    projectDescriptionInput: {
      ...projectDescriptionInput,
      comments: `${projectDescriptionInput.comments} ${TO_BE_CREATED_TEXT}`,
    },
    parentProjectIdInput: {
      ...parentProjectIdInput,
      comments: `${parentProjectIdInput.comments} ${TO_BE_CREATED_TEXT}`,
    },

    invoiceWithParentInput,
    projectTypeInput: {
      ...projectTypeInput,
      comments: `${projectTypeInput.comments} ${TO_BE_CREATED_TEXT}`,
    },
    projectStatusInput: {
      ...projectStatusInput,
      comments: `${projectStatusInput.comments} ${TO_BE_CREATED_TEXT}`,
    },
    statusInput,
    additionalFields: {
      ...additionalFields,
      example: JSON.stringify(CREATE_PROJECT_ADDITIONAL_FIELDS, null, 2),
    },
  },
  examplePayload: createProjectPayload,
});
