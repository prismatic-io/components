import activities from "./activities";
import activityFields from "./activityFields";
import activityTypes from "./activityTypes";
import billing from "./billing";
import callLogs from "./callLogs";
import currencies from "./currencies";
import customFields from "./customFields";
import dealFields from "./dealFields";
import deals from "./deals";
import files from "./files";
import filters from "./filters";
import leadLabels from "./leadLabels";
import leadSources from "./leadSources";
import leads from "./leads";
import mailbox from "./mailbox";
import misc from "./misc";
import noteFields from "./noteFields";
import organizations from "./organizations";
import permissionSets from "./permissionSets";
import personFields from "./personFields";
import persons from "./persons";
import pipelines from "./pipelines";
import productFields from "./productFields";
import products from "./products";
import stages from "./stages";
import subscriptions from "./subscriptions";
import userConnections from "./userConnections";
import userSettings from "./userSettings";
import users from "./users";
import webhooks from "./webhooks";

export default {
  ...activities,
  ...activityFields,
  ...activityTypes,
  ...billing,
  ...callLogs,
  ...currencies,
  ...customFields,
  ...dealFields,
  ...deals,
  ...files,
  ...filters,
  ...leadLabels,
  ...leadSources,
  ...leads,
  ...mailbox,
  ...misc,
  ...noteFields,
  ...organizations,
  ...permissionSets,
  ...personFields,
  ...persons,
  ...pipelines,
  ...productFields,
  ...products,
  ...stages,
  ...subscriptions,
  ...userConnections,
  ...userSettings,
  ...users,
  ...webhooks,
};
