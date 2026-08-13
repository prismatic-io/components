import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  CREATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
  MANAGED_APPS_FILTER,
  UPDATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
} from "../constants";
import { cleanCodeInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";
const createOdataTypeApp = input({
  label: "OData App Type",
  comments:
    "The OData type of the app to create (e.g., #microsoft.graph.officeSuiteApp, #microsoft.graph.win32LobApp). This depends on the platform of the app. [Learn more](https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-create?view=graph-rest-beta)",
  type: "string",
  placeholder: "Enter OData type",
  example: "#microsoft.graph.officeSuiteApp",
  required: true,
  clean: cleanStringInput,
});
const createDisplayName = input({
  label: "Display Name",
  comments:
    "The name for the app. This name will be visible in the Intune apps list and to users in the Company Portal.",
  type: "string",
  placeholder: "Enter app name",
  example: "Office Suite App",
  required: true,
  clean: cleanStringInput,
});
const createDescription = input({
  label: "Description",
  comments:
    "A description of the app that helps users understand what it is and what they can do with it. This description will be visible in Company Portal.",
  type: "string",
  placeholder: "Enter app description",
  example: "This is an Office Suite app.",
  required: true,
  clean: cleanStringInput,
});
const createPublisher = input({
  label: "Publisher",
  comments:
    "The name of the developer or company that distributes the app. This information will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter publisher name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});
const createLargeIconType = input({
  label: "Icon Image Type",
  comments:
    "The MIME type of the app icon image (e.g., image/png, image/jpeg). This field is required if the Icon Image Data is provided.",
  type: "string",
  placeholder: "Enter icon image type",
  example: "image/png",
  required: false,
  clean: cleanStringInput,
});
const createLargeIconValue = input({
  label: "Icon Image Data",
  comments:
    "The base64-encoded image data for the app icon. This field is required if the Icon Image Type is provided.",
  type: "string",
  placeholder: "Enter base64-encoded image data",
  example: "dmFsdWU=",
  required: false,
  clean: cleanStringInput,
});
const createIsFeatured = input({
  label: "Is Featured",
  comments:
    "When true, displays this as a featured app in the Company Portal. Featured apps are prominently placed so users can quickly access them.",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
});
const createPrivacyInformationUrl = input({
  label: "Privacy Information URL",
  comments:
    "A link to the app's privacy policy and terms. This URL will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter privacy information URL",
  example: "https://example.com/privacy",
  required: false,
  clean: cleanStringInput,
});
const createInformationUrl = input({
  label: "Information URL",
  comments:
    "A link to a website or documentation with more information about the app. This URL will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter information URL",
  example: "https://example.com/info",
  required: false,
  clean: cleanStringInput,
});
const createOwner = input({
  label: "Owner",
  comments:
    "The name of the person in the organization who manages licensing or is the point-of-contact for this app. This name will be visible in the admin center.",
  type: "string",
  placeholder: "Enter owner name",
  example: "John Doe",
  required: false,
  clean: cleanStringInput,
});
const createDeveloper = input({
  label: "Developer",
  comments:
    "The name of the company or individual that developed the app. This information will be visible in the admin center.",
  type: "string",
  placeholder: "Enter developer name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});
const createNotes = input({
  label: "Notes",
  comments:
    "Additional notes about the app for documentation purposes. Notes will be visible in the admin center.",
  type: "string",
  placeholder: "Enter notes",
  example: "This app is used by the sales team.",
  required: false,
  clean: cleanStringInput,
});
const createSpecificPlatformProperties = input({
  label: "Specific Platform Properties",
  comments:
    "The specific properties for the app to be created, generic properties like '@odata.type', 'displayName', 'description', etc. are already covered by the other inputs. This input should be a JSON object with the specific properties for the app to be created. Check the Microsoft Graph API documentation for the correct properties for the app type you are creating. Documentation for an Office Suite app can be found [here](https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-create?view=graph-rest-beta).",
  type: "code",
  language: "json",
  example: CREATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
  required: true,
  clean: cleanCodeInput,
});
const createAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments: "Less common app properties.",
  inputs: {
    publisher: createPublisher,
    largeIconType: createLargeIconType,
    largeIconValue: createLargeIconValue,
    privacyInformationUrl: createPrivacyInformationUrl,
    informationUrl: createInformationUrl,
    owner: createOwner,
    developer: createDeveloper,
    notes: createNotes,
  },
});
export const createManagedAppInputs = {
  connection,
  odataTypeApp: createOdataTypeApp,
  displayName: createDisplayName,
  description: createDescription,
  isFeatured: createIsFeatured,
  specificPlatformProperties: createSpecificPlatformProperties,
  additionalFields: createAdditionalFields,
};
const deleteMobileAppId = input({
  label: "Mobile App ID",
  comments: "The ID of the app to delete.",
  placeholder: "Enter mobile app ID",
  example: "e0741df2-bae3-4649-9599-c47026da1234",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const deleteManagedAppInputs = {
  connection,
  mobileAppId: deleteMobileAppId,
};
const getAppId = input({
  label: "App ID",
  comments:
    "The unique identifier of a managed app. You can get this from the 'List Managed Apps' action.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const getManagedAppInputs = {
  connection,
  appId: getAppId,
};
const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $skipToken: odataParams.$skipToken,
  },
});
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: { ...odataParams.$filter, default: MANAGED_APPS_FILTER },
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
  },
});
export const listManagedAppsInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};
const updateMobileAppId = input({
  label: "Mobile App ID",
  comments: "The ID of the app to update.",
  placeholder: "Enter mobile app ID",
  example: "e0741df2-bae3-4649-9599-c47026da1234",
  type: "string",
  required: true,
  dataSource: "selectMobileApp",
  clean: cleanStringInput,
});
const updateOdataTypeApp = input({
  label: "OData App Type",
  comments:
    "The type of app to update. This depends on the platform of the app. Check the Microsoft Graph API documentation for the correct type. Documentation for an Office Suite app can be found [here](https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-update?view=graph-rest-beta).",
  type: "string",
  placeholder: "Enter OData type",
  example: "#microsoft.graph.officeSuiteApp",
  required: true,
  clean: cleanStringInput,
});
const updateDisplayName = input({
  label: "Display Name",
  comments:
    "Update the name for the app. This name will be visible in the Intune apps list and to users in the Company Portal.",
  type: "string",
  placeholder: "Enter app name",
  example: "Office Suite App",
  required: false,
  clean: cleanStringInput,
});
const updateDescription = input({
  label: "Description",
  comments:
    "Update the description to help device users understand what the app is and what they can do in the app. This description will be visible to them in Company Portal.",
  type: "string",
  placeholder: "Enter app description",
  example: "This is an Office Suite app.",
  required: false,
  clean: cleanStringInput,
});
const updatePublisher = input({
  label: "Publisher",
  comments:
    "Update the name of the developer or company that distributes the app. This information will be visible to users in Company Portal.",
  type: "string",
  placeholder: "Enter publisher name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});
const updateLargeIconType = input({
  label: "Icon Image Type",
  comments:
    "Update the type of the Icon image. This field is required if the Icon Image Data is provided.",
  type: "string",
  placeholder: "Enter icon image type",
  example: "image/png",
  required: false,
  clean: cleanStringInput,
});
const updateLargeIconValue = input({
  label: "Icon Image Data",
  comments:
    "Update the base64 encoded image data for the Icon image. This field is required if the Icon Image Type is provided.",
  type: "string",
  placeholder: "Enter base64-encoded image data",
  example: "dmFsdWU=",
  required: false,
  clean: cleanStringInput,
});
const updateIsFeatured = input({
  label: "Is Featured",
  comments:
    "Update whether the app is featured. Featured apps are displayed prominently in the Company Portal.\u200B",
  type: "boolean",
  required: true,
  default: "false",
  clean: util.types.toBool,
});
const updatePrivacyInformationUrl = input({
  label: "Privacy Information URL",
  comments:
    "Update the URL that links to the privacy information for the app. The privacy information URL will be visible to users in Company Portal.\u200B",
  type: "string",
  placeholder: "Enter privacy information URL",
  example: "https://example.com/privacyInformationUrl/",
  required: false,
  clean: cleanStringInput,
});
const updateInformationUrl = input({
  label: "Information URL",
  comments:
    "Update the URL that links to more information about the app. This URL will be visible to users in Company Portal.\u200B",
  type: "string",
  placeholder: "Enter information URL",
  example: "https://example.com/informationUrl/",
  required: false,
  clean: cleanStringInput,
});
const updateOwner = input({
  label: "Owner",
  comments:
    "Update the name of the person or company that owns the app. This information will be visible to people signed into the admin center.\u200B",
  type: "string",
  placeholder: "Enter owner name",
  example: "John Doe",
  required: false,
  clean: cleanStringInput,
});
const updateDeveloper = input({
  label: "Developer",
  comments:
    "Update the developer of the app. This information will be visible to users in Company Portal.\u200B",
  type: "string",
  placeholder: "Enter developer name",
  example: "Microsoft",
  required: false,
  clean: cleanStringInput,
});
const updateNotes = input({
  label: "Notes",
  comments:
    "Update any notes about the app. This information will be visible to people signed into the admin center.\u200B",
  type: "string",
  placeholder: "Enter notes",
  example: "An example note.",
  required: false,
  clean: cleanStringInput,
});
const updateSpecificPlatformProperties = input({
  label: "Specific Platform Properties",
  comments:
    "The specific properties for the app to be updated, generic properties like '@odata.type', 'displayName', 'description', etc. are already covered by the other inputs. This input should be a JSON object with the specific properties for the app to be updated. Check the Microsoft Graph API documentation for the correct properties for the app type you are updating. Documentation for an Office Suite app can be found [here](https://learn.microsoft.com/en-us/graph/api/intune-apps-officesuiteapp-update?view=graph-rest-beta).",
  type: "code",
  language: "json",
  example: UPDATE_OFFICE_SUITE_APP_SPECIFIC_PROPERTIES_EXAMPLE,
  required: false,
  clean: cleanCodeInput,
});
const updateAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments: "Less common app properties.",
  inputs: {
    publisher: updatePublisher,
    largeIconType: updateLargeIconType,
    largeIconValue: updateLargeIconValue,
    privacyInformationUrl: updatePrivacyInformationUrl,
    informationUrl: updateInformationUrl,
    owner: updateOwner,
    developer: updateDeveloper,
    notes: updateNotes,
    specificPlatformProperties: updateSpecificPlatformProperties,
  },
});
export const updateManagedAppInputs = {
  connection,
  mobileAppId: updateMobileAppId,
  odataTypeApp: updateOdataTypeApp,
  isFeatured: updateIsFeatured,
  displayName: updateDisplayName,
  description: updateDescription,
  additionalFields: updateAdditionalFields,
};
