import type {
  ActionLogger,
  Connection,
  JSONForm,
} from "@prismatic-io/spectral";
export type JsonFormSchema = JSONForm["schema"];
export type JsonFormUiSchema = JSONForm["uiSchema"];
export interface JsonFormSchemaNode {
  type?: string;
  title?: string;
  description?: string;
  default?: unknown;
  readOnly?: boolean;
  additionalProperties?: boolean;
  required?: string[];
  items?: JsonFormSchemaNode;
  properties?: Record<string, JsonFormSchemaNode>;
  oneOf?: {
    const: string;
    title: string;
  }[];
}
export interface JsonFormUiSchemaNode {
  type: string;
  label?: string;
  scope?: string;
  text?: string;
  options?: Record<string, unknown>;
  elements?: JsonFormUiSchemaNode[];
}
export interface ArenaPossibleValueVo {
  value?: string | number | boolean;
  name?: string;
  guid?: string;
  description?: string;
}
export type ArenaPossibleValue = string | ArenaPossibleValueVo;
export interface CategoryMinimalVo {
  guid: string;
  name?: string;
}
export interface ChangeCompactVo {
  guid: string;
  number?: string;
  title?: string;
  category?: CategoryMinimalVo;
  creationDateTime?: string;
  creator?: UserCompactVo;
  effectiveDateTime?: string;
  expirationDateTime?: string;
  implementationStatus?: string;
  lifecycleStatus?: {
    type?: string;
    name?: string;
  };
}
export interface ChangCompactVoResultRep {
  results: ChangeCompactVo[];
  count: number;
}
export interface SingleGuidVo {
  guid: string;
}
export interface UrlVo {
  api: string;
  app: string;
}
export interface AdditionalAttributeCreateVo {
  guid: string;
  value: unknown;
}
export interface CreateNumberFormatVo {
  guid?: string;
  fields?: {
    guid: string;
    value: string;
  }[];
}
export interface OwnerCreateVo {
  fullName: string;
}
export interface ItemCreateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: SingleGuidVo;
  numberFormat?: CreateNumberFormatVo;
  shared?: boolean;
  revisionNumber?: string;
  name?: string;
  description?: string;
  productionCost?: number;
  prototypeCost?: number;
  targetPrice?: number;
  targetCost?: number;
  standardCost?: number;
  offTheShelf?: boolean;
  owner?: OwnerCreateVo;
  uom?: string;
}
export interface ItemUpdateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: SingleGuidVo;
  numberFormat?: CreateNumberFormatVo;
  shared?: boolean;
  revisionNumber?: string;
  name?: string;
  description?: string;
  targetPrice?: number;
  targetCost?: number;
  standardCost?: number;
  offTheShelf?: boolean;
  owner?: OwnerCreateVo;
  uom?: string;
}
export interface ItemFullVoResultRep {
  results: ItemFullVo[];
  count: number;
}
export interface ItemFullVo {
  guid: string;
  url: UrlVo;
  number: string;
  name: string;
  description?: string;
  revisionNumber: string;
  lifecyclePhase?: {
    guid: string;
    name: string;
    stage: string;
  };
  category?: {
    guid: string;
    name: string;
    path: string;
  };
  owner?: {
    guid: string;
    fullName: string;
    email: string;
  };
  creator?: {
    guid: string;
    fullName: string;
    email: string;
  };
  creationDateTime: string;
  modifiedDateTime: string;
  shared: boolean;
  offTheShelf: boolean;
  productionCost?: number;
  prototypeCost?: number;
  targetPrice?: number;
  targetCost?: number;
  standardCost?: number;
  uom?: string;
  additionalAttributes?: {
    guid: string;
    name: string;
    value: string;
    type: string;
  }[];
}
export interface ChangeCreateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: SingleGuidVo;
  numberSequencePrefix?: {
    value: string;
  };
  title?: string;
  description?: string;
  routings?: SingleGuidVo[];
  approvalDeadlineDateTime?: string;
  enforceApprovalDeadline?: boolean;
  effectivityType?: string;
  expirationDateTime?: string;
  effectivityPlannedDateTime?: string;
  supplierVisibility?: boolean;
}
export interface ChangeUpdateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: SingleGuidVo;
  title?: string;
  description?: string;
  approvalDeadlineDateTime?: string;
  enforceApprovalDeadline?: boolean;
  effectivityType?: string;
  expirationDateTime?: string;
  effectivityPlannedDateTime?: string;
  implementationStatus?: string;
  supplierVisibility?: boolean;
}
export interface CategoryCompactVo {
  guid: string;
  name: string;
  path: string;
}
export interface UserCompactVo {
  guid: string;
  fullName: string;
  email: string;
}
export type ChangeLifecycleStatusType =
  | "OPEN"
  | "SUBMITTED_FOR_APPROVAL"
  | "SUBMITTED"
  | "APPROVED"
  | "EFFECTIVE"
  | "EXPIRED"
  | "REJECTED"
  | "OPEN_AND_UNLOCKED"
  | "OPEN_AND_LOCKED"
  | "SUBMITTED_FOR_ROUTING"
  | "CANCELED"
  | "COMPLETED";
