import { input, util } from "@prismatic-io/spectral";
import { cleanModelValue, cleanOptionalString } from "../util";
import { connectionInput } from "./common";

const typeModel = [
  { label: "AccountLink", value: "AccountLink" },
  { label: "CustomerLink", value: "CustomerLink" },
];

const typeInput = input({
  label: "Type",
  comments:
    "Determines whether the link is to a client advertiser account or a client customer.",
  type: "string",
  model: typeModel,
  required: true,
  default: "AccountLink",
  clean: cleanModelValue(typeModel, "type"),
});

const clientEntityIdInput = input({
  label: "Client Entity ID",
  placeholder: "Enter client entity ID",
  type: "string",
  required: false,
  comments:
    "The identifier of the client advertiser account or client customer to manage.",
  clean: cleanOptionalString,
});

const managingCustomerIdInput = input({
  label: "Managing Customer ID",
  placeholder: "Enter managing customer ID",
  type: "string",
  required: true,
  comments:
    "The identifier of the customer who manages or is requesting to manage the client advertiser account.",
  clean: util.types.toString,
});

const noteInput = input({
  label: "Note",
  placeholder: "Enter note",
  type: "string",
  required: false,
  comments:
    "Optional message from the requestor providing context and details about the client link invitation.",
  clean: cleanOptionalString,
});

const nameInput = input({
  label: "Name",
  placeholder: "Enter name",
  type: "string",
  required: false,
  comments:
    "The friendly name that can be used to reference this client link. The name can contain a maximum of 40 characters.",
  clean: cleanOptionalString,
});

const inviterEmailInput = input({
  label: "Inviter Email",
  placeholder: "Enter inviter email address",
  type: "string",
  required: false,
  comments:
    "The email address of the user who created the client link request.",
  example: "john.doe@example.com",
  clean: cleanOptionalString,
});

const inviterNameInput = input({
  label: "Inviter Name",
  placeholder: "Enter inviter name",
  type: "string",
  required: false,
  comments:
    "The name of the parent customer of the user who created the client link request.",
  clean: cleanOptionalString,
});

const inviterPhoneInput = input({
  label: "Inviter Phone",
  placeholder: "Enter inviter phone number",
  type: "string",
  required: false,
  comments: "The phone number of the user who created the client link request.",
  clean: cleanOptionalString,
});

const isBillToClientInput = input({
  label: "Is Bill To Client",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether the owner of the client advertiser account or the managing customer is responsible for billing payments.",
  required: false,
  clean: util.types.toBool,
});

const suppressNotificationInput = input({
  label: "Suppress Notification",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether or not to send email notification of the client link invitation to the primary user of the client advertiser account. If set to true the client will not receive an email and otherwise, since the default value is false, the client will receive an email notification.",
  required: false,
  clean: util.types.toBool,
});

const customerLinkPermissionModel = [
  { label: "Administrative", value: "Administrative" },
  { label: "Standard", value: "Standard" },
];

const customerLinkPermissionInput = input({
  label: "Customer Link Permission",
  type: "string",
  model: customerLinkPermissionModel,
  required: false,
  comments:
    "Determines whether the user's access to the accounts is restricted by customer hierarchy i.e., customer level client linking. This element is only applicable if Type is set to CustomerLink. In that case, the possible values include Administrative and Standard. Otherwise this field should be nil or empty.",
  clean: cleanModelValue(
    customerLinkPermissionModel,
    "customer link permission",
    { allowEmpty: true },
  ),
});

const statusModel = [
  { label: "Link Pending", value: "LinkPending" },
  { label: "Link Canceled", value: "LinkCanceled" },
  { label: "Link Expired", value: "LinkExpired" },
  { label: "Link Accepted", value: "LinkAccepted" },
  { label: "Link Declined", value: "LinkDeclined" },
  { label: "Link In Progress", value: "LinkInProgress" },
  { label: "Active", value: "Active" },
  { label: "Link Failed", value: "LinkFailed" },
  { label: "Unlink Requested", value: "UnlinkRequested" },
  { label: "Unlink Pending", value: "UnlinkPending" },
  { label: "Unlink Canceled", value: "UnlinkCanceled" },
  { label: "Unlink In Progress", value: "UnlinkInProgress" },
  { label: "Inactive", value: "Inactive" },
  { label: "Unlink Failed", value: "UnlinkFailed" },
];

const statusInput = input({
  label: "Status",
  type: "string",
  model: statusModel,
  required: true,
  comments:
    "Determines the life cycle status of the client link, for example whether the client link has been accepted or declined. If set to true the client will not receive an email and otherwise, since the default value is false, the client will receive an email notification.",
  clean: cleanModelValue(statusModel, "status", { allowEmpty: true }),
});

const orderingModel = [
  { label: "Id", value: "Id" },
  { label: "Name", value: "Name" },
  { label: "Number", value: "Number" },
];

const orderingInput = input({
  label: "Ordering",
  comments:
    "Determines the order of results by the specified property of an account.",
  type: "string",
  model: orderingModel,
  required: false,
  clean: cleanModelValue(orderingModel, "order", { allowEmpty: true }),
});

const clientAccountIdInput = input({
  label: "Client Account ID",
  placeholder: "Enter client account ID",
  type: "string",
  required: false,
  comments:
    "Search for advertiser account ClientLink objects by the client advertiser account identifier.",
  clean: cleanOptionalString,
});

const clientCustomerIdInput = input({
  label: "Client Customer ID",
  placeholder: "Enter client customer ID",
  type: "string",
  required: false,
  comments:
    "Search for customer ClientLink objects by the client customer identifier.",
  clean: cleanOptionalString,
});

const directManagingCustomerIdInput = input({
  label: "Direct Managing Customer ID",
  placeholder: "Enter direct managing customer ID",
  type: "string",
  required: false,
  comments:
    "Search for both customer and advertiser account ClientLink objects by the agency's managing customer identifier. If other customers also link to the client customer, the results will not include those client links.",
  clean: cleanOptionalString,
});

export const addClientLinksInputs = {
  clientEntityId: clientEntityIdInput,
  connection: connectionInput,
  customerLinkPermission: customerLinkPermissionInput,
  inviterEmail: inviterEmailInput,
  inviterName: inviterNameInput,
  inviterPhone: inviterPhoneInput,
  isBillToClient: isBillToClientInput,
  managingCustomerId: managingCustomerIdInput,
  name: nameInput,
  note: noteInput,
  suppressNotification: suppressNotificationInput,
  type: typeInput,
};

export const searchClientLinksInputs = {
  clientAccountId: clientAccountIdInput,
  clientCustomerId: clientCustomerIdInput,
  connection: connectionInput,
  directManagingCustomerId: directManagingCustomerIdInput,
  managingCustomerId: {
    ...managingCustomerIdInput,
    comments:
      "Search for advertiser account ClientLink objects by the agency's managing customer identifier. If other customers also link to the client advertiser account, the results will include those client links. This predicate value is deprecated in favor of the DirectManagingCustomerId predicate.",
  },
  ordering: orderingInput,
};

export const updateClientLinksInputs = {
  clientEntityId: clientEntityIdInput,
  connection: connectionInput,
  managingCustomerId: managingCustomerIdInput,
  note: noteInput,
  status: statusInput,
};
