import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL_V2 } from "../constants";
import { toOptionalString } from "../utils";
import {
  category,
  connection,
  cursor,
  description,
  fetchAll,
  name,
  orderBy,
} from "./general";






export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  placeholder: "Enter filter expression",
  example: "status eq 'ACTIVE'",
  comments: "Filter expression for the query.",
  clean: toOptionalString,
});


export const expand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "user,department",
  comments:
    "Comma-separated list of related fields to include in the response.",
  clean: toOptionalString,
});


export const id = input({
  label: "ID",
  type: "string",
  required: true,
  placeholder: "Enter ID",
  example: "res_abc123xyz",
  comments: "The unique identifier for the resource.",
  clean: util.types.toString,
});





export const workerId = input({
  label: "Worker ID",
  type: "string",
  required: true,
  placeholder: "Enter worker ID",
  example: "wkr_abc123xyz",
  comments: "The unique identifier for the worker.",
  clean: util.types.toString,
  dataSource: "selectWorker",
});

export const workersFilter = input({
  label: "Filter",
  type: "string",
  required: false,
  placeholder: "Enter filter expression",
  example: "status eq 'ACTIVE'",
  comments:
    "Filter expression. Filterable fields: status, work_email, user_id, created_at, updated_at. Example: status eq 'ACTIVE'.",
  clean: toOptionalString,
});

export const workersExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "user,manager,department",
  comments:
    "Comma-separated fields to expand: user, manager, legal_entity, employment_type, compensation, department, teams, level, custom_fields, business_partners.",
  clean: toOptionalString,
});


export const listWorkersInputs = {
  connection,
  filter: workersFilter,
  expand: workersExpand,
  fetchAll,
  orderBy,
  cursor,
};

export const getWorkerInputs = {
  connection,
  id: workerId,
  expand: workersExpand,
};





export const companiesExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "parent_legal_entity,legal_entities",
  comments:
    "Comma-separated fields to expand: parent_legal_entity, legal_entities.",
  clean: toOptionalString,
});

export const listCompaniesInputs = {
  connection,
  expand: companiesExpand,
  fetchAll,
  orderBy,
  cursor,
};





export const departmentId = input({
  label: "Department ID",
  type: "string",
  required: true,
  placeholder: "Enter department ID",
  example: "dept_abc123xyz",
  comments: "The unique identifier for the department.",
  clean: util.types.toString,
  dataSource: "selectDepartment",
});

export const departmentsExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "parent,department_hierarchy",
  comments: "Comma-separated fields to expand: parent, department_hierarchy.",
  clean: toOptionalString,
});

export const listDepartmentsInputs = {
  connection,
  expand: departmentsExpand,
  fetchAll,
  orderBy,
  cursor,
};

export const getDepartmentInputs = {
  connection,
  id: departmentId,
  expand: departmentsExpand,
};





export const teamId = input({
  label: "Team ID",
  type: "string",
  required: true,
  placeholder: "Enter team ID",
  example: "team_abc123xyz",
  comments: "The unique identifier for the team.",
  clean: util.types.toString,
  dataSource: "selectTeam",
});

export const teamsExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "parent",
  comments: "Comma-separated fields to expand: parent.",
  clean: toOptionalString,
});

export const listTeamsInputs = {
  connection,
  expand: teamsExpand,
  fetchAll,
  orderBy,
  cursor,
};

export const getTeamInputs = {
  connection,
  id: teamId,
  expand: teamsExpand,
};





export const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  placeholder: "Enter user ID",
  example: "usr_abc123xyz",
  comments: "The unique identifier for the user.",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const listUsersInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getUserInputs = {
  connection,
  id: userId,
};





export const listCustomFieldsInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};





export const workLocationId = input({
  label: "Work Location ID",
  type: "string",
  required: true,
  placeholder: "Enter work location ID",
  example: "loc_abc123xyz",
  comments: "The unique identifier for the work location.",
  clean: util.types.toString,
  dataSource: "selectWorkLocation",
});

export const listWorkLocationsInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getWorkLocationInputs = {
  connection,
  id: workLocationId,
};





