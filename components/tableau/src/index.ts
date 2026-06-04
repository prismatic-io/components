import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  listProjects,
  deleteProjects,
  createProject,
  updateProject,
  getProject,
  searchProjects,
} from "./actions/projects";
import {
  deleteWorkbook,
  listWorkbooks,
  getWorkbook,
  publishWorkbook,
  updateWorkbook,
  searchWorkbooks,
} from "./actions/workbooks";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  getUser,
  searchUsers,
} from "./actions/user";
import {
  listConnections,
  updateConnection,
  searchConnections,
} from "./actions/connections";
import rawRequest from "./actions/rawRequest";
import connections from ".//connections";
import dataSources from "./dataSources";

import webhooks from "./actions/webhooks";
import triggers from "./triggers";

export default component({
  key: "tableau",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/tableau/",
  display: {
    label: "Tableau",
    description: "Manage projects and workbooks in your Tableau site",
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
