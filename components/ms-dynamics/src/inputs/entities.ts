import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { batchActionsDefault, batchActionsExample } from "../examplePayloads";
import {
  connectionInput,
  defaultSelectedRecordTypes,
  entityId,
  entityType,
  expandPropertyNames,
  fetchAll,
  fieldNames,
  filterExpression,
  includeAllCustomRecordTypes,
  includeOnlyTopLevelRecordTypes,
  nextPageId,
  recordTypeFilter,
} from "./common";

const dynamicValuesInput = input({
  label: "Dynamic Values",
  type: "data",
  required: false,
  clean: (value) =>
    value
      ? Object.entries(value).reduce((prev, [k, v]) => {
          prev[k] = v;
          return prev;
        }, {})
      : {},
});

const fieldValues = input({
  label: "Field Value",
  placeholder: "Enter field value",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "The names of the fields and their values to use when creating/updating a record.",
  clean: (rawValue) => util.types.keyValPairListToObject(rawValue as KeyValuePair<unknown>[]),
});

const recordsPerPage = input({
  label: "Records Per Page",
  placeholder: "Enter records per page",
  type: "string",
  required: true,
  default: "100",
  comments: "The number of record to retrieve per page.",
  example: "100",
  clean: util.types.toNumber,
});

const orderByFieldNames = input({
  label: "Order By Field Name",
  placeholder: "Enter order-by field name",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The OData $orderby fields. Suffix with 'desc' for descending order, e.g., 'createdon desc'.",
  clean: (rawValue) => {
    if (!Array.isArray(rawValue) || rawValue.filter(Boolean).length === 0) {
      return undefined;
    }

    return rawValue.map((item) => util.types.toString(item)).filter(Boolean);
  },
});

const lookupField = input({
  label: "Use Logical Name for Lookup",
  required: false,
  default: "true",
  type: "boolean",
  comments:
    "When true, looks up the entity by its logical name (e.g., 'account'). When false, looks up by entity set name.",
  example: "true",
  clean: util.types.toBool,
});

export const includeCustom = input({
  label: "Include Custom Entities",
  type: "boolean",
  default: "true",
  required: false,
  comments: "When true, includes custom entities in the result.",
  clean: util.types.toBool,
});

export const includeOnlyTopLevel = input({
  label: "Top Level Only",
  type: "boolean",
  default: "false",
  required: false,
  comments: "When true, includes only top-level entities and excludes child entities.",
  clean: util.types.toBool,
});

export const includeDetails = input({
  label: "Include Entity Details",
  type: "boolean",
  default: "false",
  required: false,
  comments:
    "When true, includes additional metadata such as description, ownership type, and validity flags.",
  clean: util.types.toBool,
});

const batchActionsInput = input({
  label: "Batch Actions",
  comments:
    "A list of up to 1000 create, update or delete actions to perform. Each action must have a 'collection' and an 'action' (create, update or delete). Create or update actions must also have 'data' and can include a boolean 'returnRepresentation' which determines if the full record should be returned after being created or updated. Update or delete actions must also have an entity key.",
  required: true,
  type: "code",
  language: "json",
  clean: parseBatchedActions,
  example: JSON.stringify(batchActionsExample),
  default: JSON.stringify(batchActionsDefault, null, 2),
});

interface CreateAction {
  collection: string;
  action: "create";
  returnRepresentation?: boolean;
  data: Record<string, unknown>;
}
interface UpdateAction {
  collection: string;
  action: "update";
  key: string;
  returnRepresentation?: boolean;
  data: Record<string, unknown>;
}
interface DeleteAction {
  collection: string;
  action: "delete";
  key: string;
}
type BatchedActions = (CreateAction | UpdateAction | DeleteAction)[];




function parseBatchedActions(actions: unknown): BatchedActions {
  const parsedActions = util.types.toObject(actions);
  if (!Array.isArray(parsedActions)) {
    throw new Error("Batch Actions must be specified as a JSON or JavaScript array.");
  }
  for (const action of parsedActions) {
    if (!action.collection) {
      throw new Error(
        `This action is missing a collection (contacts, leads, etc): ${JSON.stringify(action)}`
      );
    }
    if (!["create", "update", "delete"].includes(action.action)) {
      throw new Error(
        `This action is missing an action type, or the action type doesn't match "create", "update", or "delete": ${JSON.stringify(
          action
        )}`
      );
    }
    if (["update", "delete"].includes(action.action) && !action.key) {
      throw new Error(
        `This update or delete action is missing an entity key: ${JSON.stringify(action)}`
      );
    }
    if (["create", "update"].includes(action.action) && !action.data) {
      throw new Error(`This create or update action is missing data: ${JSON.stringify(action)}`);
    }
  }
  return util.types.toObject(actions) as BatchedActions;
}

export const getEntitiesMetaDataInputs = {
  connection: connectionInput,
  defaultSelectedRecordTypes,
  recordTypeFilter,
  includeAllCustomRecordTypes,
  includeOnlyTopLevelRecordTypes,
};

export const getEntityMetaDataInputs = {
  connection: connectionInput,
  entityType,
  lookupField,
};

export const queryEntitiesInputs = {
  connection: connectionInput,
  entityType,
  fieldNames,
  filterExpression,
  orderByFieldNames,
  expandPropertyNames,
  fetchAll,
  recordsPerPage,
  nextPageId,
};

export const getEntityInputs = {
  entityType,
  entityId,
  fieldNames: { ...fieldNames, required: false },
  expandPropertyNames,
  connection: connectionInput,
};

export const createEntityInputs = {
  entityType,
  dynamicValues: dynamicValuesInput,
  fieldValues,
  connection: connectionInput,
};

export const updateEntityInputs = {
  entityType,
  entityId,
  fieldValues,
  dynamicValues: dynamicValuesInput,
  connection: connectionInput,
};

export const deleteEntityInputs = {
  entityType,
  entityId,
  connection: connectionInput,
};

export const upsertEntityInputs = {
  entityType,
  entityId,
  fieldValues,
  dynamicValues: dynamicValuesInput,
  connection: connectionInput,
};

export const batchEntityActionsInputs = {
  connection: connectionInput,
  actions: batchActionsInput,
};

export const listEntitiesActionInputs = {
  connection: connectionInput,
  includeCustom,
  includeOnlyTopLevel,
  includeDetails,
};
