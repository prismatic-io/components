import { input, util } from "@prismatic-io/spectral";

import { mapModel, WEB_SERVICE } from "../util";
import {
  CONVERSION_GOALS_CATEGORIES,
  CONVERSION_SCOPE,
  CONVERSION_STATUS,
  COUNT_TYPE,
} from "../constants";
import { offlineConversionsArrayExample } from "../exampleInputs";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Bing Ads connection to use.",
});

export const customerIdInput = input({
  label: "Customer ID",
  placeholder: "Enter customer ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the customer.",
  clean: (value) => util.types.toString(value),
  dataSource: "selectCustomerId",
});

export const customerNameFilterInput = input({
  label: "Customer Name Filter",
  placeholder: "Enter customer name filter",
  type: "string",
  required: false,
  comments:
    "A partial or full name of the customers to retrieve. The operation includes the customer in the result if the customer's name begins with the specified filter name. This element is optional. To skip filtering by customer name, set this element to an empty string.",
  clean: cleanString,
});

export const topNInput = input({
  label: "Top Number",
  type: "string",
  default: "5",
  comments:
    "A nonzero positive integer that specifies the number of customers to return in the result.",
  required: false,
  example: "5",
  clean: (value) => util.types.toNumber(value),
});

export const onlyParentAccountsInput = input({
  label: "Only Parent Accounts",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether to return only the advertiser accounts that belong to the customer or to also return linked customers and linked advertiser accounts under other customers. To limit the results to advertiser accounts directly under the specified customer, set this element to true, and otherwise leave it empty or set the property to false. The default value is false.",
  required: false,
  clean: (value) => util.types.toBool(value),
});

const typeModel = [
  { label: "AccountLink", value: "AccountLink" },
  { label: "CustomerLink", value: "CustomerLink" },
];

export const typeInput = input({
  label: "Type",
  comments:
    "Determines whether the link is to a client advertiser account or a client customer.",
  type: "string",
  model: typeModel,
  required: true,
  default: "AccountLink",
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (!typeModel.some(({ value }) => strValue === value)) {
      throw new Error(`Invalid type specified: ${value}`);
    }

    return strValue;
  },
});

export const clientEntityIdInput = input({
  label: "Client Entity ID",
  placeholder: "Enter client entity ID",
  type: "string",
  required: false,
  comments:
    "The identifier of the client advertiser account or client customer to manage.",
  clean: cleanString,
});

export const managingCustomerIdInput = input({
  label: "Managing Customer ID",
  placeholder: "Enter managing customer ID",
  type: "string",
  required: true,
  comments:
    "The identifier of the customer who manages or is requesting to manage the client advertiser account.",
  clean: util.types.toString,
});

export const noteInput = input({
  label: "Note",
  placeholder: "Enter note",
  type: "string",
  required: false,
  comments:
    "Optional message from the requestor providing context and details about the client link invitation.",
  clean: cleanString,
});

export const nameInput = input({
  label: "Name",
  placeholder: "Enter name",
  type: "string",
  required: false,
  comments:
    "The friendly name that can be used to reference this client link. The name can contain a maximum of 40 characters.",
  clean: cleanString,
});

export const inviterEmailInput = input({
  label: "Inviter Email",
  placeholder: "Enter inviter email address",
  type: "string",
  required: false,
  comments:
    "The email address of the user who created the client link request.",
  example: "john.doe@example.com",
  clean: cleanString,
});

export const inviterNameInput = input({
  label: "Inviter Name",
  placeholder: "Enter inviter name",
  type: "string",
  required: false,
  comments:
    "The name of the parent customer of the user who created the client link request.",
  clean: cleanString,
});

export const inviterPhoneInput = input({
  label: "Inviter Phone",
  placeholder: "Enter inviter phone number",
  type: "string",
  required: false,
  comments: "The phone number of the user who created the client link request.",
  clean: cleanString,
});