export const employmentTypeId = input({
  label: "Employment Type ID",
  type: "string",
  required: true,
  placeholder: "Enter employment type ID",
  example: "emp_type_abc123xyz",
  comments: "The unique identifier for the employment type.",
  clean: util.types.toString,
  dataSource: "selectEmploymentType",
});

export const listEmploymentTypesInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getEmploymentTypeInputs = {
  connection,
  id: employmentTypeId,
};





export const listEntitlementsInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};





export const jobFunctionId = input({
  label: "Job Function ID",
  type: "string",
  required: true,
  placeholder: "Enter job function ID",
  example: "job_func_abc123xyz",
  comments: "The unique identifier for the job function.",
  clean: util.types.toString,
  dataSource: "selectJobFunction",
});

export const listJobFunctionsInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getJobFunctionInputs = {
  connection,
  id: jobFunctionId,
};





export const ssoMeExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "company",
  comments: "Comma-separated fields to expand: company.",
  clean: toOptionalString,
});

export const getSsoMeInputs = {
  connection,
  expand: ssoMeExpand,
};





export const supergroupId = input({
  label: "Supergroup ID",
  type: "string",
  required: true,
  placeholder: "Enter supergroup ID",
  example: "sgrp_abc123xyz",
  comments: "The unique identifier for the supergroup.",
  clean: util.types.toString,
  dataSource: "selectSupergroup",
});

export const supergroupsFilter = input({
  label: "Filter",
  type: "string",
  required: false,
  placeholder: "Enter filter expression",
  example: "app_owner_id eq 'abc123'",
  comments:
    "Filterable fields: app_owner_id, group_type. Example: app_owner_id eq 'abc123'.",
  clean: toOptionalString,
});

export const listSupergroupsInputs = {
  connection,
  filter: supergroupsFilter,
  fetchAll,
  orderBy,
  cursor,
};

export const getSupergroupInputs = {
  connection,
  id: supergroupId,
};





export const businessPartnerId = input({
  label: "Business Partner ID",
  type: "string",
  required: true,
  placeholder: "Enter business partner ID",
  example: "bp_abc123xyz",
  comments: "The unique identifier for the business partner.",
  clean: util.types.toString,
});

export const businessPartnersFilter = input({
  label: "Filter",
  type: "string",
  required: false,
  placeholder: "Enter filter expression",
  example: "worker_id eq 'abc123'",
  comments:
    "Filterable fields: worker_id, business_partner_group_id. Example: worker_id eq 'abc123'.",
  clean: toOptionalString,
});

export const businessPartnersExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "business_partner_group,worker,client_group",
  comments:
    "Comma-separated fields to expand: business_partner_group, worker, client_group.",
  clean: toOptionalString,
});

export const businessPartnerGroupId = input({
  label: "Business Partner Group ID",
  type: "string",
  required: false,
  placeholder: "Enter business partner group ID",
  example: "bpg_abc123xyz",
  comments:
    "The unique identifier of the business partner group to associate with.",
  clean: toOptionalString,
});

export const listBusinessPartnersInputs = {
  connection,
  filter: businessPartnersFilter,
  expand: businessPartnersExpand,
  fetchAll,
  orderBy,
  cursor,
};

export const getBusinessPartnerInputs = {
  connection,
  id: businessPartnerId,
  expand: businessPartnersExpand,
};

export const createBusinessPartnerInputs = {
  connection,
  workerId: {
    ...workerId,
    comments: "The ID of the worker to associate with the business partner.",
  },
  businessPartnerGroupId,
};

export const deleteBusinessPartnerInputs = {
  connection,
  id: {
    ...businessPartnerId,
    comments: "Unique identifier for the business partner to delete.",
  },
};





export const businessPartnerGroupIdRequired = input({
  label: "Business Partner Group ID",
  type: "string",
  required: true,
  placeholder: "Enter business partner group ID",
  example: "bpg_abc123xyz",
  comments: "The unique identifier for the business partner group.",
  clean: util.types.toString,
  dataSource: "selectBusinessPartnerGroup",
});

export const businessPartnerGroupsExpand = input({
  label: "Expand",
  type: "string",
  required: false,
  placeholder: "Enter fields to expand",
  example: "default_business_partner",
  comments: "Comma-separated fields to expand: default_business_partner.",
  clean: toOptionalString,
});