export interface ChangeLifecycleStatus {
  type: ChangeLifecycleStatusType;
}
export interface AdditionalAttributeCompactVo {
  guid: string;
  name: string;
  value: unknown;
  apiName: string;
  fieldType:
    | "SINGLE_LINE_TEXT"
    | "MULTI_LINE_TEXT"
    | "DROP_DOWN"
    | "FIXED_DROP_DOWN"
    | "DATE"
    | "NUMBER"
    | "BOOLEAN"
    | "INTEGER"
    | "OBJECT"
    | "POSITIVE_DOUBLE"
    | "POSITIVE_INTEGER"
    | "RICH_TEXT"
    | "GUID"
    | "DATETIME"
    | "COST"
    | "LIST"
    | "ENUM";
  multiSelect: boolean;
}
export interface ChangeFullVo {
  guid: string;
  url: UrlVo;
  number: string;
  title: string;
  description?: string;
  lifecycleStatus?: ChangeLifecycleStatus;
  lifecycleDateTime?: string;
  category?: CategoryCompactVo;
  creator?: UserCompactVo;
  submitter?: UserCompactVo;
  creationDateTime: string;
  submissionDateTime?: string;
  effectiveDateTime?: string;
  effectivityType?:
    | "PERMANENT_ON_APPROVAL"
    | "PERMANENT_ON_DATE"
    | "TEMPORARY"
    | "PERMANENT"
    | "IMMEDIATE";
  effectivityPlannedDateTime?: string;
  expirationDateTime?: string;
  approvalDeadlineDateTime?: string;
  enforceApprovalDeadline?: boolean;
  canceledDateTime?: string;
  withdrawnDateTime?: string;
  implementationStatus?:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "NEEDS_ATTENTION"
    | "DONE"
    | "BLANK"
    | "CANCELED";
  implementationStatusDateTime?: string;
  implementationStatusEditor?: UserCompactVo;
  deviated?: boolean;
  routingAdmins?: UserCompactVo[];
  routings?: ChangeRoutingMinimalVo[];
  additionalAttributes?: AdditionalAttributeCompactVo[];
}
export interface ErrorResponse {
  errors: {
    code: string;
    message: string;
    field?: string;
  }[];
}
export interface UserCompactVoResultRep {
  results: UserCompactVo[];
  count: number;
}
export interface ChangeRoutingMinimalVo {
  guid: string;
  name: string;
  description?: string;
}
export interface ChangeRoutingMiniResultRep {
  results: ChangeRoutingMinimalVo[];
  count: number;
}
export type ArenaItemCostFields =
  | "productionCost"
  | "prototypeCost"
  | "targetPrice"
  | "targetCost"
  | "standardCost";
export interface ArenaItemCosts {
  productionCost?: number;
  prototypeCost?: number;
  targetPrice?: number;
  targetCost?: number;
  standardCost?: number;
}
export interface NumberFormatPrefixVo {
  guid: string;
  value: string;
}
export interface ParentCategoryVo {
  guid: string;
  name: string;
}
export interface ChangeCategoryVo {
  activated: boolean;
  allowDuplicateRevisions: boolean;
  allowManualRevisionEntry: boolean;
  assignable: boolean;
  creationDateTime: string;
  creator: UserCompactVo;
  description?: string;
  effectivityType:
    | "PERMANENT_ON_APPROVAL"
    | "PERMANENT_ON_DATE"
    | "TEMPORARY"
    | "PERMANENT"
    | "IMMEDIATE";
  enforceDefaultEffectivityType: boolean;
  enforceDefaultNumberSequence: boolean;
  guid: string;
  initialImplementationStatus:
    | "NOT_STARTED"
    | "IN_PROGRESS"
    | "NEEDS_ATTENTION"
    | "DONE"
    | "BLANK"
    | "CANCELED";
  level: number;
  name: string;
  numberingSequencePrefixDefault?: NumberFormatPrefixVo;
  parentCategory?: ParentCategoryVo;
  path: string;
  structural: boolean;
  systemDefined: boolean;
}
export interface ChangeCategoryResultRep {
  results: ChangeCategoryVo[];
  count: number;
}
export interface CategoryFullResultRep {
  results: CategoryVo[];
  count: number;
}
export interface RequestCategoryResultRep {
  results: RequestCategoryVo[];
  count: number;
}
export type CategoryResponse =
  | ChangeCategoryResultRep
  | CategoryFullResultRep
  | RequestCategoryResultRep;
