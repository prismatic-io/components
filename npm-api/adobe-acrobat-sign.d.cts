//#region src/types/index.d.ts
interface AgreementResponse {
  page: PageInfo;
  userAgreementList: Agreement[];
}
interface Agreement {
  displayDate: string;
  displayParticipantSetInfos: DisplayParticipantSetInfo[];
  esign: boolean;
  groupId: string;
  hidden: boolean;
  latestVersionId: string;
  name: string;
  id: string;
  parentId: string;
  status: string;
  type: string;
}
interface AgreementInfo {
  name: string;
  participantSetsInfo: ParticipantSetInfo[];
  signatureType: string;
  status: string;
  agreementSettingsInfo: AgreementSettingsInfo;
  ccs?: CcInfo[];
  createdDate?: string;
  deviceInfo?: OfflineDeviceInfo;
  documentRetentionAppliedDate?: string;
  documentVisibilityEnabled?: boolean;
  emailOption?: EmailOption;
  expirationTime?: string;
  externalId: ExternalId;
  fileInfos?: FileInfo[];
  firstReminderDelay?: number;
  formFieldGenerator?: FormFieldGenerator[];
  formFieldLayerTemplates?: FileInfo[];
  groupId?: string;
  hasFormFieldData?: boolean;
  hasSignerIdentityReport?: boolean;
  id?: string;
  isDocumentRetentionApplied?: boolean;
  lastEventDate?: string;
  locale?: string;
  mergeFieldInfo?: MergeFieldInfo[];
  message?: string;
  notaryInfo?: NotaryInfo;
  parentId?: string;
  postSignOption?: PostSignOption;
  redirectOptions?: RedirectOptions[];
  reminderFrequency?: string;
  securityOption?: SecurityOption;
  sendType?: string;
  senderEmail?: string;
  senderSigns?: string;
  state?: string;
  type: string;
  vaultingInfo?: VaultingInfo;
  workflowId?: string;
}
interface VaultingInfo {
  enabled?: boolean;
}
interface ParticipantSetInfo {
  id?: string;
  memberInfos?: ParticipantInfo[];
  electronicSealId?: string;
  order: number;
  role: Role;
  label?: string;
  privateMessage?: string;
  name?: string;
  providerParticipationInfo?: ProviderParticipationInfo;
  visibilePages?: string[];
}
interface ParticipantInfo {
  email: string;
  id?: string;
  name?: string;
  status?: string;
  deliverableEmail?: boolean;
  phoneDeliveryInfo?: PhoneDeliveryInfo;
  securityOption?: SecurityOption;
}
interface PhoneDeliveryInfo {
  countryCode?: string;
  phoneNumber?: string;
  phone?: string;
}
interface SecurityOption {
  contentProtectionPreference?: ContentProtectionPreferences;
  openPassword?: string;
}
interface ContentProtectionPreferences {
  externalContentProtectionPreferences?: ExternalContentProtectionPreferences;
  internalContentProtectionPreferences?: InternalContentProtectionPreferences;
}
interface ProviderParticipationInfo {
  label?: string;
  participationId?: string;
  participationSetId?: string;
}
interface AgreementSettingsInfo {
  canEditAgreementSettings?: boolean;
  canEditElectronicSeals?: boolean;
  canEditFiles?: boolean;
  hipaaEnabled?: boolean;
}
interface CcInfo {
  email: string;
  label?: string;
  visiblePages?: string[];
}
interface OfflineDeviceInfo {
  applicationDescription: string;
  deviceDescription: string;
  deviceTime?: string;
}
interface EmailOption {
  sendOptions?: SendOptions;
}
interface SendOptions {
  initEmails?: InitEmail;
  inFlightEmails?: InFlightEmail;
  completionEmails?: CompletionEmail;
}
interface ExternalId {
  id?: string;
}
interface FileInfo {
  document?: Document;
  label?: string;
  libraryDocumentId?: string;
  notarize?: boolean;
  transientDocumentId?: string;
  urlFileInfo?: UrlFileInfo;
}
interface UrlFileInfo {
  mimeType: string;
  url: string;
  name: string;
}
interface Document {
  createdDate: string;
  id: string;
  label: string;
  numPages: number;
  mimeType?: string;
  name?: string;
}
interface FormFieldGenerator {
  formFieldDescription: FormFieldDescription;
  formFieldNamePrefix: string;
  generatorType: "ANCHOR_TEXT";
  participantSetName: string;
  anchorTextInfo?: AnchorTextInfo;
  linked?: boolean;
}
interface FormFieldDescription {
  alignment?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: number;
  calculated?: boolean;
  contentType?: string;
  conditionalAction: FormFieldConditionalAction;
  defaultValue?: string;
  displayFormat?: string;
  displayFormatType?: string;
  displayLabel?: string;
  fontColor?: string;
  fontName?: string;
  fontSize?: number;
  hiddenOptions?: string[];
  hyperlink?: FormFieldHyperlink;
  inputType?: string;
  masked?: boolean;
  maskingText?: string;
  maxLength?: number;
  maxValue?: number;
  minLength?: number;
  minValue?: number;
  origin: "AUTHORED" | "GENERATED" | "IMPORTED";
  radioCheckType?: "CIRCLE" | "CHECK" | "CROSS" | "DIAMOND" | "SQUARE" | "STAR";
  readOnly?: boolean;
  required?: boolean;
  tooltip?: string;
  urlOverridable?: boolean;
  validation: string;
  validationData?: string;
  validationErrMsg?: string;
  valueExpression?: string;
  visible?: boolean;
  visibleOptions?: string[];
}
interface FormFieldConditionalAction {
  action?: "SHOW" | "HIDE" | "DISABLE" | "ENABLE";
  anyOrAll?: "ANY" | "ALL";
}
interface FormFieldHyperlink {
  documentLocation?: FormFieldLocation;
  linkType?: "INTERNAL" | "EXTERNAL" | "FROM_TEXT";
  url?: string;
}
interface FormFieldLocation {
  height: number;
  left: number;
  pageNumber: number;
  top: number;
  width: number;
}
interface AnchorTextInfo {
  anchorText: string;
  anchoredFormFIeldLocations: AnchoredFormFieldLocation;
  fileInfoLabel?: string;
  pages?: number[];
}
interface AnchoredFormFieldLocation {
  height: number;
  width: number;
  offsetX: number;
  offsetY: number;
}
interface MergeFieldInfo {
  defaultValue: string;
  fieldName: string;
}
interface NotaryInfo {
  appointment?: string;
  notaryEmail?: string;
  notaryId?: string;
  note?: string;
  payment?: string;
}
interface PostSignOption {
  redirectDelay?: number;
  redirectUrl?: string;
}
interface RedirectOptions {
  action: string;
  url: string;
  delay?: number;
}
interface DisplayParticipantSetInfo {
  displayUserSetMemberInfos: DisplayUserSetMemberInfo[];
  displayUserSetName: string;
}
interface DisplayUserSetMemberInfo {
  email: string;
  company: string;
  fullName: string;
}
interface PageInfo {
  nextCursor: string;
}
interface UserResponse {
  page: PageInfo;
  userInfoList: User[];
}
interface User {
  email: string;
  company: string;
  isAccountAdmin: boolean;
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
}
interface DetailedUserInfoResponse {
  email: string;
  isAccountAdmin: boolean;
  company: string;
  firstName: string;
  lastName: string;
  locale: string;
  phone: string;
  title: string;
  id?: string;
  accountId?: string;
  accountType?: string;
  initials?: string;
  primaryGroupId?: string;
  status?: string;
  createdDate?: string;
}
interface WebhookResponse {
  page: PageInfo;
  userWebhookList: Webhook[];
}
interface Webhook {
  id: string;
  name: string;
  scope: string;
  webhookSubscriptionEvents: string[];
  webhookUrlInfo: WebhookUrlInfo;
  applicationDisplayName: string;
  applicationName: string;
  lastModified: string;
  problemNotificationEmails: ProblemNotificationEmails[];
  resourceId: string;
  resourceType: string;
  status: string;
  state?: string;
}
interface WebhookUrlInfo {
  url: string;
}
interface WebhookInfo extends Webhook {
  created: string;
  webhookConditionalParams: WebhookConditionalParams;
}
interface ProblemNotificationEmails {
  email?: string;
}
interface WebhookConditionalParams {
  webhookAgreementEvents?: {
    includeDetailedInfo?: boolean;
    includeDocumentsInfo?: boolean;
    includeParticipantsInfo?: boolean;
    includeSignedDocuments?: boolean;
  };
  webhookLibraryDocumentEvents?: {
    includeDetailedInfo?: boolean;
    includeDocumentsInfo?: boolean;
  };
  webhookMegaSignEvents?: {
    includeDetailedInfo?: boolean;
    includeDocumentsInfo?: boolean;
    includeParticipantsInfo?: boolean;
  };
  webhookWidgetEvents?: {
    includeDetailedInfo?: boolean;
    includeDocumentsInfo?: boolean;
    includeParticipantsInfo?: boolean;
  };
}
interface AccountInfoResponse {
  accountType?: string;
  company?: string;
  created?: string;
  externalId?: string;
  id?: string;
  modified?: string;
  name?: string;
}
type SearchSortOrder = "ASC" | "DESC";
type SearchSubtypes = "DOCUMENT" | "FORM_FIELD_LAYER";
type SearchVisibility = "SHOW_HIDDEN" | "SHOW_VISIBLE" | "SHOW_ALL";
type ExternalContentProtectionPreferences = "ENABLE" | "DISABLE";
type InternalContentProtectionPreferences = "ENABLE" | "DISABLE";
type Role = "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "ELECTRONIC_SEALER";
type AgreementState = "AUTHORING" | "DRAFT" | "IN_PROCESS" | "RESTART";
type SignatureType = "ESIGN" | "WRITTEN";
type CompletionEmail = "NONE" | "ALL";
type InitEmail = "NONE" | "ALL";
type InFlightEmail = "NONE" | "ALL";
type GroupEventType = "CREATED" | "DELETED" | "RENAMED" | "SHARE_REQUESTED" | "SHARE_ACCEPTED" | "SHARE_DECLINED" | "SHARE_CANCELLED" | "SHARE_REQUEST_RESENT" | "SHARE_MODIFIED";
interface Group {
  groupId: string;
  groupName: string;
  createdDate: string;
  isDefaultGroup: boolean;
}
interface GroupUser {
  email: string;
  id: string;
  isGroupAdmin: boolean;
  company?: string;
  firstName?: string;
  lastName?: string;
}
interface GroupEvent {
  date: string;
  groupId: string;
  accountId?: string;
  userId?: string;
  event?: GroupEventType;
  groupEventId?: string;
  adminUserId?: string;
}
interface ListGroup {
  page: PageInfo;
  groupInfoList: Group[];
}
interface ListGroupUsers {
  page: PageInfo;
  userInfoList: GroupUser[];
}
interface ListGroupEvents {
  page: PageInfo;
  groupEvents: GroupEvent[];
}
interface GenericCreate {
  id: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "adobe-acrobat-sign";
  documentationUrl: "https://prismatic.io/docs/components/adobe-acrobat-sign/";
  public: true;
  display: {
    category: "Application Connectors";
    label: string;
    description: string;
    iconPath: string;
  };
  actions: {
    createWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookSubscriptionEvents: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: "AGREEMENT_CREATED" | "AGREEMENT_ACTION_DELEGATED" | "AGREEMENT_RECALLED" | "AGREEMENT_REJECTED" | "AGREEMENT_EXPIRED" | "AGREEMENT_ACTION_COMPLETED" | "AGREEMENT_WORKFLOW_COMPLETED" | "AGREEMENT_RESTARTED" | "AGREEMENT_EMAIL_VIEWED" | "AGREEMENT_MODIFIED" | "AGREEMENT_SHARED" | "AGREEMENT_UNSHARED" | "AGREEMENT_UNSHARED_AUTO" | "AGREEMENT_READY_TO_VAULT" | "AGREEMENT_VAULTED" | "AGREEMENT_ACTION_REQUESTED" | "AGREEMENT_ACTION_REPLACED_SIGNER" | "AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "AGREEMENT_DOCUMENTS_DELETED" | "AGREEMENT_EMAIL_BOUNCED" | "AGREEMENT_KBA_AUTHENTICATED" | "AGREEMENT_OFFLINE_SYNC" | "AGREEMENT_USER_ACK_AGREEMENT_MODIFIED" | "AGREEMENT_WEB_IDENTITY_AUTHENTICATED" | "AGREEMENT_READY_TO_NOTARIZE" | "AGREEMENT_EXPIRATION_UPDATED" | "AGREEMENT_REMINDER_SENT" | "AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER" | "AGREEMENT_REMINDER_INITIATED" | "AGREEMENT_DOCUMENTS_VIEWED" | "AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED" | "AGREEMENT_ALL" | "MEGASIGN_CREATED" | "MEGASIGN_RECALLED" | "MEGASIGN_SHARED" | "MEGASIGN_REMINDER_SENT" | "MEGASIGN_REMINDER_INITIATED" | "MEGASIGN_ALL" | "WIDGET_CREATED" | "WIDGET_MODIFIED" | "WIDGET_SHARED" | "WIDGET_ENABLED" | "WIDGET_DISABLED" | "WIDGET_AUTO_CANCELLED_CONVERSION_PROBLEM" | "WIDGET_ALL" | "LIBRARY_DOCUMENT_CREATED" | "LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "LIBRARY_DOCUMENT_MODIFIED" | "LIBRARY_DOCUMENT_ALL";
          label: "AGREEMENT_CREATED" | "AGREEMENT_ACTION_DELEGATED" | "AGREEMENT_RECALLED" | "AGREEMENT_REJECTED" | "AGREEMENT_EXPIRED" | "AGREEMENT_ACTION_COMPLETED" | "AGREEMENT_WORKFLOW_COMPLETED" | "AGREEMENT_RESTARTED" | "AGREEMENT_EMAIL_VIEWED" | "AGREEMENT_MODIFIED" | "AGREEMENT_SHARED" | "AGREEMENT_UNSHARED" | "AGREEMENT_UNSHARED_AUTO" | "AGREEMENT_READY_TO_VAULT" | "AGREEMENT_VAULTED" | "AGREEMENT_ACTION_REQUESTED" | "AGREEMENT_ACTION_REPLACED_SIGNER" | "AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "AGREEMENT_DOCUMENTS_DELETED" | "AGREEMENT_EMAIL_BOUNCED" | "AGREEMENT_KBA_AUTHENTICATED" | "AGREEMENT_OFFLINE_SYNC" | "AGREEMENT_USER_ACK_AGREEMENT_MODIFIED" | "AGREEMENT_WEB_IDENTITY_AUTHENTICATED" | "AGREEMENT_READY_TO_NOTARIZE" | "AGREEMENT_EXPIRATION_UPDATED" | "AGREEMENT_REMINDER_SENT" | "AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER" | "AGREEMENT_REMINDER_INITIATED" | "AGREEMENT_DOCUMENTS_VIEWED" | "AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED" | "AGREEMENT_ALL" | "MEGASIGN_CREATED" | "MEGASIGN_RECALLED" | "MEGASIGN_SHARED" | "MEGASIGN_REMINDER_SENT" | "MEGASIGN_REMINDER_INITIATED" | "MEGASIGN_ALL" | "WIDGET_CREATED" | "WIDGET_MODIFIED" | "WIDGET_SHARED" | "WIDGET_ENABLED" | "WIDGET_DISABLED" | "WIDGET_AUTO_CANCELLED_CONVERSION_PROBLEM" | "WIDGET_ALL" | "LIBRARY_DOCUMENT_CREATED" | "LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "LIBRARY_DOCUMENT_MODIFIED" | "LIBRARY_DOCUMENT_ALL";
        }[];
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      scope: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookUrlInfo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookApplication: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          webhookApplicationName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          webhookApplicationDisplayName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      webhookProblemNotificationEmails: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string[];
      };
      webhookResourceId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      webhookResourceType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      webhookAgreementEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookLibraryDocumentEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookMegaSignEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookWidgetEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    getWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WebhookInfo;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      showInactiveWebhooks: {
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        required: false;
      };
      scope: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookResourceType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webhook[] | WebhookResponse;
    }>;
    updateWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookSubscriptionEvents: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: "AGREEMENT_CREATED" | "AGREEMENT_ACTION_DELEGATED" | "AGREEMENT_RECALLED" | "AGREEMENT_REJECTED" | "AGREEMENT_EXPIRED" | "AGREEMENT_ACTION_COMPLETED" | "AGREEMENT_WORKFLOW_COMPLETED" | "AGREEMENT_RESTARTED" | "AGREEMENT_EMAIL_VIEWED" | "AGREEMENT_MODIFIED" | "AGREEMENT_SHARED" | "AGREEMENT_UNSHARED" | "AGREEMENT_UNSHARED_AUTO" | "AGREEMENT_READY_TO_VAULT" | "AGREEMENT_VAULTED" | "AGREEMENT_ACTION_REQUESTED" | "AGREEMENT_ACTION_REPLACED_SIGNER" | "AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "AGREEMENT_DOCUMENTS_DELETED" | "AGREEMENT_EMAIL_BOUNCED" | "AGREEMENT_KBA_AUTHENTICATED" | "AGREEMENT_OFFLINE_SYNC" | "AGREEMENT_USER_ACK_AGREEMENT_MODIFIED" | "AGREEMENT_WEB_IDENTITY_AUTHENTICATED" | "AGREEMENT_READY_TO_NOTARIZE" | "AGREEMENT_EXPIRATION_UPDATED" | "AGREEMENT_REMINDER_SENT" | "AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER" | "AGREEMENT_REMINDER_INITIATED" | "AGREEMENT_DOCUMENTS_VIEWED" | "AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED" | "AGREEMENT_ALL" | "MEGASIGN_CREATED" | "MEGASIGN_RECALLED" | "MEGASIGN_SHARED" | "MEGASIGN_REMINDER_SENT" | "MEGASIGN_REMINDER_INITIATED" | "MEGASIGN_ALL" | "WIDGET_CREATED" | "WIDGET_MODIFIED" | "WIDGET_SHARED" | "WIDGET_ENABLED" | "WIDGET_DISABLED" | "WIDGET_AUTO_CANCELLED_CONVERSION_PROBLEM" | "WIDGET_ALL" | "LIBRARY_DOCUMENT_CREATED" | "LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "LIBRARY_DOCUMENT_MODIFIED" | "LIBRARY_DOCUMENT_ALL";
          label: "AGREEMENT_CREATED" | "AGREEMENT_ACTION_DELEGATED" | "AGREEMENT_RECALLED" | "AGREEMENT_REJECTED" | "AGREEMENT_EXPIRED" | "AGREEMENT_ACTION_COMPLETED" | "AGREEMENT_WORKFLOW_COMPLETED" | "AGREEMENT_RESTARTED" | "AGREEMENT_EMAIL_VIEWED" | "AGREEMENT_MODIFIED" | "AGREEMENT_SHARED" | "AGREEMENT_UNSHARED" | "AGREEMENT_UNSHARED_AUTO" | "AGREEMENT_READY_TO_VAULT" | "AGREEMENT_VAULTED" | "AGREEMENT_ACTION_REQUESTED" | "AGREEMENT_ACTION_REPLACED_SIGNER" | "AGREEMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "AGREEMENT_DOCUMENTS_DELETED" | "AGREEMENT_EMAIL_BOUNCED" | "AGREEMENT_KBA_AUTHENTICATED" | "AGREEMENT_OFFLINE_SYNC" | "AGREEMENT_USER_ACK_AGREEMENT_MODIFIED" | "AGREEMENT_WEB_IDENTITY_AUTHENTICATED" | "AGREEMENT_READY_TO_NOTARIZE" | "AGREEMENT_EXPIRATION_UPDATED" | "AGREEMENT_REMINDER_SENT" | "AGREEMENT_SIGNER_NAME_CHANGED_BY_SIGNER" | "AGREEMENT_REMINDER_INITIATED" | "AGREEMENT_DOCUMENTS_VIEWED" | "AGREEMENT_DOCUMENTS_VIEWED_PASSWORD_PROTECTED" | "AGREEMENT_ALL" | "MEGASIGN_CREATED" | "MEGASIGN_RECALLED" | "MEGASIGN_SHARED" | "MEGASIGN_REMINDER_SENT" | "MEGASIGN_REMINDER_INITIATED" | "MEGASIGN_ALL" | "WIDGET_CREATED" | "WIDGET_MODIFIED" | "WIDGET_SHARED" | "WIDGET_ENABLED" | "WIDGET_DISABLED" | "WIDGET_AUTO_CANCELLED_CONVERSION_PROBLEM" | "WIDGET_ALL" | "LIBRARY_DOCUMENT_CREATED" | "LIBRARY_DOCUMENT_AUTO_CANCELLED_CONVERSION_PROBLEM" | "LIBRARY_DOCUMENT_MODIFIED" | "LIBRARY_DOCUMENT_ALL";
        }[];
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      scope: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookUrlInfo: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookApplication: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          webhookApplicationName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          webhookApplicationDisplayName: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      webhookProblemNotificationEmails: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string[];
      };
      webhookAgreementEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookLibraryDocumentEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookMegaSignEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
      webhookWidgetEvents: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown) => Record<string, boolean>[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      isAccountAdmin: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      initials: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          locale: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          accountId: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          company: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: DetailedUserInfoResponse;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: User[] | UserResponse;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      firstName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      initials: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userStatus: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          locale: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          company: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTransientDocument: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      file: {
        label: string;
        type: "data";
        required: true;
        placeholder: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
        comments: string;
      };
      mimeType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchResources: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ownershipScope: {
        label: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
      };
      externalId: {
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
      };
      groupId: {
        collection: "valuelist";
        clean: (value: unknown) => string[];
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        dataSource: string;
      };
      assetId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      libraryDocumentId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      pageSize: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      parentId: {
        collection: "valuelist";
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[];
        comments: string;
      };
      participantEmail: {
        collection: "valuelist";
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[];
        comments: string;
      };
      queryableFields: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string[];
        collection: "valuelist";
        comments: string;
      };
      searchRole: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        model: {
          value: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "SENDER" | "CC" | "SHARE" | "OTHER";
          label: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "SENDER" | "CC" | "SHARE" | "OTHER";
        }[];
        clean: (value: unknown) => string[];
        comments: string;
      };
      sortByField: {
        label: string;
        type: "string";
        placeholder: string;
        model: {
          value: "SENDER" | "CREATED_DATE" | "MODIFIED_DATE" | "EXPIRATION_DATE" | "NAME" | "STATUS";
          label: "SENDER" | "CREATED_DATE" | "MODIFIED_DATE" | "EXPIRATION_DATE" | "NAME" | "STATUS";
        }[];
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      sortOrder: {
        label: string;
        type: "string";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => SearchSortOrder;
        comments: string;
      };
      startIndex: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
      };
      searchStatus: {
        label: string;
        type: "string";
        collection: "valuelist";
        placeholder: string;
        clean: (value: unknown) => string[];
        model: {
          value: "ACTIVE" | "CANCELLED" | "EXPIRED" | "AUTHORING" | "OUT_FOR_SIGNATURE" | "OTHER" | "WAITING_FOR_MY_SIGNATURE" | "WAITING_FOR_MY_APPROVAL" | "WAITING_FOR_MY_DELEGATION" | "WAITING_FOR_MY_ACKNOWLEDGEMENT" | "WAITING_FOR_MY_ACCEPTANCE" | "WAITING_FOR_MY_FORM_FILLING" | "WAITING_FOR_PREFILL" | "WAITING_FOR_AUTHORING" | "OUT_FOR_APPROVAL" | "OUT_FOR_DELIVERY" | "OUT_FOR_ACCEPTANCE" | "OUT_FOR_FORM_FILLING" | "SIGNED" | "APPROVED" | "FORM_FILLED" | "DELIVERED" | "ACCEPTED" | "ARCHIVED" | "REMOVED" | "DISABLED" | "WAITING_FOR_NOTARIZATION" | "ACCEPT_BEFORE_NOTARIZATION";
          label: "ACTIVE" | "CANCELLED" | "EXPIRED" | "AUTHORING" | "OUT_FOR_SIGNATURE" | "OTHER" | "WAITING_FOR_MY_SIGNATURE" | "WAITING_FOR_MY_APPROVAL" | "WAITING_FOR_MY_DELEGATION" | "WAITING_FOR_MY_ACKNOWLEDGEMENT" | "WAITING_FOR_MY_ACCEPTANCE" | "WAITING_FOR_MY_FORM_FILLING" | "WAITING_FOR_PREFILL" | "WAITING_FOR_AUTHORING" | "OUT_FOR_APPROVAL" | "OUT_FOR_DELIVERY" | "OUT_FOR_ACCEPTANCE" | "OUT_FOR_FORM_FILLING" | "SIGNED" | "APPROVED" | "FORM_FILLED" | "DELIVERED" | "ACCEPTED" | "ARCHIVED" | "REMOVED" | "DISABLED" | "WAITING_FOR_NOTARIZATION" | "ACCEPT_BEFORE_NOTARIZATION";
        }[];
        comments: string;
      };
      subTypes: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => SearchSubtypes;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      searchType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      searchUserId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[];
        collection: "valuelist";
        comments: string;
      };
      visibility: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => SearchVisibility;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
      };
      searchWorkflowId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[];
        collection: "valuelist";
        comments: string;
      };
      searchQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dateGreaterThanCreatedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateGreaterThanExpirationDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateGreaterThanModifiedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateLessThanCreatedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateLessThanExpirationDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateLessThanModifiedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMaxCreatedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMaxExpirationDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMaxModifiedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMinCreatedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMinExpirationDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dateMinModifiedDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        placeholder: string;
        example: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: import("axios").Method;
          value: import("axios").Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: import("axios").ResponseType;
          value: import("axios").ResponseType;
        }[];
        clean: (value: unknown) => import("axios").ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: any;
        headers: import("axios").AxiosResponseHeaders | Partial<import("axios").RawAxiosHeaders & {
          Server: import("axios").AxiosHeaderValue;
          "Content-Type": import("axios").AxiosHeaderValue;
          "Content-Length": import("axios").AxiosHeaderValue;
          "Cache-Control": import("axios").AxiosHeaderValue;
          "Content-Encoding": import("axios").AxiosHeaderValue;
          server: import("axios").AxiosHeaderValue;
          "content-type": import("axios").AxiosHeaderValue;
          "content-length": import("axios").AxiosHeaderValue;
          "cache-control": import("axios").AxiosHeaderValue;
          "content-encoding": import("axios").AxiosHeaderValue;
        } & {
          'set-cookie': string[];
        }>;
      };
    }>;
    createGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      created: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isDefaultGroup: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCreate;
    }>;
    updateGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      groupName: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      created: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      isDefaultGroup: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: GenericCreate;
    }>;
    listGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListGroup | Group[];
    }>;
    listGroupEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListGroupEvents | GroupEvent[];
    }>;
    listGroupUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListGroupUsers | GroupUser[];
    }>;
    getGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Group;
    }>;
    deleteGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAgreement: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      transientDocumentId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      agreementName: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      participantsSetInfoRole: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "ELECTRONIC_SEALER";
          label: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "ELECTRONIC_SEALER";
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      participantMemberInfoEmail: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      signatureType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => SignatureType;
        comments: string;
      };
      agreementState: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => AgreementState;
        comments: string;
      };
      additionalAgreementParticipants: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => unknown[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAgreementDocuments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agreementId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    downloadAgreementFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agreementId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAgreement: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agreementId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AgreementInfo;
    }>;
    listAgreements: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          pageSize: {
            example: string;
            default: string;
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showHiddenAgreements: {
        label: string;
        type: "boolean";
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Agreement[] | AgreementResponse;
    }>;
    updateAgreement: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      transientDocumentId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      participantsSetInfoRole: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "ELECTRONIC_SEALER";
          label: "SIGNER" | "APPROVER" | "ACCEPTOR" | "CERTIFIED_RECIPIENT" | "FORM_FILLER" | "DELEGATE_TO_SIGNER" | "DELEGATE_TO_APPROVER" | "DELEGATE_TO_ACCEPTOR" | "DELEGATE_TO_CERTIFIED_RECIPIENT" | "DELEGATE_TO_FORM_FILLER" | "NOTARY_SIGNER" | "ELECTRONIC_SEALER";
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      agreementName: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      participantMemberInfoEmail: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      signatureType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => SignatureType;
        comments: string;
      };
      agreementState: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => AgreementState;
        comments: string;
      };
      expirationDate: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: false;
      };
      agreementId: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountType: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      countryCode: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      numSeats: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      firstName: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      phone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          externalId: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          locale: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          trialDuration: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          company: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AccountInfoResponse;
    }>;
  };
  triggers: {
    adobeSignTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      strictValidation: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectAgreements: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      showHiddenAgreements: {
        default: string;
        comments: string;
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      groupId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUsers: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhooks: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filterQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      scope: {
        required: boolean;
        label: string;
        type: "string";
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webhookResourceType: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
        model: {
          value: string;
          label: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      refreshUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;