export const defaultBusinessPartnerId = input({
  label: "Default Business Partner ID",
  type: "string",
  required: false,
  placeholder: "Enter default business partner ID",
  example: "bp_abc123xyz",
  comments:
    "The unique identifier of the default business partner for this group.",
  clean: toOptionalString,
});

export const listBusinessPartnerGroupsInputs = {
  connection,
  expand: businessPartnerGroupsExpand,
  fetchAll,
  orderBy,
  cursor,
};

export const getBusinessPartnerGroupInputs = {
  connection,
  id: businessPartnerGroupIdRequired,
  expand: businessPartnerGroupsExpand,
};

export const createBusinessPartnerGroupInputs = {
  connection,
  name: { ...name, comments: "The name of the business partner group." },
  defaultBusinessPartnerId,
};

export const deleteBusinessPartnerGroupInputs = {
  connection,
  id: {
    ...businessPartnerGroupIdRequired,
    comments: "Unique identifier for the business partner group to delete.",
  },
};





export const customObjectApiName = input({
  label: "Custom Object API Name",
  type: "string",
  required: true,
  placeholder: "Enter custom object API name",
  example: "CustomProject__c",
  comments: "The API name of the custom object.",
  clean: util.types.toString,
});

export const pluralLabel = input({
  label: "Plural Label",
  type: "string",
  required: false,
  placeholder: "Enter plural label",
  example: "Custom Projects",
  comments: "The plural label for the custom object.",
  clean: toOptionalString,
});

export const ownerRole = input({
  label: "Owner Role",
  type: "string",
  required: false,
  placeholder: "Enter owner role",
  example: "Admin",
  comments: "The owner role for the custom object.",
  clean: toOptionalString,
});

export const listCustomObjectsInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getCustomObjectInputs = {
  connection,
  customObjectApiName,
};

export const createCustomObjectInputs = {
  connection,
  name: { ...name, comments: "The name of the custom object." },
  description: {
    ...description,
    comments: "A description of the custom object.",
  },
  category: { ...category, comments: "The category for the custom object." },
};

export const updateCustomObjectInputs = {
  connection,
  customObjectApiName: {
    ...customObjectApiName,
    comments: "The API name of the custom object to update.",
  },
  name: {
    ...name,
    required: false,
    comments: "The new name for the custom object.",
  },
  description: {
    ...description,
    comments: "The new description for the custom object.",
  },
  category: {
    ...category,
    comments: "The new category for the custom object.",
  },
  pluralLabel,
  ownerRole,
};

export const deleteCustomObjectInputs = {
  connection,
  customObjectApiName: {
    ...customObjectApiName,
    comments: "The API name of the custom object to delete.",
  },
};





export const objectCategoryId = input({
  label: "Object Category ID",
  type: "string",
  required: true,
  placeholder: "Enter object category ID",
  example: "cat_abc123xyz",
  comments: "The unique identifier for the object category.",
  clean: util.types.toString,
  dataSource: "selectObjectCategory",
});

export const listObjectCategoriesInputs = {
  connection,
  fetchAll,
  orderBy,
  cursor,
};

export const getObjectCategoryInputs = {
  connection,
  id: objectCategoryId,
};

export const createObjectCategoryInputs = {
  connection,
  name: {
    ...name,
    placeholder: "Enter category name",
    comments: "The name of the object category.",
  },
  description: {
    ...description,
    comments: "A description of the object category.",
  },
};

export const updateObjectCategoryInputs = {
  connection,
  id: {
    ...objectCategoryId,
    comments: "Unique identifier for the object category to update.",
  },
  name: {
    ...name,
    required: false,
    placeholder: "Enter new name",
    comments: "The new name for the object category.",
  },
  description: {
    ...description,
    placeholder: "Enter new description",
    comments: "The new description for the object category.",
  },
};

export const deleteObjectCategoryInputs = {
  connection,
  id: {
    ...objectCategoryId,
    comments: "Unique identifier for the object category to delete.",
  },
};






const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

export const rawRequestV2Inputs = {
  connection,
  ...httpInputsWithoutDebug,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/workers), The base URL is already included (${BASE_URL_V2}). For example, to connect to ${BASE_URL_V2}/workers, only /workers is entered in this field.`,
    example: "/workers",
  },
};