export interface CategoryVo {
  activated: boolean;
  assignable: boolean;
  creationDateTime: string;
  creator?: UserCompactVo;
  description?: string;
  guid: string;
  level: number;
  name: string;
  numberFormat?: {
    guid: string;
    fields?: {
      guid: string;
      value: string;
    }[];
  };
  parentCategory?: {
    guid: string;
    name?: string;
  };
  path: string;
  requirements?: {
    guid: string;
    name?: string;
  }[];
  structural: boolean;
  systemDefined: boolean;
}
export interface RequestCategoryVo {
  activated: boolean;
  assignable: boolean;
  creationDateTime: string;
  creator?: UserCompactVo;
  description?: string;
  guid: string;
  level: number;
  name: string;
  parentCategory?: {
    guid: string;
    name?: string;
  };
  path: string;
  structural: boolean;
  systemDefined: boolean;
}
export interface CategoryAttributeDefinitionResultRep {
  count: number;
  results: CategoryAttributeDefinitionVo[];
}
export interface NumberSequencePrefixCompactResultRep {
  results: NumberFormatPrefixVo[];
  count: number;
}
export interface CategoryAttributeDefinitionVo {
  guid: string;
  active: boolean;
  apiName: string;
  name: string;
  fieldType:
    | "SINGLE_LINE_TEXT"
    | "MULTI_LINE_TEXT"
    | "DROP_DOWN"
    | "FIXED_DROP_DOWN"
    | "DATE"
    | "NUMBER"
    | "BOOLEAN"
    | "INTEGER"
    | "OBJECT"
    | "POSITIVE_DOUBLE"
    | "POSITIVE_INTEGER"
    | "RICH_TEXT"
    | "GUID"
    | "DATETIME"
    | "COST"
    | "LIST"
    | "ENUM";
  required: boolean;
  editable: boolean;
  custom: boolean;
  description?: string;
  defaultValue?: unknown;
  maxLength?: number;
  maxValue?: number;
  minValue?: number;
  decimalPlaces?: number;
  currency?: string;
  possibleValues?: ArenaPossibleValue[];
  multiSelect?: boolean;
  maxSelections?: number;
}
export interface NumberFormatBasicInfoVo {
  active: boolean;
  creationDateTime: string;
  exampleNumber: string;
  guid: string;
  name: string;
}
export interface NumberFormatFullVo {
  active: boolean;
  creationDateTime: string;
  exampleNumber: string;
  guid: string;
  name: string;
  fields: NumberFormatFieldFullVo[];
}
export interface NumberFormatPossibleValueVo {
  value: string;
  description: string;
}
export interface PreDefinedCodeListVo {
  guid: string;
  name: string;
}
export interface NumberFormatFieldFullVo {
  apiName: string;
  guid: string;
  maxLength?: number;
  maxSeqLength?: number;
  name: string;
  order: number;
  possibleValues?: NumberFormatPossibleValueVo[];
  preDefinedCodeList?: PreDefinedCodeListVo;
  type: "FREE_TEXT" | "DELIMITER" | "VALUE_LIST" | "AUTO_SEQUENCE";
  value?: string;
  zeroPadding?: boolean;
}
export interface NumberFormatCompactResultRep {
  results: NumberFormatBasicInfoVo[];
  count: number;
}
export interface FileAuthorVo {
  fullName?: string;
}
export interface FileCategoryVo {
  guid?: string;
  name?: string;
}
export interface Microsoft365Vo {
  authorEmail?: string;
  creationDate?: string;
  driveId?: string;
  fileId?: string;
  fileName?: string;
  lastEditors?: string[];
  modifiedDate?: string;
  originalAuthor?: string;
  siteId?: string;
  size?: number;
  version?: string;
  webUrl?: string;
}
export interface GoogleDocsVo {
  authorEmail?: string;
  creationDate?: string;
  driveId?: string;
  fileId?: string;
  fileName?: string;
  lastEditors?: string[];
  modifiedDate?: string;
  originalAuthor?: string;
  size?: number;
  version?: string;
  webUrl?: string;
}
export interface FileDetailVo {
  author?: FileAuthorVo;
  category?: FileCategoryVo;
  checkedOut?: boolean;
  corrected?: boolean;
  creationDateTime?: string;
  description?: string;
  edition?: string;
  format?: string;
  guid?: string;
  hasMarkup?: boolean;
  haveContent?: boolean;
  lastModifiedDateTime?: string;
  latest?: boolean;
  location?: string;
  locked?: boolean;
  microsoft365?: Microsoft365Vo;
  googleDocs?: GoogleDocsVo;
  mimeType?: string;
  name?: string;
  number?: string;
  size?: number;
  storageMethodName?: string;
  title?: string;
  private?: boolean;
}
export interface SupplierFileCreateVo {
  file?: File | string;
  "file.author.fullName"?: string;
  "file.category.guid"?: string;
  "file.edition"?: string;
  "file.format"?: string;
  "file.private"?: boolean;
  "file.storageMethodName"?: string;
  "file.title"?: string;
  "file.description"?: string;
  latestEditionAssociation?: boolean;
  primary?: boolean;
}
export interface SingleValueVo {
  guid?: string;
  value?: string;
}
export interface ChangeLifecycleTransitionCreateVo {
  change: SingleGuidVo;
  comment?: string;
  administrators?: SingleGuidVo[];
  adminNeedConfig?: boolean;
  fromStatus?: ChangeLifecycleStatusType;
  status: ChangeLifecycleStatusType;
  implementationStatus?: SingleValueVo;
}
export interface ChangeImplementationStatusVo {
  guid: string;
  value: string;
}
export interface ChangeMinimalVo {
  guid: string;
  number: string;
  url: UrlVo;
}
export interface ChangeLifecycleTransitionFullVo {
  change: ChangeMinimalVo;
  implStatus?: ChangeImplementationStatusVo;
  status: ChangeLifecycleStatusType;
  comment?: string;
  administrators?: UserCompactVo[];
}
export interface AttributeDefinitionVo {
  guid: string;
  active: boolean;
  allowLowerCase?: boolean;
  allowNegatives?: boolean;
  allowUpperCase?: boolean;
  allowsExplicitNullValue?: boolean;
  creatable: boolean;
  custom: boolean;
  deleted?: boolean;
  deprecated?: boolean;
  editable: boolean;
  global?: boolean;
  apiName: string;
  costCalculation?: "ENTERED" | "ROLLUP" | "ROLLUP_AND_ENTERED";
  currency?:
    | "USD"
    | "EUR"
    | "GBP"
    | "YEN"
    | "AUD"
    | "CAD"
    | "CNY"
    | "INR"
    | "JPY"
    | "KRW"
    | "NZD"
    | "SEK"
    | "DKK"
    | "NOK";
  decimalPlaces?: number;
  defaultValue?: unknown;
  developerNotes?: string;
  description?: string;
  example?: string;
  excludedValues?: string[];
  fieldType:
    | "SINGLE_LINE_TEXT"
    | "MULTI_LINE_TEXT"
    | "DROP_DOWN"
    | "FIXED_DROP_DOWN"
    | "DATE"
    | "NUMBER"
    | "BOOLEAN"
    | "INTEGER"
    | "OBJECT"
    | "POSITIVE_DOUBLE"
    | "POSITIVE_INTEGER"
    | "RICH_TEXT"
    | "GUID"
    | "DATETIME"
    | "COST"
    | "LIST"
    | "ENUM";
  inViews?: string[];
  maskingValue?: unknown;
  maxLength?: number;
  maxSelections?: number;
  maxValue?: number;
  multiSelect?: boolean;
  name: string;
  possibleValues?: ArenaPossibleValue[];
  required: boolean;
  revisionControlled?: boolean;
  searchable?: boolean;
  visibleWhenBlank?: boolean;
  private?: boolean;
}
export interface AttributeDefinitionFullRepResultRep {
  results: AttributeDefinitionVo[];
  count: number;
}
export interface ItemShortVo {
  guid: string;
  name: string;
  number: string;
  revisionNumber: string;
  revisionStatus: string;
  url: UrlVo;
}
export interface ItemBomCreateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  refDes?: string;
  quantity?: number;
  notes?: string;
  lineNumber?: number;
  item: SingleGuidVo;
}
export interface ItemBomVo {
  guid: string;
  item: ItemShortVo;
  lineNumber?: number;
  notes?: string;
  quantity?: number;
  refDes?: string;
  additionalAttributes?: AdditionalAttributeCompactVo[];
}
export interface ItemBomUpdateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  refDes?: string;
  quantity?: number;
  notes?: string;
  lineNumber?: number;
}
export interface ItemBomWithSubstituteVo {
  guid: string;
  item: ItemShortVo;
  lineNumber?: number;
  notes?: string;
  quantity?: number;
  refDes?: string;
  substitutes?: BomSubstituteVo[];
  additionalAttributes?: AdditionalAttributeCompactVo[];
}
export interface ItemBomVoResultRep {
  results: ItemBomWithSubstituteVo[];
  count: number;
}
export interface BomSubstituteVo {
  guid: string;
  item: ItemShortVo;
  notes?: string;
  quantity?: number;
  rank?: number;
}
export interface BomSubstituteCreateVo {
  item: SingleGuidVo;
  notes?: string;
  quantity?: number;
  rank?: number;
}
export interface BomSubstituteUpdateVo {
  notes?: string;
  quantity?: number;
  rank?: number;
}
export interface BomSubstituteVoResultRep {
  results: BomSubstituteVo[];
  count: number;
}
export interface BomSettingVo {
  automaticallyGenerateLineNumbers?: boolean;
  checkReferenceDesignators?: boolean;
}
export interface FileAssociationVo {
  guid: string;
  file: FileDetailVo;
}
export interface FileAssociationCreateVo {
  file: SingleGuidVo;
}
export interface FileAssociationVoResultRep {
  results: FileAssociationVo[];
  count: number;
}
export interface ItemFileVo {
  guid: string;
  file: FileDetailVo;
  latestEditionAssociation?: boolean;
  primary?: boolean;
}
export interface ItemFileCreateVo {
  file: SingleGuidVo;
  latestEditionAssociation?: boolean;
  primary?: boolean;
}
export interface ItemFileUpdateVo {
  latestEditionAssociation?: boolean;
  primary?: boolean;
}
export interface ItemFileVoResultRep {
  results: ItemFileVo[];
  count: number;
}
export interface ItemGuidAndUrlVo {
  guid: string;
  url?: UrlVo;
}
export interface LifecycleChangeVo {
  item: SingleGuidVo;
  proceedOnNotice?: boolean;
  toLifecyclePhase: SingleGuidVo;
  notes?: string;
  revisionNumber?: string;
  retrainingRequired?: boolean;
}
export interface ItemLifecycleChangeResponseVo {
  effectiveRevItem?: ItemGuidAndUrlVo;
  supersededRevItem?: ItemGuidAndUrlVo;
  workingRevItem?: ItemGuidAndUrlVo;
}
export interface NumberSequenceCompactVo {
  guid: string;
  name?: string;
  active?: boolean;
  description?: string;
  prefix?: string;
  nextNumber?: number;
}
export interface NumberSequenceResultRep {
  results: NumberSequenceCompactVo[];
  count: number;
}
export interface RequestEvaluatorGroupShortVo {
  guid: string;
  name?: string;
  description?: string;
}
export interface RequestEvaluatorGroupShortResultRep {
  results: RequestEvaluatorGroupShortVo[];
  count: number;
}
export interface EvaluatorGroupCompactVo {
  guid: string;
  name?: string;
  description?: string;
  evaluators?: UserCompactVo[];
}
export interface SupplierCompactVo {
  guid: string;
  name?: string;
}
export interface SupplierItemCreateVo {
  number?: string;
  name?: string;
  type?: string;
  supplier?: SingleGuidVo;
  additionalAttributes?: AdditionalAttributeCreateVo[];
  description?: string;
  uom?: string;
  offTheShelf?: boolean;
  procurementType?: string;
}
export interface SupplierItemUpdateVo {
  number?: string;
  name?: string;
  type?: string;
  description?: string;
  uom?: string;
  offTheShelf?: boolean;
  procurementType?: string;
  additionalAttributes?: AdditionalAttributeCreateVo[];
}
export interface SupplierItemFullVo {
  creationDateTime?: string;
  number?: string;
  creator?: UserCompactVo;
  description?: string;
  guid?: string;
  name?: string;
  uom?: string;
  offTheShelf?: boolean;
  type?: string;
  procurementType?: "OTS" | "MTS";
  additionalAttributes?: AdditionalAttributeCompactVo[];
  supplier?: SupplierCompactVo;
}
export interface QueryResultRepSupplierItemFullVo {
  results: SupplierItemFullVo[];
  count: number;
}
export interface SupplierItemFileVo {
  guid?: string;
  name?: string;
  title?: string;
  description?: string;
  size?: number;
  mimeType?: string;
  storageMethod?: number;
  storageMethodName?: string;
  primary?: boolean;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
}
export interface SupplierItemFileVoResultRep {
  results: SupplierItemFileVo[];
  count: number;
}
export interface SupplierItemComplianceVo {
  guid?: string;
  requirement?: {
    guid?: string;
    name?: string;
  };
  status?: string;
  notes?: string;
}
export interface SupplierItemComplianceVoResultRep {
  results: SupplierItemComplianceVo[];
  count: number;
}
export interface OutboundEventIntegrationVo {
  guid: string;
  name: string;
  enabled: boolean;
  status: string;
  creationDateTime: string;
  lastModifiedDateTime: string;
  creator?: UserCompactVo;
  modifyUser?: UserCompactVo;
}
export interface IntegrationShortRep {
  guid: string;
  name?: string;
  enabled?: boolean;
  status?: string;
  type?: string;
  transferType?: string;
}
export interface IntegrationShortRepResult {
  results: IntegrationShortRep[];
  count: number;
}
export interface OutboundEventIntegrationVoResultRep {
  results: OutboundEventIntegrationVo[];
  count: number;
}
export interface SupplierApprovalStatusFullVo {
  guid: string;
  name?: string;
  type?: string;
  description?: string;
  used?: boolean;
  active?: boolean;
  custom?: boolean;
  color?: string;
}
export interface SupplierApprovalStatusResultRep {
  results: SupplierApprovalStatusFullVo[];
  count: number;
}
export interface SupplierFullVo {
  guid: string;
  name?: string;
  supplierId?: string;
  url?: UrlVo;
  additionalAttributes?: AdditionalAttributeCreateVo[];
  creationDateTime?: string;
  modificationDateTime?: string;
  creator?: UserCompactVo;
  modifyUser?: UserCompactVo;
}
export interface PhoneNumberVo {
  label?: string;
  number?: string;
  extension?: string;
  comment?: string;
  guid?: string;
}
export interface SupplierPhoneNumberVo {
  label?: string;
  number?: string;
  extension?: string;
  comment?: string;
  guid?: string;
}
export interface SupplierPhoneNumberCreateVo {
  label?: string;
  number?: string;
  extension?: string;
  comment?: string;
}
export interface SupplierPhoneNumberVoResultRep {
  results?: SupplierPhoneNumberVo[];
  count?: number;
}
export interface AddressVo {
  label?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  guid?: string;
}
export interface AddressCreateVo {
  label?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}
