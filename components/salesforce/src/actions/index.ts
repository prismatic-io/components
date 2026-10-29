import accountActions from "./accounts";
import attachmentActions from "./attachment";
import bulkJobsActions from "./bulkJobs";
import bulkQueryJobsActions from "./bulkQueryJobs";
import compositeActions from "./composite";
import contactsActions from "./contacts";
import customersActions from "./customers";
import describeActions from "./describe";
import fileActions from "./file";
import flowActions from "./flow";
import leadsActions from "./leads";
import metadataActions from "./metadata";
import miscActions from "./misc";
import opportunitiesActions from "./opportunities";
import profilesActions from "./profiles";
import recordsActions from "./records";
import usersActions from "./users";
import workflowsActions from "./workflows";

export default {
  ...accountActions,
  ...attachmentActions,
  ...bulkJobsActions,
  ...bulkQueryJobsActions,
  ...compositeActions,
  ...contactsActions,
  ...customersActions,
  ...describeActions,
  ...fileActions,
  ...flowActions,
  ...leadsActions,
  ...metadataActions,
  ...miscActions,
  ...opportunitiesActions,
  ...profilesActions,
  ...recordsActions,
  ...usersActions,
  ...workflowsActions,
};
