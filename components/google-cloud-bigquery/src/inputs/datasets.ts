import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean } from "../util";
import {
  connectionInput,
  creationTime,
  datasetId,
  defaultCollation,
  defaultRoundingMode,
  description,
  etag,
  filter,
  friendlyName,
  id,
  kind,
  labels,
  lastModifiedTime,
  location,
  maxResults,
  pageToken,
  projectId,
  selfLink,
} from "./common";

export const all = input({
  label: "All",
  type: "boolean",
  clean: util.types.toBool,
  comments: "When true, lists all datasets, including hidden ones.",
  required: false,
});

export const storageBillingModel = input({
  label: "Storage Billing Model",
  type: "string",
  clean: util.types.toString,
  comments: "Optional. Updates storageBillingModel for the dataset.",
  placeholder: "Select storage billing model",
  model: [
    {
      label: "STORAGE BILLING MODEL UNSPECIFIED",
      value: "STORAGE_BILLING_MODEL_UNSPECIFIED",
    },
    {
      label: "LOGICAL",
      value: "LOGICAL",
    },
    {
      label: "PHYSICAL",
      value: "PHYSICAL",
    },
  ],
});

export const maxTimeTravelHours = input({
  label: "Max Time Travel Hours",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. Defines the time travel window in hours. The value can be from 48 to 168 hours (2 to 7 days). The default value is 168 hours if this is not set.",
  example: "168",
  placeholder: "Enter max time travel hours",
  required: false,
});

export const defaultTableExpirationMs = input({
  label: "Default Table Expiration (ms)",
  type: "string",
  clean: util.types.toString,
  comments:
    "Optional. The default lifetime of all tables in the dataset, in milliseconds. The minimum lifetime value is 3600000 milliseconds (one hour). To clear an existing default expiration with a PATCH request, set to 0. Once this property is set, all newly-created tables in the dataset will have an expirationTime property set to the creation time plus the value in this property, and changing the value will only affect new tables, not existing ones. When the expirationTime for a given table is reached, that table will be deleted automatically. If a table's expirationTime is modified or removed before the table expires, or if you provide an explicit expirationTime when creating a table, that value takes precedence over the default expiration time indicated by this property.",
  example: "3600000",
  placeholder: "Enter default table expiration in milliseconds",
  required: false,
});

export const satisfiesPzs = input({
  label: "Satisfies PZS",
  type: "boolean",
  clean: util.types.toBool,
  comments: "Output only. Reserved for future use.",
  required: false,
});

export const isCaseInsensitive = input({
  label: "Is Case Insensitive",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "Optional. TRUE if the dataset and its table names are case-insensitive, otherwise FALSE. By default, this is FALSE, which means the dataset and its table names are case-sensitive. This field does not affect routine references.",
  required: false,
});

export const defaultPartitionExpirationMs = input({
  label: "Default Partition Expiration (ms)",
  type: "string",
  clean: util.types.toString,
  comments:
    "This default partition expiration, expressed in milliseconds. \nWhen new time-partitioned tables are created in a dataset where this property is set, the table will inherit this value, propagated as the TimePartitioning.expirationMs property on the new table. If you set TimePartitioning.expirationMs explicitly when creating a table, the defaultPartitionExpirationMs of the containing dataset is ignored. \nWhen creating a partitioned table, if defaultPartitionExpirationMs is set, the defaultTableExpirationMs value is ignored and the table will not be inherit a table expiration deadline.",
  example: "86400000",
  placeholder: "Enter default partition expiration in milliseconds",
  required: false,
});

export const datasetReference = input({
  label: "Dataset Reference",
  type: "code",
  language: "json",
  comments: "A reference that identifies the dataset.",
  example: JSON.stringify({
    datasetId: "string",
    projectId: "string",
  }),
  clean: jsonInputClean,
  required: true,
});

export const access = input({
  label: "Access",
  type: "code",
  language: "json",
  comments:
    "Optional. An array of objects that define dataset access for one or more entities. You can set this property when inserting or updating a dataset in order to control who is allowed to access the data. If unspecified at dataset creation time, BigQuery adds default dataset access for the following entities: access.specialGroup: projectReaders; access.role: READER; access.specialGroup: projectWriters; access.role: WRITER; access.specialGroup: projectOwners; access.role: OWNER; access.userByEmail: [dataset creator email]; access.role: OWNER.",
  example: JSON.stringify([
    {
      role: "string",
      userByEmail: "string",
      groupByEmail: "string",
      domain: "string",
      specialGroup: "string",
      iamMember: "string",
      view: {
        projectId: "string",
        datasetId: "string",
        tableId: "string",
      },
      routine: {
        projectId: "string",
        datasetId: "string",
        routineId: "string",
      },
      dataset: {
        dataset: {
          datasetId: "string",
          projectId: "string",
        },
        targetTypes: ["TARGET_TYPE_UNSPECIFIED", "VIEWS"],
      },
    },
  ]),
  clean: jsonInputClean,
  required: false,
});

export const defaultEncryptionConfiguration = input({
  label: "Default Encryption Configuration",
  type: "code",
  language: "json",
  comments:
    "The default encryption key for all tables in the dataset. Once this property is set, all newly-created partitioned tables in the dataset will have encryption key set to this value, unless table creation request (or query) overrides the key.",
  example: JSON.stringify({
    kmsKeyName: "string",
  }),
  clean: jsonInputClean,
  required: false,
});

export const linkedDatasetSource = input({
  label: "Linked Dataset Source",
  type: "code",
  language: "json",
  comments:
    "Optional. The source dataset reference when the dataset is of type LINKED. For all other dataset types it is not set. This field cannot be updated once it is set. Any attempt to update this field using Update and Patch API Operations will be ignored.",
  example: JSON.stringify({
    sourceDataset: {
      datasetId: "string",
      projectId: "string",
    },
  }),
  clean: jsonInputClean,
  required: false,
});

export const tags = input({
  label: "Tags",
  type: "code",
  language: "json",
  comments: "Output only. Tags for the Dataset.",
  example: JSON.stringify([
    {
      tagKey: "string",
      tagValue: "string",
    },
  ]),
  clean: jsonInputClean,
  required: false,
});


export const createDatasetInputs = {
  connectionInput,
  projectId,
  datasetReference,
  kind,
  etag,
  id,
  selfLink,
  friendlyName,
  description,
  defaultTableExpirationMs,
  defaultPartitionExpirationMs,
  labels,
  access,
  creationTime,
  lastModifiedTime,
  location,
  defaultEncryptionConfiguration,
  satisfiesPzs,
  isCaseInsensitive,
  defaultCollation,
  defaultRoundingMode,
  maxTimeTravelHours,
  tags,
  storageBillingModel,
};

export const deleteDatasetInputs = {
  connectionInput,
  projectId,
  datasetId,
};

export const getDatasetInputs = {
  connectionInput,
  projectId,
  datasetId,
};

export const listDatasetsInputs = {
  connectionInput,
  projectId,
  pageToken,
  all,
  filter,
  maxResults,
};

export const updateDatasetInputs = {
  connectionInput,
  projectId,
  datasetId,
  datasetReference,
  kind,
  etag,
  id,
  selfLink,
  friendlyName,
  description,
  defaultTableExpirationMs,
  defaultPartitionExpirationMs,
  labels,
  access,
  creationTime,
  lastModifiedTime,
  location,
  defaultEncryptionConfiguration,
  satisfiesPzs,
  isCaseInsensitive,
  defaultCollation,
  defaultRoundingMode,
  maxTimeTravelHours,
  tags,
  storageBillingModel,
};
