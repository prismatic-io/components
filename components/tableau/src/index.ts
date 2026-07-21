import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  listConnections,
  searchConnections,
  updateConnection,
} from "./actions/connections";
import { rawRequest } from "./actions/misc";
import {
  createProject,
  deleteProjects,
  getProject,
  listProjects,
  searchProjects,
  updateProject,
} from "./actions/projects";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  searchUsers,
  updateUser,
} from "./actions/users";
import webhooks from "./actions/webhooks";
import {
  deleteWorkbook,
  getWorkbook,
  listWorkbooks,
  publishWorkbook,
  searchWorkbooks,
  updateWorkbook,
} from "./actions/workbooks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
export default component({
  key: "tableau",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/tableau/",
  display: {
    label: "Tableau",
    description: "Manage projects and workbooks in your Tableau site.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions: {
    searchConnections,
    searchWorkbooks,
    searchUsers,
    searchProjects,
    listProjects,
    createProject,
    updateProject,
    deleteProjects,
    getProject,
    listWorkbooks,
    publishWorkbook,
    updateWorkbook,
    deleteWorkbook,
    getWorkbook,
    createUser,
    deleteUser,
    getUser,
    listUsers,
    updateUser,
    listConnections,
    updateConnection,
    rawRequest,
    ...webhooks,
  },
  connections,
  dataSources,
  hooks: { error: handleErrors },
  triggers,
});