export interface SupplierAddressCompactVo {
  primary?: boolean;
  address?: AddressVo;
}
export interface SupplierAddressCreateVo {
  primary?: boolean;
  address?: AddressCreateVo;
}
export interface SupplierAddressCompactVoResultRep {
  results?: SupplierAddressCompactVo[];
  count?: number;
}
export interface QualityProcessCompactVo {
  guid?: string;
  number?: string;
  name?: string;
  status?: string;
}
export interface QualityAssociationVo {
  guid?: string;
  qualityProcess?: QualityProcessCompactVo;
  associationType?: string;
}
export interface ChangeQualityAssociationVoResultRep {
  results?: QualityAssociationVo[];
  count?: number;
}
export interface SupplierCreateRequestVo {
  accountNumber?: string;
  additionalAttributes?: AdditionalAttributeCreateVo[];
  addresses?: SupplierAddressCompactVo[];
  approvalStatusSetting?: SingleGuidVo;
  description?: string;
  name?: string;
  phoneNumbers?: PhoneNumberVo[];
  website?: string;
  supplierId?: string;
}
export interface SupplierUpdateRequestVo {
  accountNumber?: string;
  additionalAttributes?: AdditionalAttributeCreateVo[];
  addresses?: SupplierAddressCompactVo[];
  approvalStatusSetting?: SingleGuidVo;
  description?: string;
  name?: string;
  phoneNumbers?: PhoneNumberVo[];
  website?: string;
  supplierId?: string;
}
export interface QueryResultRepSupplierFullVo {
  results?: SupplierFullVo[];
  count?: number;
}
export interface FileFullVo {
  category?: FileCategoryVo;
  checkedOut?: boolean;
  corrected?: boolean;
  creationDateTime?: string;
  edition?: string;
  format?: string;
  guid?: string;
  name?: string;
  number?: string;
  storageMethodName?: string;
  title?: string;
}
export interface FileFullVoResultRep {
  results: FileFullVo[];
  count: number;
}
export interface TrainingShortVo {
  guid?: string;
  number?: string;
  name?: string;
  description?: string;
  daysToComplete?: number;
  creationDateTime?: string;
  creator?: UserCompactVo;
  manager?: UserCompactVo;
  status?: string;
  statusName?: string;
}
export interface TrainingShortVoResultRep {
  results: TrainingShortVo[];
  count: number;
}
export interface TrainingUserVo {
  guid?: string;
  fullName?: string;
  email?: string;
  status?: string;
  statusName?: string;
  assignmentDateTime?: string;
  completionDateTime?: string;
  dueDateTime?: string;
}
export interface TrainingUserVoResultRep {
  results: TrainingUserVo[];
  count: number;
}
export interface TrainingUserCreateVo {
  user: {
    guid: string;
  };
  dueDate?: string;
}
export interface TrainingRecordVo {
  guid?: string;
  user?: UserCompactVo;
  completionDateTime?: string;
  status?: string;
  statusName?: string;
  notes?: string;
}
export interface TrainingRecordVoResultRep {
  results: TrainingRecordVo[];
  count: number;
}
export interface TrainingStatusChangeVo {
  trainingplan: {
    guid: string;
  };
  status: string;
  comment?: string;
}
export interface TrainingUpdateVo {
  name?: string;
  description?: string;
  daysToComplete?: number;
  manager?: {
    guid: string;
  };
  additionalAttributes?: AdditionalAttributeCreateVo[];
}
export interface TrainingQualityAssociationVo {
  guid?: string;
  training?: TrainingShortVo;
  qualityProcess?: {
    guid?: string;
    number?: string;
    name?: string;
  };
}
export interface TrainingItemAssociationVo {
  guid?: string;
  training?: TrainingShortVo;
  item?: {
    guid?: string;
    number?: string;
    name?: string;
  };
}
export interface TrainingFileAssociationVo {
  guid?: string;
  training?: TrainingShortVo;
  file?: {
    guid?: string;
    number?: string;
    name?: string;
    title?: string;
  };
}
export interface ItemSourcingCreateVo {
  amlRank?: number;
  approved?: boolean;
  makeItem?: boolean;
  mfrItem?: {
    guid: string;
  };
  notes?: string;
  vendorItem?: {
    guid: string;
  };
  vendorItemConversionFactor?: number;
}
export interface ItemSourcingUpdateVo {
  amlRank?: number;
  amlSplit?: number;
  approved?: boolean;
  mfrItem?: {
    guid: string;
  };
  notes?: string;
  vendorItem?: {
    guid: string;
  };
  vendorItemConversionFactor?: number;
}
export interface TrainingItemCreateVo {
  item: {
    guid: string;
  };
}
export interface TrainingFileCreateVo {
  file: {
    guid: string;
  };
  latestEditionAssociation?: boolean;
}
export interface TrainingQualityCreateVo {
  quality: {
    guid: string;
    step?: {
      guid: string;
    };
  };
}
export interface RequirementUserVo {
  email: string;
  fullName: string;
  guid: string;
}
export interface RequirementStatusVo {
  guid: string;
  value: string;
  code: string;
}
export interface RequirementTemplateRefVo {
  guid: string;
  name: string;
}
export interface RequirementFullVo {
  assignee: RequirementUserVo;
  creationDateTime: string;
  creator: RequirementUserVo;
  modifier: RequirementUserVo;
  modificationDateTime: string;
  description: string;
  guid: string;
  title: string;
  number: string;
  priority: string;
  status: RequirementStatusVo;
  template: RequirementTemplateRefVo;
  additionalAttributes: AdditionalAttributeCreateVo[];
}
export interface RequirementCreateVo {
  template?: {
    guid: string;
  };
  number?: string;
  title?: string;
  description?: string;
  assignee?: {
    guid: string;
  };
  priority?: string;
  numberSequencePrefix?: {
    value: string;
  };
  additionalAttributes?: AdditionalAttributeCreateVo[];
}
export interface RequirementUpdateVo {
  title?: string;
  description?: string;
  assignee?: {
    guid: string;
  };
  priority?: string;
  additionalAttributes?: AdditionalAttributeCreateVo[];
}
export interface RequirementTraceVo {
  guid: string;
  level: number;
  relationshipType: {
    guid: string;
    upstreamLabel: string;
    downstreamLabel: string;
  };
  suspected: boolean;
  objectType: string;
  requirement?: RequirementFullVo;
  item?: {
    guid: string;
    name: string;
    number: string;
    revisionNumber: string;
    revisionStatus: string;
    url: string;
  };
}
export interface RequirementTraceCreateVo {
  direction: string;
  relationshipType?: {
    guid: string;
  };
  objectType?: string;
  item?: {
    guid: string;
  };
  requirement?: {
    guid: string;
  };
}
export interface RequirementTraceUpdateVo {
  relationshipType?: {
    guid: string;
  };
  suspected?: boolean;
}
export interface RequirementTemplateVo {
  active: boolean;
  allowUserDefinedNumber: boolean;
  creationDateTime: string;
  creator: RequirementUserVo;
  defaultAssignee: RequirementUserVo;
  defaultNumberSequence: {
    guid: string;
    name: string;
    prefixes: string[];
  };
  defaultTemplate: boolean;
  description: string;
  guid: string;
  name: string;
  numberSequences: {
    guid: string;
    name: string;
    prefixes: string[];
  }[];
}
export interface RequirementRelationshipTypeVo {
  guid: string;
  upstreamLabel: string;
  downstreamLabel: string;
  description: string;
}
export interface RequirementFileAssocVo {
  guid: string;
  file: Record<string, unknown>;
}
export interface RequirementQualityAssocVo {
  guid: string;
  quality: {
    guid: string;
    number?: string;
    step?: {
      guid: string;
      name: string;
    };
  };
}
export interface RequirementTicketAssocVo {
  guid: string;
  ticket: {
    guid: string;
    number: string;
  };
}
export interface TicketUpdateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  title?: string;
  description?: string;
  fixVersion?: string;
  foundOn?: string;
  assignee?: {
    guid: string;
  };
  priority?: string;
}
export interface TicketItemCreateVo {
  item: {
    guid: string;
  };
  latestRevisionAssociation?: boolean;
}
export interface TicketCreateVo {
  template?: SingleGuidVo;
  title?: string;
  number?: string;
  numberSequencePrefix?: {
    value: string;
  };
  additionalAttributes?: AdditionalAttributeCreateVo[];
}
export interface TicketTransitionCreateVo {
  ticket: SingleGuidVo;
  status: string;
}
export interface ImplementationTaskAssigneeVo {
  user?: SingleGuidVo;
  userGroup?: SingleGuidVo;
}
export interface ChangeImplementationTaskCreateVo {
  name: string;
  assignee?: ImplementationTaskAssigneeVo;
  dueDate?: string;
}
export interface ChangeImplementationTaskUpdateVo {
  name?: string;
  assignee?: ImplementationTaskAssigneeVo;
  dueDate?: string;
  status?: string;
}
export interface ChangeImplementationTaskNoteUpdateVo {
  note?: string;
  label?: string;
  private?: boolean;
}
export interface ChangeItemAssociationViewVo {
  includedInThisChange?: boolean;
  notes?: string;
}
export interface ApproverDecisionRequestVo {
  decisionType: string;
  user?: SingleGuidVo;
  group?: SingleGuidVo;
}
export interface QualityProcessTemplateRefVo {
  guid: string;
  numberFormat?: {
    prefix: SingleGuidVo;
  };
}
export interface QualityProcessCreateVo {
  name?: string;
  description?: string;
  targetCompletionDateTime?: string;
  type?: string;
  owner?: SingleGuidVo;
  template?: QualityProcessTemplateRefVo;
}
export interface QualityStepAffectedQualityCreateVo {
  guid?: string;
  affected: {
    step: SingleGuidVo;
  };
}
export interface QualityStepAffectedUrlCreateVo {
  guid?: string;
  affected: {
    link: string;
    display?: string;
    description?: string;
  };
}
export interface SignOffStepDecisionVo {
  decision: string;
  comments?: string;
}
export interface RequestIssueResponseCreateVo {
  response: string;
}
export interface RequestItemCreateVo {
  item: {
    guid: string;
  };
  notes?: string;
}
export interface RequestIssueChangeStatusVo {
  guid: string;
  status: "OPEN" | "CLOSED";
  response?: string;
}
export interface RequestTransitionCreateVo {
  request: {
    guid: string;
  };
  comment?: string;
  fromStatus?: "UNSUBMITTED" | "SUBMITTED" | "PROMOTED" | "CLOSED" | "DEFERRED";
  status: "UNSUBMITTED" | "SUBMITTED" | "PROMOTED" | "CLOSED" | "DEFERRED";
  resolutionNotes?: string;
  deferralCode?: string;
  resolutionCode?: string;
  deferDeadlineDateTime?: string;
}
export interface RequestCreateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: {
    guid: string;
  };
  numberSequencePrefix?: {
    value: string;
  };
  title?: string;
  problem?: string;
  requestedAction?: string;
  evaluatorGroup?: {
    guid: string;
  };
  requestCode?: string;
  creatorParticipation?: boolean;
  supplierVisibility?: boolean;
}
export interface RequestIssueCreateVo {
  issue: string;
  supplierVisibility?: boolean;
}
export interface RequestMarkupCreateVo {
  markup: {
    guid: string;
  };
}
export interface RequestUpdateVo {
  additionalAttributes?: AdditionalAttributeCreateVo[];
  category?: {
    guid: string;
  };
  numberSequencePrefix?: {
    value: string;
  };
  title?: string;
  problem?: string;
  requestedAction?: string;
  requestCode?: string;
  supplierVisibility?: boolean;
}
export interface LoginResponse {
  arena_session_id?: string;
  arenaSessionId?: string;
  workspaceId: number;
  workspaceName: string;
  workspaceRequestLimit: number;
  reason?: string;
  note?: string;
}
export interface LoginRequest {
  email: string;
  password: string;
  workspaceId?: number;
}
export interface ArenaAttribute {
  guid: string;
  name: string;
  apiName: string;
  fieldType: string;
  description?: string;
  required?: boolean;
  custom?: boolean;
  possibleValues?: ArenaPossibleValue[];
  [key: string]: unknown;
}
export interface ArenaAttributeResponse {
  results: ArenaAttribute[];
  count: number;
}
export interface ArenaAttributeOption {
  title: string;
  const: string;
}
export interface ArenaAttributeMetadata {
  name: string;
  apiName: string;
  fieldType: string;
  description?: string;
  required: boolean;
  custom: boolean;
}
export interface ExportDefinitionSummary {
  guid?: string;
  number?: number;
  name?: string;
}
export interface ExportDefinitionResult {
  results?: ExportDefinitionSummary[];
  count?: number;
}
export type ResourceType = "ITEM" | "CHANGE" | "QUALITY" | "REQUEST";
export type MessageFieldPropertyKey =
  | "itemMessageFields"
  | "changeMessageFields"
  | "qualityMessageFields"
  | "requestMessageFields";
export type ArenaAuthContext = {
  logger: ActionLogger;
  executionState?: Record<string, unknown>;
};
export interface PersistedArenaAuth {
  credential: string;
}
export interface ArenaAuthStrategy {
  label: string;
  renewable: boolean;
  getCredential: (
    context: ArenaAuthContext,
    connection: Connection,
  ) => Promise<string>;
  buildHeaders: (credential: string) => Record<string, string>;
}
export interface ArenaListResponse<T> {
  results: T[];
  count: number;
}
export interface PollingCursor extends Record<string, unknown> {
  windowStart: string;
  windowEnd: string;
  offset: number;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  cursor?: PollingCursor;
}
export interface ArenaRecord {
  guid: string;
  creationDateTime?: string;
  eventType?: string;
  status?: string;
  [key: string]: unknown;
}
export interface ArenaChangesObject {
  createdRecords?: ArenaRecord[];
}
export interface ArenaRecordChange {
  changeType: "created";
  record: ArenaRecord;
}