export const isBillToClientInput = input({
  label: "Is Bill To Client",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether the owner of the client advertiser account or the managing customer is responsible for billing payments.",
  required: false,
  clean: (value) => util.types.toBool(value),
});

export const suppressNotificationInput = input({
  label: "Suppress Notification",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether or not to send email notification of the client link invitation to the primary user of the client advertiser account. If set to true the client will not receive an email and otherwise, since the default value is false, the client will receive an email notification.",
  required: false,
  clean: (value) => util.types.toBool(value),
});

const customerLinkPermissionModel = [
  { label: "Administrative", value: "Administrative" },
  { label: "Standard", value: "Standard" },
];

export const customerLinkPermissionInput = input({
  label: "Customer Link Permission",
  type: "string",
  model: customerLinkPermissionModel,
  required: false,
  comments:
    "Determines whether the user's access to the accounts is restricted by customer hierarchy i.e., customer level client linking. This element is only applicable if Type is set to CustomerLink. In that case, the possible values include Administrative and Standard. Otherwise this field should be nil or empty.",
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (
      strValue &&
      !customerLinkPermissionModel.some(({ value }) => strValue === value)
    ) {
      throw new Error(`Invalid customer link permission specified: ${value}`);
    }

    return strValue;
  },
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

export const statusInput = input({
  label: "Status",
  type: "string",
  model: statusModel,
  required: true,
  comments:
    "Determines the life cycle status of the client link, for example whether the client link has been accepted or declined. If set to true the client will not receive an email and otherwise, since the default value is false, the client will receive an email notification.",
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (strValue && !statusModel.some(({ value }) => strValue === value)) {
      throw new Error(`Invalid status specified: ${value}`);
    }

    return strValue;
  },
});

const orderingModel = [
  { label: "Id", value: "Id" },
  { label: "Name", value: "Name" },
  { label: "Number", value: "Number" },
];

export const orderingInput = input({
  label: "Ordering",
  comments:
    "Determines the order of results by the specified property of an account.",
  type: "string",
  model: orderingModel,
  required: false,
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (strValue && !orderingModel.some(({ value }) => strValue === value)) {
      throw new Error(`Invalid order specified: ${value}`);
    }

    return strValue;
  },
});

export const accountIdInput = input({
  label: "Account ID",
  placeholder: "Enter account ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the advertiser account.",
  clean: (value) => util.types.toString(value),
  dataSource: "selectAccountId",
});

const accountLifeCycleStatusModel = [
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Inactive", value: "Inactive" },
  { label: "Pause", value: "Pause" },
  { label: "Pending", value: "Pending" },
  { label: "Suspended", value: "Suspended" },
];

export const accountLifeCycleStatusInput = input({
  label: "Account Life Cycle Status",
  comments:
    "Use this field to search the AccountLifeCycleStatus element of the AdvertiserAccount.",
  type: "string",
  model: accountLifeCycleStatusModel,
  required: false,
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (
      strValue &&
      !accountLifeCycleStatusModel.some(({ value }) => strValue === value)
    ) {
      throw new Error(`Invalid account life cycle status specified: ${value}`);
    }

    return strValue;
  },
});

export const accountNameInput = input({
  label: "Account Name",
  placeholder: "Enter account name",
  type: "string",
  required: false,
  comments:
    "The name to search for in the Name element of the AdvertiserAccount.",
  clean: cleanString,
});

export const accountNumberInput = input({
  label: "Account Number",
  placeholder: "Enter account number",
  type: "string",
  required: false,
  comments:
    "The number to search for in the Number element of the AdvertiserAccount.",
  clean: cleanString,
});

export const userIdInput = input({
  label: "User ID",
  placeholder: "Enter user ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the user to search for.",
  clean: cleanString,
});

export const clientAccountIdInput = input({
  label: "Client Account ID",
  placeholder: "Enter client account ID",
  type: "string",
  required: false,
  comments:
    "Search for advertiser account ClientLink objects by the client advertiser account identifier.",
  clean: cleanString,
});

