import { input, util } from "@prismatic-io/spectral";
import { toObjectOrEmpty } from "../util";
import {
  accountIds,
  connection,
  fetchAll,
  limit,
  serviceDeskId,
  start,
} from "./common";

const organizationId = input({
  label: "Organization ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the organization. Use the List Organizations action or the Organization data source.",
  placeholder: "Enter organization ID",
  example: "2",
  dataSource: "selectOrganization",
  clean: util.types.toNumber,
});

const organizationName = input({
  label: "Organization Name",
  type: "string",
  required: true,
  comments:
    "A unique display label for the organization, shown to agents and customers in the portal.",
  placeholder: "Enter organization name",
  example: "Acme Corp IT",
  clean: util.types.toString,
});

const propertyKey = input({
  label: "Property Key",
  type: "string",
  required: true,
  comments:
    "The key identifying the custom property to store against the organization.",
  placeholder: "Enter property key",
  example: "tier",
  clean: util.types.toString,
});

const propertyValue = input({
  label: "Property Value",
  type: "code",
  language: "json",
  required: true,
  comments:
    "JSON value to store for the property. Can be any valid JSON (object, array, string, number, or boolean).",
  placeholder: "Enter property value as JSON",
  example: JSON.stringify({ level: "enterprise", region: "us-east" }, null, 2),
  clean: toObjectOrEmpty,
});

export const createOrganizationInputs = {
  connection,
  organizationName,
};

export const deleteOrganizationInputs = {
  connection,
  organizationId,
};

export const getOrganizationInputs = {
  connection,
  organizationId,
};

export const listOrganizationsInputs = {
  connection,
  fetchAll,
  start,
  limit,
};

export const listOrganizationUsersInputs = {
  connection,
  organizationId,
  fetchAll,
  start,
  limit,
};

export const addOrganizationUsersInputs = {
  connection,
  organizationId,
  accountIds,
};

export const removeOrganizationUsersInputs = {
  connection,
  organizationId,
  accountIds,
};



export const listServiceDeskOrganizationsInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  start,
  limit,
};

export const addServiceDeskOrganizationInputs = {
  connection,
  serviceDeskId,
  organizationId,
};

export const removeServiceDeskOrganizationInputs = {
  connection,
  serviceDeskId,
  organizationId,
};



export const listOrganizationPropertiesInputs = {
  connection,
  organizationId,
};

export const getOrganizationPropertyInputs = {
  connection,
  organizationId,
  propertyKey,
};

export const setOrganizationPropertyInputs = {
  connection,
  organizationId,
  propertyKey,
  propertyValue,
};

export const deleteOrganizationPropertyInputs = {
  connection,
  organizationId,
  propertyKey,
};
