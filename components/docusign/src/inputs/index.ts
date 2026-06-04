import { input, util } from "@prismatic-io/spectral";
import { jsonCheck, getDocumentIds, getUserIds } from "../utils";
import { WEBHOOK_EVENTS } from "../constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "The external account number (int) or account ID GUID.",
  example: "23233123",
  placeholder: "Enter Account ID",
  clean: util.types.toString,
});

export const accountName = input({
  label: "Account Name",
  type: "string",
  required: false,
  comments: "The account name for the new account.",
  example: "My Account Name",
  placeholder: "Enter account name",
  clean: util.types.toString,
});
export const distributorCode = input({
  label: "Distributor Code",
  type: "string",
  required: false,
  comments: "The Distributor Code that you received from DocuSign.",
  example: "DEVCENTER_DEMO_APRIL2013",
  placeholder: "Enter distributor code",
  clean: util.types.toString,
});
export const distributorPassword = input({
  label: "Distributor Password",
  type: "string",
  required: false,
  comments: "The password for the Distributor Code.",
  placeholder: "Enter distributor password",
  clean: util.types.toString,
});
export const email = input({
  label: "Email",
  type: "string",
  required: false,
  comments: "The user's email address.",
  example: "john.doe@example.com",
  placeholder: "Enter email address",
  clean: util.types.toString,
});
export const firstName = input({
  label: "First Name",
  type: "string",
  comments: "The user's first name. Maximum Length: 50 characters.",
  example: "John",
  placeholder: "Enter first name",
  required: false,
  clean: util.types.toString,
});
export const middleName = input({
  label: "Middle Name",
  type: "string",
  comments: "The user's middle name. Maximum Length: 50 characters.",
  example: "Jacob",
  placeholder: "Enter middle name",
  required: false,
  clean: util.types.toString,
});
export const lastName = input({
  label: "Last Name",
  type: "string",
  comments: "The user's last name. Maximum Length: 50 characters.",
  example: "Doe",
  placeholder: "Enter last name",
  required: false,
  clean: util.types.toString,
});
export const suffixName = input({
  label: "Suffix Name",
  type: "string",
  comments: "The suffix for the user's name. Maximum Length: 50 characters.",
  example: "Jr.",
  placeholder: "Enter suffix",
  required: false,
  clean: util.types.toString,
});
export const userName = input({
  label: "User Name",
  type: "string",
  comments: "The name of the user.",
  example: "John Doe",
  placeholder: "Enter user name",
  required: false,
  clean: util.types.toString,
});
export const jobTitle = input({
  label: "Job Title",
  type: "string",
  comments: "The user's job title.",
  example: "Software Engineer",
  placeholder: "Enter job title",
  required: false,
  clean: util.types.toString,
});
export const company = input({
  label: "Company",
  type: "string",
  comments: "The name of the user's company.",
  example: "Acme Corporation",
  placeholder: "Enter company name",
  required: false,
  clean: util.types.toString,
});
export const address1 = input({
  label: "Address 1",
  type: "string",
  comments: "The first line of the address. Maximum length: 100 characters.",
  example: "123 Main St",
  placeholder: "Enter address line 1",
  required: false,
  clean: util.types.toString,
});
export const address2 = input({
  label: "Address 2",
  type: "string",
  comments: "The second line of the address. Maximum length: 100 characters.",
  example: "Suite 100",
  placeholder: "Enter address line 2",
  required: false,
  clean: util.types.toString,
});
export const city = input({
  label: "City",
  type: "string",
  comments:
    "The city associated with the address. Maximum length: 40 characters.",
  example: "San Francisco",
  placeholder: "Enter city",
  required: false,
  clean: util.types.toString,
});
export const state = input({
  label: "State",
  type: "string",
  comments:
    "The state or province associated with the address. Maximum length: 40 characters.",
  example: "California",
  placeholder: "Enter state or province",
  required: false,
  clean: util.types.toString,
});
export const postalCode = input({
  label: "Postal Code",
  type: "string",
  comments:
    "The postal code associated with the address. Maximum length: 20 characters.",
  example: "94105",
  placeholder: "Enter postal code",
  required: false,
  clean: util.types.toString,
});
export const country = input({
  label: "Country",
  type: "string",
  comments:
    "The country associated with the address. Maximum length: 50 characters.",
  example: "United States",
  placeholder: "Enter country",
  required: false,
  clean: util.types.toString,
});
export const phone = input({
  label: "Phone",
  type: "string",
  comments: "The phone number associated with the account.",
  example: "+1-555-123-4567",
  placeholder: "Enter phone number",
  required: false,
  clean: util.types.toString,
});
export const fax = input({
  label: "Fax",
  type: "string",
  comments: "The fax number associated with the account.",
  example: "+1-555-123-4567",
  placeholder: "Enter fax number",
  required: false,
  clean: util.types.toString,
});
export const planId = input({
  label: "Plan ID",
  type: "string",
  required: false,
  comments: "DocuSign's ID for the account plan.",
  placeholder: "Enter Plan ID",
  clean: util.types.toString,
});
export const includedSeats = input({
  label: "Included Seats",
  type: "string",
  required: false,
  comments: "The number of seats (users) included in the plan.",
  example: "10",
  placeholder: "Enter number of seats",
  clean: util.types.toString,
});
export const referralCode = input({
  label: "Referral Code",
  type: "string",
  required: false,
  comments: "The referral code associated with the account.",
  placeholder: "Enter referral code",
  clean: util.types.toString,
});
export const referrerName = input({
  label: "Referrer Name",
  type: "string",
  comments: "The name of the referrer.",
  placeholder: "Enter referrer name",
  required: false,
  clean: util.types.toString,
});
export const jsonInput = input({
  label: "JSON Input",
  type: "code",
  language: "json",
  comments: "A JSON object containing the request body.",
  required: false,
  clean: jsonCheck,
});
export const signatureId = input({
  label: "Signature ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the signature.",
  example: "f1d2e9f6-7b8a-4c3d-9e2f-1a0b3c4d5e6f",
  placeholder: "Enter Signature ID",
  clean: util.types.toString,
});
export const imageType = input({
  label: "Image Type",
  type: "string",
  required: true,
  comments: "Specifies the type of image.",
  placeholder: "Select image type",
  model: [
    { label: "stamp_image", value: "stamp_image" },
    { label: "signature_image", value: "signature_image" },
    { label: "initials_image", value: "initials_image" },
  ],
  clean: util.types.toString,
});
export const dateAreaHeight = input({
  label: "Date Area Height",
  type: "string",
  comments: "The height of the rectangle.",
  example: "50",
  placeholder: "Enter height",
  required: false,
  clean: util.types.toString,
});
export const dateAreaWidth = input({
  label: "Date Area Width",
  type: "string",
  comments: "The width of the rectangle.",
  example: "100",
  placeholder: "Enter width",
  required: false,
  clean: util.types.toString,
});
export const dateAreaX = input({
  label: "Date Area X",
  type: "string",
  comments: "The X axis position of the top-left corner.",
  example: "0",
  placeholder: "Enter X position",
  required: false,
  clean: util.types.toString,
});
export const dateAreaY = input({
  label: "Date Area Y",
  type: "string",
  comments: "The Y axis position of the top-left corner.",
  example: "0",
  placeholder: "Enter Y position",
  required: false,
  clean: util.types.toString,
});
export const disallowUserResizeStamp = input({
  label: "Disallow User Resize Stamp",
  type: "boolean",
  comments: "When true, prevents the user from resizing the stamp.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const externalID = input({
  label: "External ID",
  type: "string",
  comments:
    "Optionally specify an external identifier for the user's signature.",
  placeholder: "Enter External ID",
  required: false,
  clean: util.types.toString,
});
export const isDefault = input({
  label: "Is Default",
  type: "boolean",
  comments:
    "When true, specifies that the signature is the default signature for the user.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
export const nrdsId = input({
  label: "NRDS ID",
  type: "string",
  comments:
    "The National Association of Realtors (NAR) membership ID for a user who is a realtor.",
  example: "123456789",
  placeholder: "Enter NRDS ID",
  required: false,
  clean: util.types.toString,
});
export const nrdsLastName = input({
  label: "NRDS Last Name",
  type: "string",
  comments: "The last name of the user who is a realtor.",
  example: "Doe",
  placeholder: "Enter last name",
  required: false,
  clean: util.types.toString,
});
export const phoneticName = input({
  label: "Phonetic Name",
  type: "string",
  comments: "The phonetic spelling of the signatureName.",
  placeholder: "Enter phonetic name",
  required: false,
  clean: util.types.toString,
});
export const signatureFont = input({
  label: "Signature Font",
  type: "string",
  comments:
    "The font type to use for the signature if the signature is not drawn.",
  placeholder: "Select signature font",
  required: false,
  model: [
    { label: "1_DocuSign", value: "1_DocuSign" },
    { label: "2_DocuSign", value: "2_DocuSign" },
    { label: "3_DocuSign", value: "3_DocuSign" },
    { label: "4_DocuSign", value: "4_DocuSign" },
    { label: "5_DocuSign", value: "5_DocuSign" },
    { label: "6_DocuSign", value: "6_DocuSign" },
    { label: "7_DocuSign", value: "7_DocuSign" },
    { label: "8_DocuSign", value: "8_DocuSign" },
    { label: "Mistral", value: "Mistral" },
    { label: "Rage Italic", value: "Rage Italic" },
  ],
  clean: util.types.toString,
});
export const signatureGroups = input({
  label: "Signature Groups",
  type: "code",
  language: "json",
  comments: "A JSON array of signature groups.",
  default: JSON.stringify([{ groupId: "12345", rights: "editable" }], null, 2),
  required: false,
  clean: jsonCheck,
});
export const signatureInitials = input({
  label: "Signature Initials",
  type: "string",
  comments: "Specifies the user's signature in initials format.",
  example: "JD",
  placeholder: "Enter initials",
  required: false,
  clean: util.types.toString,
});
export const signatureName = input({
  label: "Signature Name",
  type: "string",
  comments: "Specifies the user's signature name.",
  example: "John Doe",
  placeholder: "Enter signature name",
  required: false,
  clean: util.types.toString,
});
export const signatureType = input({
  label: "Signature Type",
  type: "string",
  comments:
    "The type of signature. Check this link for more information: https://support.docusign.com/s/document-item?language=en_US&bundleId=xcm1643837555908&topicId=url1578456563691.html",
  example: "Electronic Signature",
  placeholder: "Enter signature type",
  required: false,
  clean: util.types.toString,
});
export const signatureUsers = input({
  label: "Signature Users",
  type: "code",
  comments: "JSON array of users associated with the signature.",
  language: "json",
  default: JSON.stringify(
    [{ isDefault: "false", userId: "12345", rights: "editable" }],
    null,
    2,
  ),
  required: false,
  clean: jsonCheck,
});
export const stampFormat = input({
  label: "Stamp Format",
  type: "string",
  required: false,
  comments:
    "NameHanko refers to the stamp that displays only the name of the signer. On the other hand, NameDateHanko refers to the stamp that displays both the name and date.",
  placeholder: "Select stamp format",
  model: [
    { label: "NameHanko", value: "NameHanko" },
    { label: "NameDateHanko", value: "NameDateHanko" },
  ],
  clean: util.types.toString,
});
export const stampSizeMM = input({
  label: "Stamp Size MM",
  type: "string",
  comments: "The size of the stamp in millimeters.",
  example: "10",
  placeholder: "Enter stamp size in mm",
  required: false,
  clean: util.types.toString,
});
export const bulkSendListId = input({
  label: "Bulk Send List ID",
  type: "string",
  comments:
    "The GUID of the bulk send list. This property is created after you post a new bulk send list.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Bulk Send List ID",
  required: true,
  clean: util.types.toString,
});
export const bulkSendBatchId = input({
  label: "Bulk Send Batch ID",
  type: "string",
  comments: "The batch ID.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Bulk Send Batch ID",
  required: true,
  clean: util.types.toString,
});
export const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  comments: "The ID of the template.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Template ID",
  clean: util.types.toString,
});
export const count = input({
  label: "Count",
  type: "string",
  required: false,
  comments: "The maximum number of results to return.",
  example: "10",
  placeholder: "Enter count",
  clean: util.types.toString,
});
export const include = input({
  label: "Include",
  type: "string",
  required: false,
  comments:
    "A comma-separated list of folder types to include in the response. Valid values are: envelope_folders, template_folders and shared_template_folders.",
  example: "envelope_folders",
  placeholder: "Enter folder types",
  clean: util.types.toString,
});
export const includeItems = input({
  label: "Include Items",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, folder items are included in the response.",
  clean: util.types.toBool,
});
export const startPosition = input({
  label: "Start Position",
  type: "string",
  required: false,
  comments:
    "The zero-based index of the result from which to start returning results.",
  example: "0",
  placeholder: "Enter start position",
  clean: util.types.toString,
});
export const subFolderDepth = input({
  label: "Sub Folder Depth",
  type: "string",
  required: false,
  comments:
    "If missing or any value other than -1, the returned list contains only the top-level folders. A value of -1 returns the complete folder hierarchy.",
  example: "1",
  placeholder: "Enter subfolder depth",
  clean: util.types.toString,
});
export const userFilter = input({
  label: "User Filter",
  type: "string",
  required: false,
  comments:
    "Narrows down the resulting folder list by the following values: all, owned_by_me and shared_with_me.",
  example: "all",
  placeholder: "Enter user filter",
  clean: util.types.toString,
});
export const folderId = input({
  label: "Folder ID",
  type: "string",
  required: true,
  comments: "The ID of the folder.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Folder ID",
  clean: util.types.toString,
});
export const envelopeId = input({
  label: "Envelope ID",
  type: "string",
  required: true,
  comments: "The envelope's GUID.",
  example: "d6f6a764-1021-43df-b8db-06c5477dd28a",
  placeholder: "Enter Envelope ID",
  clean: util.types.toString,
});
export const documentsByUserid = input({
  label: "Documents By User ID",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows recipients to get documents by their user ID.",
  clean: util.types.toBool,
});
export const includeMetadata = input({
  label: "Include Metadata",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the response includes metadata indicating which properties the sender can edit.",
  clean: util.types.toBool,
});
export const includeTabs = input({
  label: "Include Tabs",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, information about the tabs, including prefill tabs, associated with the documents is included in the response.",
  clean: util.types.toBool,
});
export const recipientId = input({
  label: "Recipient ID",
  type: "string",
  required: false,
  comments:
    "Allows the sender to retrieve the documents as one of the recipients that they control. The documents_by_userid parameter must be set to false for this to work.",
  example: "3842784d-ef49-43e0-8c9c-714812a90ddd",
  placeholder: "Enter Recipient ID",
  clean: util.types.toString,
});
export const sharedUserId = input({
  label: "Shared User ID",
  type: "string",
  required: false,
  comments:
    "The ID of a shared user that you want to impersonate in order to retrieve their view of the list of documents.",
  example: "3842784d-ef49-43e0-8c9c-714812a90ddd",
  placeholder: "Enter Shared User ID",
  clean: util.types.toString,
});
export const documentId = input({
  label: "Document ID",
  type: "string",
  required: true,
  comments: "The ID of the document to retrieve.",
  example: "1",
  placeholder: "Enter Document ID",
  clean: util.types.toString,
});
export const certificate = input({
  label: "Certificate",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the certificate of completion is included in the combined PDF.",
  clean: util.types.toBool,
});
export const encrypt = input({
  label: "Encrypt",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the PDF bytes returned in the response are encrypted for all key managers configured on your DocuSign account.",
  clean: util.types.toBool,
});
export const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments:
    "Specifies the language for the Certificate of Completion in the response. The supported languages are: Chinese Simplified (zh_CN), Chinese Traditional (zh_TW), Dutch (nl), English US (en), French (fr), German (de), Italian (it), Japanese (ja), Korean (ko), Portuguese (pt), Portuguese (Brazil) (pt_BR), Russian (ru), Spanish (es).",
  example: "en",
  placeholder: "Enter language code",
  clean: util.types.toString,
});
export const showChanges = input({
  label: "Show Changes",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, any changed fields in the returned PDF are highlighted in yellow and optional signatures or initials are outlined in red. The account must have the Highlight Data Changes feature enabled.",
  clean: util.types.toBool,
});
export const watermark = input({
  label: "Watermark",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, and the account has the watermark feature enabled, and the envelope is not complete, the watermark for the account is added to the PDF documents. This option can remove the watermark.",
  clean: util.types.toBool,
});
export const documentName = input({
  label: "Document Name",
  type: "string",
  required: true,
  default: "newDocument",
  example: "Contract.pdf",
  placeholder: "Enter document name",
  comments: "The name of the document.",
  clean: util.types.toString,
});
export const pdfBuffer = input({
  label: "PDF data",
  placeholder: "PDF data",
  type: "data",
  required: true,
  comments: "This must refer to a buffer containing the raw bytes of a PDF.",
});
export const documentIds = input({
  label: "Document IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  example: '["1", "2", "3"]',
  placeholder: "Enter document IDs",
  comments: "A list of document IDs to delete.",
  clean: getDocumentIds,
});
export const userIds = input({
  label: "User IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  example: '["a1b5f946-2351-4380-b24e-297e8c708a67"]',
  placeholder: "Enter user IDs",
  comments: "A list of user IDs to delete.",
  clean: getUserIds,
});
export const fileType = input({
  label: "File Type",
  type: "string",
  required: false,
  comments: "The type of file to retrieve.",
  placeholder: "Enter file type",
  clean: util.types.toString,
});
export const advancedUpdate = input({
  label: "Advanced Update",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, allows advanced update operations for the document.",
  clean: util.types.toBool,
});
export const changeRoutingOrder = input({
  label: "Change Routing Order",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, allows defining the routing order of recipients while sending documents for signature.",
  clean: util.types.toBool,
});
export const mergeRolesOnDraft = input({
  label: "Merge Roles On Draft",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, template roles will be merged and empty recipients will be removed. This parameter applies when creating a draft envelope with multiple templates.",
  clean: util.types.toBool,
});
export const resendEnvelope = input({
  label: "Resend Envelope",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, resends the specified envelope.",
  clean: util.types.toBool,
});
export const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The ID of the user to access.",
  example: "a1b5f946-2351-4380-b24e-297e8c708a67",
  placeholder: "Enter User ID",
  clean: util.types.toString,
});
export const deleteParam = input({
  label: "Delete",
  type: "string",
  required: false,
  comments:
    "A list of groups to remove the user from. A comma-separated list of the following: Groups, PermissionSet or SigningGroupsEmail.",
  example: "Groups",
  placeholder: "Enter delete parameters",
  clean: util.types.toString,
});
export const contactId = input({
  label: "Contact ID",
  type: "string",
  required: true,
  comments: "The ID of a contact person in the account's address book.",
  placeholder: "Enter Contact ID",
  clean: util.types.toString,
});
export const cloudProvider = input({
  label: "Cloud Provider",
  type: "string",
  required: false,
  comments:
    "The cloud provider from which to retrieve the contacts. Valid values are: rooms or docusignCore.",
  example: "rooms",
  placeholder: "Enter cloud provider",
  clean: util.types.toString,
});
export const includeChrome = input({
  label: "Include Chrome",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the response includes the chrome-styled version of the signature image.",
  clean: util.types.toBool,
});
export const connectId = input({
  label: "Connect ID",
  type: "string",
  required: true,
  comments:
    "The ID of the custom Connect (Webhook) configuration being accessed.",
  example: "10486941",
  placeholder: "Enter Connect ID",
  clean: util.types.toString,
});
export const urlToPublishTo = input({
  label: "URL To Publish To",
  type: "string",
  required: true,
  comments: "The URL that DocuSign will publish events to.",
  example: "https://your-webhook-endpoint.com/webhook",
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});
export const webhookName = input({
  label: "Connect (Webhook) Configuration Name",
  type: "string",
  required: true,
  comments: "A name for the configuration.",
  example: "My Webhook Configuration",
  placeholder: "Enter webhook configuration name",
  clean: util.types.toString,
});
export const includeHMAC = input({
  label: "Include HMAC",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the HMAC hash is included in the message along with the API request.",
  clean: util.types.toBool,
});
export const webhookEvents = input({
  label: "Webhook Event",
  type: "string",
  collection: "valuelist",
  model: WEBHOOK_EVENTS.map((event) => ({ label: event, value: event })),
  comments: "The list of event types to subscribe to.",
  placeholder: "Select webhook events",
  required: true,
});
export const connectKey = input({
  label: "Connect Key",
  type: "string",
  required: true,
  comments:
    "This key is used to create the HMAC hash that DocuSign will send along with the message. Check https://developers.docusign.com/platform/webhooks/connect/setting-up-hmac/ for instructions on how to generate a key.",
  placeholder: "Enter Connect key",
  clean: util.types.toString,
});