export const clientCustomerIdInput = input({
  label: "Client Customer ID",
  placeholder: "Enter client customer ID",
  type: "string",
  required: false,
  comments:
    "Search for customer ClientLink objects by the client customer identifier.",
  clean: cleanString,
});

export const directManagingCustomerIdInput = input({
  label: "Direct Managing Customer ID",
  placeholder: "Enter direct managing customer ID",
  type: "string",
  required: false,
  comments:
    "Search for both customer and advertiser account ClientLink objects by the agency's managing customer identifier. If other customers also link to the client customer, the results will not include those client links.",
  clean: cleanString,
});

export const accountIdsInput = input({
  label: "Account ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of identifiers of the accounts that the user can manage. To specify that the user can manage all current and future accounts of the customer to which the user belongs, set to NULL.",
  clean: (values) =>
    Array.isArray(values) && values.length
      ? values.map((field) => util.types.toString(field))
      : [],
});

export const emailInput = input({
  label: "Email",
  placeholder: "Enter email address",
  type: "string",
  required: true,
  comments:
    "The email address corresponding to the user's Microsoft account. The address can contain a maximum of 100 characters.",
  example: "john.doe@example.com",
  clean: util.types.toString,
});

export const firstNameInput = input({
  label: "First Name",
  placeholder: "Enter first name",
  type: "string",
  required: true,
  comments:
    "The first name of the user. The first name is limited to 40 characters.",
  example: "John",
  clean: util.types.toString,
});

export const lastNameInput = input({
  label: "Last Name",
  placeholder: "Enter last name",
  type: "string",
  required: true,
  comments:
    "The last name of the user. The last name is limited to 40 characters.",
  example: "Doe",
  clean: util.types.toString,
});

const lcidModel = [
  { label: "Arabic Algeria", value: "ArabicAlgeria" },
  { label: "Arabic Bahrain", value: "ArabicBahrain" },
  { label: "Arabic Egypt", value: "ArabicEgypt" },
  { label: "Arabic Iraq", value: "ArabicIraq" },
  { label: "Arabic Jordan", value: "ArabicJordan" },
  { label: "Arabic Kuwait", value: "ArabicKuwait" },
  { label: "Arabic Lebanon", value: "ArabicLebanon" },
  { label: "Arabic Libya", value: "ArabicLibya" },
  { label: "Arabic Morocco", value: "ArabicMorocco" },
  { label: "Arabic Oman", value: "ArabicOman" },
  { label: "Arabic Qatar", value: "ArabicQatar" },
  { label: "Arabic SaudiArabia", value: "ArabicSaudiArabia" },
  { label: "Arabic Tunisia", value: "ArabicTunisia" },
  { label: "Arabic UnitedArabEmirates", value: "ArabicUnitedArabEmirates" },
  { label: "Arabic Yemen", value: "ArabicYemen" },
  { label: "Chinese Hong Kong", value: "ChineseHongKong" },
  { label: "Chinese Taiwan", value: "ChineseTaiwan" },
  { label: "Danish Denmark", value: "DanishDenmark" },
  { label: "Dutch Netherlands", value: "DutchNetherlands" },
  { label: "English Australia", value: "EnglishAustralia" },
  { label: "English Canada", value: "EnglishCanada" },
  { label: "English India", value: "EnglishIndia" },
  { label: "English Indonesia", value: "EnglishIndonesia" },
  { label: "English Ireland", value: "EnglishIreland" },
  { label: "English Malaysia", value: "EnglishMalaysia" },
  { label: "English NewZealand", value: "EnglishNewZealand" },
  { label: "English Philippines", value: "EnglishPhilippines" },
  { label: "English Singapore", value: "EnglishSingapore" },
  { label: "English Thailand", value: "EnglishThailand" },
  { label: "English UK", value: "EnglishUK" },
  { label: "English US", value: "EnglishUS" },
  { label: "English Vietnam", value: "EnglishVietnam" },
  { label: "Finnish Finland", value: "FinnishFinland" },
  { label: "French Canada", value: "FrenchCanada" },
  { label: "French France", value: "FrenchFrance" },
  { label: "German Austria", value: "GermanAustria" },
  { label: "German Germany", value: "GermanGermany" },
  { label: "German Switzerland", value: "GermanSwitzerland" },
  { label: "Hebrew Israel", value: "HebrewIsrael" },
  { label: "Italian Italy", value: "ItalianItaly" },
  { label: "Japanese Japan", value: "JapaneseJapan" },
  { label: "Korean Korea", value: "KoreanKorea" },
  { label: "Norwegian Norway", value: "NorwegianNorway" },
  { label: "Portuguese Brazil", value: "PortugueseBrazil" },
  { label: "Russian Russia", value: "RussianRussia" },
  { label: "Spanish Argentina", value: "SpanishArgentina" },
  { label: "Spanish Chile", value: "SpanishChile" },
  { label: "Spanish Colombia", value: "SpanishColombia" },
  { label: "Spanish Mexico", value: "SpanishMexico" },
  { label: "Spanish Peru", value: "SpanishPeru" },
  { label: "Spanish Spain", value: "SpanishSpain" },
  { label: "Spanish Venezuela", value: "SpanishVenezuela" },
  { label: "Swedish Sweden", value: "SwedishSweden" },
];

