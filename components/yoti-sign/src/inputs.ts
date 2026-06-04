import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayListFileInput,
  cleanBooleanInput,
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanStringArrayInput,
  cleanStringInput,
} from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  example: "A connection used for Yoti Sign",
});

export const environment = input({
  label: "Environment",
  type: "string",
  required: true,
  comments: "The environment to use for the Yoti Sign API",
  model: [
    { label: "Sandbox", value: "https://demo.api.yotisign.com" },
    { label: "Production", value: "https://api.yotisign.com" },
  ],
  default: "",
  clean: cleanStringInput,
});

export const notificationDestination = input({
  label: "Notification Destination",
  type: "string",
  required: false,
  comments: "The destination for the notifications",
  example: "https://example.com/callback",
  placeholder: "https://example.com/callback",
  clean: cleanStringInput,
});

export const envelopName = input({
  label: "Envelope Name",
  type: "string",
  required: true,
  comments: "The name of the envelope",
  example: "Envelope name",
  placeholder: "Envelope name",
  clean: cleanStringInput,
});

export const fileList = input({
  label: "Files",
  type: "data",
  required: true,
  collection: "valuelist",
  comments: "The files to be used for the envelope",
  clean: cleanArrayListFileInput,
});

export const fileName = input({
  label: "PDF File Name",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "The name of the file to be used for the envelope",
  example: "example.pdf",
  placeholder: "example.pdf",
  clean: cleanStringArrayInput,
});

export const envelopeId = input({
  label: "Envelope ID",
  type: "string",
  required: true,
  comments: "The ID of the envelope",
  example: "envelope-id",
  placeholder: "envelope-id",
  dataSource: "selectEnvelope",
  clean: cleanStringInput,
});

export const recipientId = input({
  label: "Recipient ID",
  type: "string",
  required: true,
  comments: "The ID of the recipient",
  example: "recipient-id",
  placeholder: "recipient-id",
  clean: cleanStringInput,
});

export const mediaId = input({
  label: "Media ID",
  type: "string",
  required: true,
  comments: "The ID of the media",
  example: "media-id",
  placeholder: "media-id",
  clean: cleanStringInput,
});

export const hasEnvelopeOtps = input({
  label: "Has Envelope OTPs",
  type: "string",
  required: false,
  comments:
    "Boolean, to determine if the envelope access requires OTP verification",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "Empty", value: "" },
  ],
  clean: cleanBooleanInput,
});

export const emails = input({
  label: "Emails",
  type: "code",
  language: "json",
  required: false,
  comments: "The emails to be used for the envelope",
  default: JSON.stringify(
    {
      invitation: {
        body: {
          message: "Please sign this document",
        },
      },
      reminders: {
        frequency: 1,
      },
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const recipients = input({
  label: "Recipients",
  type: "code",
  language: "json",
  required: true,
  comments: "The recipients to send the envelope to",
  default: JSON.stringify(
    [
      {
        name: "User 1",
        email: "user1@gtest.com",
        role: "Signee",
        auth_type: "no-auth",
        sign_group: 1,
        tags: [
          {
            page_number: 1,
            x: 0.1,
            y: 0.1,
            type: "signature",
            optional: false,
            file_name: "myfile.pdf",
          },
        ],
        event_notifications: [
          "signer_invitation",
          "signer_invitation_sms",
          "envelope_completion",
        ],
        rules: [
          {
            action: "show",
            conditions: [
              {
                trigger_tag_name: "sign-here",
                criteria: "has_value",
              },
            ],
            affected_tag_names: ["signee-name"],
          },
        ],
        witness: {
          tags: [],
        },
      },
    ],
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const notificationsSubscriptions = input({
  label: "Notifications Subscriptions",
  type: "string",
  required: false,
  comments: "The notifications subscriptions to be used for the envelope",
  collection: "valuelist",
  model: [
    { label: "Destination", value: "destination" },
    { label: "Envelope Completion", value: "envelope_completion" },
    { label: "Envelope Ready", value: "envelope_ready" },
    { label: "Envelope Created", value: "envelope_created" },
    { label: "Signer Completion", value: "signer_completion" },
    { label: "Upload Errors", value: "upload_errors" },
    { label: "IDV Resource Update", value: "idv_resource_update" },
    { label: "IDV Session Completion", value: "idv_session_completion" },
    { label: "IDV Check Completion", value: "idv_check_completion" },
    { label: "IDV Task Completion", value: "idv_task_completion" },
    { label: "IDV Session Limit Reached", value: "idv_session_limit_reached" },
  ],
  clean: cleanStringArrayInput,
});

export const branding = input({
  label: "Branding",
  type: "code",
  language: "json",
  required: false,
  comments: "The branding to be used for the envelope",
  default: JSON.stringify(
    {
      logo_options: {
        logo_choice: "brand_powered_by_yoti",
        logo_base64: "base64-encoded-PNG-image",
      },
      primary_color: "#000",
      primary_color_hover: "#c0c0c0",
      on_primary_color: "#fff",
      secondary_color: "#00ffff",
      secondary_color_hover: "#d2691e",
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const parent_redirect_urls = input({
  label: "Parent Redirect URLs",
  type: "code",
  language: "json",
  required: false,
  comments: "The parent redirect URLs to be used for the envelope",
  default: JSON.stringify(
    {
      success: "https://someurl.com/success",
      failure: "https://someurl.com/failure",
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const offset = input({
  label: "Offset",
  type: "string",
  required: false,
  comments: "The files to be used for the envelope",
  example: "0",
  placeholder: "0",
  clean: cleanStringInput,
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "The amount of envelopes to return",
  example: "50",
  placeholder: "50",
  clean: cleanStringInput,
});

export const keyValueParams = input({
  label: "Key Value Params",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Key value pairs to be used as query parameters",
  example: "key1=value1",
  placeholder: "key1=value1",
  clean: cleanKeyValueListInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "Boolean to determine if all records should be fetched",
  clean: util.types.toBool,
});

export const recipientInfo = input({
  label: "Recipient Info",
  type: "code",
  language: "json",
  required: true,
  comments: "The recipient info to be modified",
  default: JSON.stringify(
    {
      name: "foobar", 
      email: "test@example.com", 
      iso_country_code: "US", 
      mobile_number: "2136210002", 
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const envelopeIds = input({
  label: "Envelope IDs",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "The IDs of the envelopes",
  clean: cleanStringArrayInput,
});

export const autotagging = input({
  label: "Autotagging",
  type: "string",
  required: false,
  comments:
    "Auto-tagging is an optional property and is used to automatically place fields in documents which have been set up for Auto-tagging. This is an extension of templates.",
  model: [
    { label: "GENERAL", value: "GENERAL" },
    { label: "REAL ESTATE", value: "REAL_ESTATE" },
    { label: "ALL", value: "ALL" },
  ],
  clean: cleanStringInput,
});
