export interface AgreementResponse {
  page: PageInfo;
  userAgreementList: Agreement[];
}

export interface Agreement {
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

export interface AgreementInfo {
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

export interface VaultingInfo {
  enabled?: boolean;
}

export interface ParticipantSetInfo {
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

export interface PageInfo {
  nextCursor: string;
}

export interface UserResponse {
  page: PageInfo;
  userInfoList: User[];
}

export interface User {
  email: string;
  company: string;
  isAccountAdmin: boolean;
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
}

export interface DetailedUserInfoResponse {
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

export interface DetailedUserInfoPayload {
  email: string;
  isAccountAdmin: boolean;
  company?: string;
  firstName?: string;
  initials?: string;
  lastName?: string;
  locale?: string;
  phone?: string;
  primaryGroupId?: string;
  title?: string;
  accountId?: string;
}

export interface DetailedUserInfoPutPayload
  extends Omit<DetailedUserInfoResponse, "email" | "isAccountAdmin"> {
  email?: string;
  initials?: string;
  status?: string;
}

export interface WebhookResponse {
  page: PageInfo;
  userWebhookList: Webhook[];
}

export interface Webhook {
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

export interface WebhookUrlInfo {
  url: string;
}

export interface WebhookInfo extends Webhook {
  created: string;
  webhookConditionalParams: WebhookConditionalParams;
}

export interface ProblemNotificationEmails {
  email?: string;
}

export interface WebhookConditionalParams {
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

export interface WebhookPayload {
  name: string;
  scope: string;
  state?: "ACTIVE";
  webhookSubscriptionEvents: string[];
  webhookUrlInfo: WebhookUrlInfo;
  applicationDisplayName?: string;
  applicationName?: string;
  problemNotificationEmails?: ProblemNotificationEmails[];
  resourceId?: string;
  resourceType?: string;
  status?: string;
  webhookConditionalParams?: WebhookConditionalParams;
}

export interface AccountInfoResponse {
  accountType?: string;
  company?: string;
  created?: string;
  externalId?: string;
  id?: string;
  modified?: string;
  name?: string;
}

export interface AccountCreateResponse {
  accountId?: string;
  adminDetails?: AdminDetails;
}

export interface AdminDetails {
  email?: string;
  status?: string;
  userId?: string;
}

export interface SearchRequestBody {
  scope: string[];
  agreementAssetsCriteria: AgreementAssetsCriteria;
  query?: string;
}

interface AgreementAssetsCriteria {
  createdDate?: DateRangeFilter;
  expirationDate?: DateRangeFilter;
  role: string[];
  externalId?: string[];
  groupId?: string[];
  id?: string[];
  libraryDocumentId?: string;
  modifiedDate: DateRangeFilter;
  pageSize?: number;
  parentId?: string[];
  participantEmail?: string[];
  queryableFields?: string[];
  sortByField?: string;
  sortOrder: SearchSortOrder;
  startIndex?: number;
  status?: string[];
  subTypes?: SearchSubtypes[];
  type?: string[];
  userId?: string[];
  visibility?: SearchVisibility;
  workflowId?: string[];
}

interface DateRangeFilter {
  range: DateRange;
}

interface DateRange {
  gt?: string;
  lt?: string;
  max?: string;
  min?: string;
}

export type SearchSortOrder = "ASC" | "DESC";

export type SearchSubtypes = "DOCUMENT" | "FORM_FIELD_LAYER";

export type SearchVisibility = "SHOW_HIDDEN" | "SHOW_VISIBLE" | "SHOW_ALL";

export type ExternalContentProtectionPreferences = "ENABLE" | "DISABLE";

export type InternalContentProtectionPreferences = "ENABLE" | "DISABLE";

export type Role =
  | "SIGNER"
  | "APPROVER"
  | "ACCEPTOR"
  | "CERTIFIED_RECIPIENT"
  | "FORM_FILLER"
  | "DELEGATE_TO_SIGNER"
  | "DELEGATE_TO_APPROVER"
  | "DELEGATE_TO_ACCEPTOR"
  | "DELEGATE_TO_CERTIFIED_RECIPIENT"
  | "DELEGATE_TO_FORM_FILLER"
  | "NOTARY_SIGNER"
  | "ELECTRONIC_SEALER";

export type AgreementState = "AUTHORING" | "DRAFT" | "IN_PROCESS" | "RESTART";

export type SignatureType = "ESIGN" | "WRITTEN";

export type CompletionEmail = "NONE" | "ALL";

export type InitEmail = "NONE" | "ALL";

export type InFlightEmail = "NONE" | "ALL";

export type GroupEventType =
  | "CREATED"
  | "DELETED"
  | "RENAMED"
  | "SHARE_REQUESTED"
  | "SHARE_ACCEPTED"
  | "SHARE_DECLINED"
  | "SHARE_CANCELLED"
  | "SHARE_REQUEST_RESENT"
  | "SHARE_MODIFIED";

export interface Group {
  groupId: string;
  groupName: string;
  createdDate: string;
  isDefaultGroup: boolean;
}

export interface GroupUser {
  email: string;
  id: string;
  isGroupAdmin: boolean;
  company?: string;
  firstName?: string;
  lastName?: string;
}

export interface GroupEvent {
  date: string;
  groupId: string;
  accountId?: string;
  userId?: string;
  event?: GroupEventType;
  groupEventId?: string;
  adminUserId?: string;
}

export interface ListGroup {
  page: PageInfo;
  groupInfoList: Group[];
}

export interface ListGroupUsers {
  page: PageInfo;
  userInfoList: GroupUser[];
}

export interface ListGroupEvents {
  page: PageInfo;
  groupEvents: GroupEvent[];
}

export interface GenericCreate {
  id: string;
}

export interface CreateGroupPayload {
  groupName: string;
  created: string;
  isDefaultGroup?: boolean;
}

export interface UpdateGroupPayload {
  groupName?: string;
  created?: string;
  isDefaultGroup?: boolean;
}



export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}




export interface AdobeSignAgreementRecord {
  id?: string;
  name?: string;
  status?: string;
  type?: string;
  createdDate?: string;
  modifiedDate?: string;
  lastEventDate?: string;
  [key: string]: unknown;
}





export interface SearchResponse {
  agreementAssetEvents?: AdobeSignAgreementRecord[];
  agreementAssetsResults?: {
    agreementAssetsList?: AdobeSignAgreementRecord[];
  };
  page?: {
    nextCursor?: string;
  };
}





export interface FetchAgreementsResult {
  records: AdobeSignAgreementRecord[];
  truncated: boolean;
  latestModifiedDate?: string;
}




export interface PartitionedRecords {
  created: AdobeSignAgreementRecord[];
  updated: AdobeSignAgreementRecord[];
}