export const lcidInput = input({
  label: "LCID",
  type: "string",
  required: true,
  default: "EnglishUS",
  comments:
    "The locale to use when sending correspondence to the user by email or postal mail.",
  model: lcidModel,
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (strValue && !lcidModel.some(({ value }) => strValue === value)) {
      throw new Error(`Invalid lcid specified: ${value}`);
    }

    return strValue;
  },
});

const roleIdModel = [
  { label: "Advertiser Campaign Manager", value: "16" },
  { label: "Aggregator", value: "33" },
  { label: "Super Admin", value: "41" },
  { label: "Viewer", value: "100" },
  { label: "Standard User", value: "203" },
];

export const roleIdInput = input({
  label: "Role ID",
  comments: "The role that the user has for each customer or list of accounts.",
  type: "string",
  model: roleIdModel,
  required: true,
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (strValue && !roleIdModel.some(({ value }) => strValue === value)) {
      throw new Error(`Invalid role id specified: ${value}`);
    }

    return strValue;
  },
});

const webServicesModel = [
  {
    label: "Ad Insight API",
    value: WEB_SERVICE.AD_INSIGHT_API,
  },
  {
    label: "Bulk API",
    value: WEB_SERVICE.BULK_API,
  },
  {
    label: "Campaign Management API",
    value: WEB_SERVICE.CAMPAIGN_MANAGEMENT_API,
  },
  {
    label: "Customer Billing API",
    value: WEB_SERVICE.CUSTOMER_BILLING_API,
  },
  {
    label: "Customer Management API",
    value: WEB_SERVICE.CUSTOMER_MANAGEMENT_API,
  },
  {
    label: "Reporting API",
    value: WEB_SERVICE.REPORTING_API,
  },
];

export const webServiceInput = input({
  label: "Web Service API",
  comments:
    "Bing Ads API Version 13 includes the following web service addresses.",
  type: "string",
  model: webServicesModel,
  required: true,
  default: WEB_SERVICE.CUSTOMER_MANAGEMENT_API,
  clean: (value) => {
    const strValue = util.types.toString(value);

    if (
      !webServicesModel.find(({ value }) => value === (strValue as WEB_SERVICE))
    ) {
      throw new Error(`Invalid web service specified: ${value}`);
    }

    return strValue;
  },
});

