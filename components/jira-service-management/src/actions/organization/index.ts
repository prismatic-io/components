import { addOrganizationUsers } from "./addOrganizationUsers";
import { addServiceDeskOrganization } from "./addServiceDeskOrganization";
import { createOrganization } from "./createOrganization";
import { deleteOrganization } from "./deleteOrganization";
import { deleteOrganizationProperty } from "./deleteOrganizationProperty";
import { getOrganization } from "./getOrganization";
import { getOrganizationProperty } from "./getOrganizationProperty";
import { listOrganizationProperties } from "./listOrganizationProperties";
import { listOrganizations } from "./listOrganizations";
import { listOrganizationUsers } from "./listOrganizationUsers";
import { listServiceDeskOrganizations } from "./listServiceDeskOrganizations";
import { removeOrganizationUsers } from "./removeOrganizationUsers";
import { removeServiceDeskOrganization } from "./removeServiceDeskOrganization";
import { setOrganizationProperty } from "./setOrganizationProperty";

export default {
  listOrganizations,
  createOrganization,
  getOrganization,
  deleteOrganization,
  listOrganizationUsers,
  addOrganizationUsers,
  removeOrganizationUsers,
  listServiceDeskOrganizations,
  addServiceDeskOrganization,
  removeServiceDeskOrganization,
  listOrganizationProperties,
  getOrganizationProperty,
  setOrganizationProperty,
  deleteOrganizationProperty,
};
