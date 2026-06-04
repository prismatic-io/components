import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { createDraftAssignment } from "./actions/assignments/createDraftAssignment";
import { getAssignments } from "./actions/assignments/getAssignment";
import listAssignments from "./actions/assignments/listAssignments";
import { listDraftAssignments } from "./actions/assignments/listDraftAssignments";
import { checkInDraftProject } from "./actions/draft/checkInDraft";
import { publishDraftProject } from "./actions/draft/publishDraft";
import { updateDraft } from "./actions/draft/updateDraft";
import { verifyDraft } from "./actions/draft/verifyDraft";
import { checkoutProject } from "./actions/project/checkoutProject";
import { createProject } from "./actions/project/createProject";
import { deleteProject } from "./actions/project/deleteProject";
import getProject from "./actions/project/getProject";
import listProjects from "./actions/project/listProjects";
import { removeProject } from "./actions/project/removeProject";
import { submitProject } from "./actions/project/submitproject";
import { createDraftProjectResources } from "./actions/projectResources/createDraftResource";
import { getProjectResources } from "./actions/projectResources/getProjectResource";
import { listDraftProjectResources } from "./actions/projectResources/listDraftResources";
import { listProjectResources } from "./actions/projectResources/listProjectResources";
import rawRequest from "./actions/rawRequest";
import { createDraftTask } from "./actions/tasks/createDraftTask";
import { deleteDraftTask } from "./actions/tasks/deleteDraftTask";
import { getDraftTask } from "./actions/tasks/getDraftTask";
import { getTask } from "./actions/tasks/getTask";
import { listDraftTasks } from "./actions/tasks/listDraftTasks";
import listTasks from "./actions/tasks/listTasks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-project",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-project/",
  display: {
    label: "Microsoft Project",
    category: "Application Connectors",
    description: "Query reporting data from a Project Web App instance.",
    iconPath: "icon.png",
  },
  triggers,
  actions: {
    listProjects,
    listTasks,
    getProject,
    listAssignments,
    createProject,
    deleteProject,
    checkoutProject,
    listDraftTasks,
    getDraftTask,
    createDraftTask,
    getTask,
    submitProject,
    deleteDraftTask,
    listProjectResources,
    listDraftProjectResources,
    getProjectResources,
    createDraftProjectResources,
    verifyDraft,
    updateDraft,
    publishDraftProject,
    checkInDraftProject,
    removeProject,
    listDraftAssignments,
    getAssignments,
    createDraftAssignment,
    rawRequest,
  },
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