export const soapActionInput = input({
  label: "SOAP Action",
  placeholder: "Enter SOAP action",
  type: "string",
  required: true,
  comments:
    "After selecting the Microsoft Bing API Web Service, the SOAP Action is the method or endpoint to call.",
  example: "GetCustomer",
  clean: util.types.toString,
});

export const soapBodyRequestInput = input({
  label: "SOAP Body Request",
  placeholder: "Enter SOAP body XML",
  type: "code",
  language: "xml",
  required: true,
  comments:
    "The required SOAP Body element contains the actual SOAP message intended for the ultimate endpoint of the message. Immediate child elements of the SOAP Body element may be namespace-qualified.",
  clean: util.types.toString,
});

export const conversionGoalName = input({
  label: "Conversion Goal Name",
  type: "string",
  required: true,
  comments:
    "The conversion goal name. The maximum length of the name is 100, and the name must be unique among all conversion goals belonging to the same customer.",
  placeholder: "Enter conversion goal name",
  example: "My Conversion Goal",
  clean: util.types.toString,
});

export const conversionGoalCategory = input({
  label: "Conversion Goal Category",
  type: "string",
  required: true,
  comments:
    "The category that best describes the conversion goal. The category must be a valid Microsoft Advertising category.",
  example: "Purchase",
  model: mapModel(CONVERSION_GOALS_CATEGORIES),
  clean: util.types.toString,
});

export const conversionWindowInMinutes = input({
  label: "Conversion Window In Minutes",
  type: "string",
  required: false,
  comments:
    "The length of time in minutes after a click to track conversions. For example, setting this value to 43200 minutes (30 days) means conversions that happen within 30 days after a click are tracked. Past conversions are not affected. The default value is 43200. The minimum value supported is 1 minute, although a shorter conversion window will reduce the number of conversions recorded. The maximum value supported is 129600 minutes (90 days).",
  placeholder: "Enter conversion window in minutes",
  example: "129600",
  clean: cleanString,
});

export const countType = input({
  label: "Count Type",
  type: "string",
  required: false,
  comments:
    "Determines how conversions are recorded within the chosen conversion window.",
  default: "All",
  model: mapModel(COUNT_TYPE),
  clean: util.types.toString,
});

export const excludeFromBidding = input({
  label: "Exclude From Bidding",
  type: "boolean",
  required: false,
  comments:
    "Determines whether or not to exclude data otherwise related to this conversion goal from a subset of performance report columns.",
  clean: util.types.toBool,
});

export const isEnhancedConversionsEnabled = input({
  label: "Is Enhanced Conversions Enabled",
  type: "boolean",
  required: false,
  comments:
    "Determines whether enhanced conversions are enabled for a conversion goal.",
  clean: util.types.toBool,
});

export const conversionScope = input({
  label: "Scope",
  type: "string",
  required: false,
  comments:
    "Determines if the goal applies to all accounts or only the account specified in the required CustomerAccountId header element. When multiple Microsoft Advertising accounts exist, conversions can be tracked across all of them. If associated with one account, conversions will be tracked for that account only.",
  model: mapModel(CONVERSION_SCOPE),
  clean: util.types.toString,
});

export const conversionStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments:
    "Defines the possible user-determined status values of a conversion goal. These are the status values that a user can decide to set, for example a goal can be set to Paused to stop tracking conversions for that goal.",
  model: mapModel(CONVERSION_STATUS),
  clean: util.types.toString,
});

export const isExternallyAttributed = input({
  label: "Is Externally Attributed",
  type: "boolean",
  required: false,
  comments:
    "When true, the offline conversion goal uses a custom attribution model and allows importing fractional credit for each MSCLKID.",
  clean: util.types.toBool,
});

export const offlineConversionsBody = input({
  label: "Offline Conversions Body",
  placeholder: "Enter offline conversions JSON",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON body that contains the offline conversions to apply to the Bing Ads account.",
  example: JSON.stringify(offlineConversionsArrayExample, null, 2),
  clean: util.types.toObject,
});
