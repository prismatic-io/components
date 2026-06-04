import { input, util } from "@prismatic-io/spectral";
import {
  cleanBoolean,
  cleanCode,
  cleanKeyValueList,
  cleanNumber,
  cleanString,
  mapModel,
  mapObjectModel,
} from "./util";
import { BOOLEAN_VALUES, FORM_TYPES } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom fields filter",
  placeholder: "key1=value1",
  clean: cleanKeyValueList,
});

export const id = input({
  label: "Id",
  type: "string",
  example: "123",
  required: true,
  comments: "The unique identifier of the item to retrieve.",
  placeholder: "123",
  clean: util.types.toString,
});

export const accountId = input({
  label: "Account Id",
  type: "string",
  example: "123",
  required: true,
  comments: "The unique identifier of the item to retrieve.",
  placeholder: "ABCD1234",
  clean: util.types.toString,
});

export const formId = input({
  label: "Form Id",
  type: "string",
  comments: "Unique ID for the form.",
  example: "u6nXL7",
  placeholder: "u6nXL7",
  required: true,
  dataSource: "selectForm",
  clean: util.types.toString,
});

export const responseId = input({
  label: "Response Id",
  type: "string",
  comments: "Unique ID for the response.",
  example: "u6nXL7",
  placeholder: "u6nXL7",
  required: true,
  dataSource: "selectResponse",
  clean: util.types.toString,
});

export const fieldId = input({
  label: "Field Id",
  type: "string",
  comments: "Unique ID for the file upload field",
  example: "u6nXL7",
  placeholder: "u6nXL7",
  required: true,
  clean: util.types.toString,
});

export const page = input({
  label: "Page",
  type: "string",
  example: "1",
  required: false,
  comments: "The page of results to retrieve.",
  placeholder: "1",
  clean: cleanNumber,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  example: "50",
  placeholder: "50",
  required: false,
  comments:
    "Number of results to retrieve per page. Default is 10. Maximum is 200.",
  clean: cleanNumber,
});

export const search = input({
  label: "Search",
  type: "string",
  example: "My Search",
  placeholder: "My Search",
  required: false,
  comments: "Returns items that contain the specified string.",
  clean: cleanString,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true, it will fetch all the records ignoring the rest of the parameters.",
  clean: cleanBoolean,
});

export const commonListInputs = {
  fetchAll,
  page,
  pageSize,
  search,
};

export const operations = input({
  label: "Operations",
  type: "code",
  language: "json",
  example: JSON.stringify({}, null, 2),
  required: true,
  comments: "Operations to perform on the data.",
  clean: cleanCode,
});

export const workspaceName = input({
  label: "Workspace Name",
  type: "string",
  example: "My Workspace",
  placeholder: "My Workspace",
  required: true,
  comments: "The name of the workspace.",
  clean: util.types.toString,
});

export const orderBy = input({
  label: "Order By",
  type: "string",
  required: false,
  comments: "Order type.",
  model: [
    {
      value: "asc",
      label: "ASC",
    },
    {
      value: "desc",
      label: "DESC",
    },
  ],
  clean: cleanString,
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  comments: "Field to sort the results by.",
  model: mapModel(["created_at", "last_updated_at"]),
  clean: cleanString,
});

export const jsonData = input({
  label: "JSON Data",
  type: "string",
  example: JSON.stringify({}, null, 2),
  required: false,
  comments: "The JSON data to send.",
  clean: cleanCode,
});

export const title = input({
  label: "Title",
  type: "string",
  example: "My Title",
  placeholder: "My Title",
  required: true,
  comments: "Title to use for the typeform.",
  clean: util.types.toString,
});

export const workspaceUrl = input({
  label: "Workspace URL",
  type: "string",
  example: "https://api.typeform.com/workspaces/Aw33bz",
  placeholder: "https://api.typeform.com/workspaces/Aw33bz",
  required: false,
  comments:
    "URL of the workspace to use for the typeform. If you don't specify a URL for the workspace, Typeform saves the form in the default workspace.",
  clean: cleanString,
});

export const themeUrl = input({
  label: "Theme",
  type: "string",
  example: "https://api.typeform.com/themes/qHWOQ7",
  placeholder: "https://api.typeform.com/themes/qHWOQ7",
  required: false,
  comments:
    "URL of the workspace to use for the typeform. If you don't specify a URL for the workspace, Typeform saves the form in the default workspace.",
  clean: cleanString,
});

export const type = input({
  label: "Type",
  type: "string",
  required: true,
  comments: "Type of the form.",
  model: mapObjectModel(FORM_TYPES),
  clean: util.types.toString,
});

export const tag = input({
  label: "Tag",
  type: "string",
  required: true,
  comments: "Unique name you want to use for the webhook.",
  example: "phoenix",
  clean: util.types.toString,
});

export const enabled = input({
  label: "Enabled",
  type: "string",
  required: false,
  comments:
    "True if you want to send responses to the webhook immediately. Otherwise, false.",
  example: "phoenix",
  default: "true",
  clean: util.types.toBool,
});

export const formResponsePartial = input({
  label: "Form Response Partial",
  type: "string",
  required: false,
  comments:
    "True if you want to send partial responses to the webhook. Otherwise, false.",
  model: mapObjectModel(BOOLEAN_VALUES),
  clean: util.types.toBool,
});

export const formResponse = input({
  label: "Form Response",
  type: "string",
  required: false,
  comments:
    "True if you want to send full responses to the webhook. Otherwise, false.",
  model: mapObjectModel(BOOLEAN_VALUES),
  clean: util.types.toBool,
});

export const secret = input({
  label: "Secret",
  type: "string",
  required: true,
  comments:
    "Will be used to sign the webhook payload with HMAC SHA256, so that you can verify that it came from Typeform.",
  example: "phoenix",
  clean: util.types.toString,
});

export const url = input({
  label: "URL",
  type: "string",
  required: false,
  comments: "Webhook URL.",
  example: "https://test.com",
  clean: cleanString,
});

export const verifySsl = input({
  label: "Verify SSL",
  type: "string",
  required: false,
  comments:
    "True if you want Typeform to verify SSL certificates when delivering payloads.",
  default: "true",
  clean: util.types.toBool,
});

export const includedResponseIds = input({
  label: "Included Response Ids",
  type: "string",
  example: "123",
  required: true,
  comments:
    "Comma-separated list of response_id values of the responses to delete. You can list up to 1000 tokens and choose to do so either in the request URL, or in its body.",
  placeholder: "ABCD1234, ABCD1234",
  clean: util.types.toString,
});

export const filename = input({
  label: "Filename",
  type: "string",
  comments: "Filename for the uploaded file",
  example: "u6nXL7",
  placeholder: "u6nXL7",
  required: true,
  clean: util.types.toString,
});
