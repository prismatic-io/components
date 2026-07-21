import {
  listConnections,
  searchConnections,
  updateConnection,
} from "./connections";
import { rawRequest } from "./misc";
import {
  createProject,
  deleteProjects,
  getProject,
  listProjects,
  searchProjects,
  updateProject,
} from "./projects";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  searchUsers,
  updateUser,
} from "./users";
import webhooks from "./webhooks";
import {
  deleteWorkbook,
  getWorkbook,
  listWorkbooks,
  publishWorkbook,
  searchWorkbooks,
  updateWorkbook,
} from "./workbooks";
export default {
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
};
