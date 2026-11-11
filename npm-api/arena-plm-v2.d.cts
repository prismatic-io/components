//#endregion
//#region src/actions/bom/createBomLine.d.ts
declare const createBomLine: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  refDes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  quantity: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    default: string;
    clean: (value: unknown) => number;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/createBomSubstitute.d.ts
declare const createBomSubstitute: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  quantity: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    default: string;
    clean: (value: unknown) => number;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  rank: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/deleteBomLine.d.ts
declare const deleteBomLine: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/bom/deleteBomSubstitute.d.ts
declare const deleteBomSubstitute: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  substituteGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/bom/listBom.d.ts
declare const listBom: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/getBomLine.d.ts
declare const getBomLine: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  includeBomSubstitutes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/getBomSettings.d.ts
declare const getBomSettings: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/getBomSubstitute.d.ts
declare const getBomSubstitute: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  substituteGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/listBomSubstitutes.d.ts
declare const listBomSubstitutes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/updateBomLine.d.ts
declare const updateBomLine: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  refDes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  quantity: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    default: string;
    clean: (value: unknown) => number;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  setNull: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/updateBomSettings.d.ts
declare const updateBomSettings: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  automaticallyGenerateLineNumbers: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  checkReferenceDesignators: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/bom/updateBomSubstitute.d.ts
declare const updateBomSubstitute: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  bomLineGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  substituteGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  quantity: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    default: string;
    clean: (value: unknown) => number;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  rank: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/categories/listBomAttributes.d.ts
declare const listBomAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/types/index.d.ts
interface CategoryMinimalVo {
  guid: string;
  name?: string;
}
interface ChangeCompactVo {
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
interface UrlVo {
  api: string;
  app: string;
}
interface AdditionalAttributeCreateVo {
  guid: string;
  value: unknown;
}
interface ItemFullVo {
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
interface CategoryCompactVo {
  guid: string;
  name: string;
  path: string;
}
interface UserCompactVo {
  guid: string;
  fullName: string;
  email: string;
}
type ChangeLifecycleStatusType = "OPEN" | "SUBMITTED_FOR_APPROVAL" | "SUBMITTED" | "APPROVED" | "EFFECTIVE" | "EXPIRED" | "REJECTED" | "OPEN_AND_UNLOCKED" | "OPEN_AND_LOCKED" | "SUBMITTED_FOR_ROUTING" | "CANCELED" | "COMPLETED";
interface ChangeLifecycleStatus {
  type: ChangeLifecycleStatusType;
}
interface AdditionalAttributeCompactVo {
  guid: string;
  name: string;
  value: unknown;
  apiName: string;
  fieldType: "SINGLE_LINE_TEXT" | "MULTI_LINE_TEXT" | "DROP_DOWN" | "FIXED_DROP_DOWN" | "DATE" | "NUMBER" | "BOOLEAN" | "INTEGER" | "OBJECT" | "POSITIVE_DOUBLE" | "POSITIVE_INTEGER" | "RICH_TEXT" | "GUID" | "DATETIME" | "COST" | "LIST" | "ENUM";
  multiSelect: boolean;
}
interface ChangeFullVo {
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
  effectivityType?: "PERMANENT_ON_APPROVAL" | "PERMANENT_ON_DATE" | "TEMPORARY" | "PERMANENT" | "IMMEDIATE";
  effectivityPlannedDateTime?: string;
  expirationDateTime?: string;
  approvalDeadlineDateTime?: string;
  enforceApprovalDeadline?: boolean;
  canceledDateTime?: string;
  withdrawnDateTime?: string;
  implementationStatus?: "NOT_STARTED" | "IN_PROGRESS" | "NEEDS_ATTENTION" | "DONE" | "BLANK" | "CANCELED";
  implementationStatusDateTime?: string;
  implementationStatusEditor?: UserCompactVo;
  deviated?: boolean;
  routingAdmins?: UserCompactVo[];
  routings?: ChangeRoutingMinimalVo[];
  additionalAttributes?: AdditionalAttributeCompactVo[];
}
interface UserCompactVoResultRep {
  results: UserCompactVo[];
  count: number;
}
interface ChangeRoutingMinimalVo {
  guid: string;
  name: string;
  description?: string;
}
interface NumberFormatPrefixVo {
  guid: string;
  value: string;
}
interface ParentCategoryVo {
  guid: string;
  name: string;
}
interface ChangeCategoryVo {
  activated: boolean;
  allowDuplicateRevisions: boolean;
  allowManualRevisionEntry: boolean;
  assignable: boolean;
  creationDateTime: string;
  creator: UserCompactVo;
  description?: string;
  effectivityType: "PERMANENT_ON_APPROVAL" | "PERMANENT_ON_DATE" | "TEMPORARY" | "PERMANENT" | "IMMEDIATE";
  enforceDefaultEffectivityType: boolean;
  enforceDefaultNumberSequence: boolean;
  guid: string;
  initialImplementationStatus: "NOT_STARTED" | "IN_PROGRESS" | "NEEDS_ATTENTION" | "DONE" | "BLANK" | "CANCELED";
  level: number;
  name: string;
  numberingSequencePrefixDefault?: NumberFormatPrefixVo;
  parentCategory?: ParentCategoryVo;
  path: string;
  structural: boolean;
  systemDefined: boolean;
}
interface ChangeCategoryResultRep {
  results: ChangeCategoryVo[];
  count: number;
}
interface CategoryFullResultRep {
  results: CategoryVo[];
  count: number;
}
interface RequestCategoryResultRep {
  results: RequestCategoryVo[];
  count: number;
}
type CategoryResponse = ChangeCategoryResultRep | CategoryFullResultRep | RequestCategoryResultRep;
interface CategoryVo {
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
interface RequestCategoryVo {
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
interface FileAuthorVo {
  fullName?: string;
}
interface FileCategoryVo {
  guid?: string;
  name?: string;
}
interface Microsoft365Vo {
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
interface GoogleDocsVo {
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
interface FileDetailVo {
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
interface ChangeImplementationStatusVo {
  guid: string;
  value: string;
}
interface ChangeMinimalVo {
  guid: string;
  number: string;
  url: UrlVo;
}
interface ChangeLifecycleTransitionFullVo {
  change: ChangeMinimalVo;
  implStatus?: ChangeImplementationStatusVo;
  status: ChangeLifecycleStatusType;
  comment?: string;
  administrators?: UserCompactVo[];
}
interface FileAssociationVo {
  guid: string;
  file: FileDetailVo;
}
interface FileAssociationVoResultRep {
  results: FileAssociationVo[];
  count: number;
}
interface ItemFileVo {
  guid: string;
  file: FileDetailVo;
  latestEditionAssociation?: boolean;
  primary?: boolean;
}
interface ItemFileVoResultRep {
  results: ItemFileVo[];
  count: number;
}
interface ItemGuidAndUrlVo {
  guid: string;
  url?: UrlVo;
}
interface ItemLifecycleChangeResponseVo {
  effectiveRevItem?: ItemGuidAndUrlVo;
  supersededRevItem?: ItemGuidAndUrlVo;
  workingRevItem?: ItemGuidAndUrlVo;
}
interface SupplierFullVo {
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
interface SupplierPhoneNumberVo {
  label?: string;
  number?: string;
  extension?: string;
  comment?: string;
  guid?: string;
}
interface SupplierPhoneNumberVoResultRep {
  results?: SupplierPhoneNumberVo[];
  count?: number;
}
interface AddressVo {
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
interface SupplierAddressCompactVo {
  primary?: boolean;
  address?: AddressVo;
}
interface SupplierAddressCompactVoResultRep {
  results?: SupplierAddressCompactVo[];
  count?: number;
}
interface QualityProcessCompactVo {
  guid?: string;
  number?: string;
  name?: string;
  status?: string;
}
interface QualityAssociationVo {
  guid?: string;
  qualityProcess?: QualityProcessCompactVo;
  associationType?: string;
}
interface ChangeQualityAssociationVoResultRep {
  results?: QualityAssociationVo[];
  count?: number;
}
interface QueryResultRepSupplierFullVo {
  results?: SupplierFullVo[];
  count?: number;
}
interface FileFullVo {
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
interface ArenaListResponse<T> {
  results: T[];
  count: number;
}
//#endregion
//#region src/actions/categories/listCategories.d.ts
declare const listCategories: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    required: boolean;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  path: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  assignable: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  user: {
    comments: string;
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
  };
  action: {
    comments: string;
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: CategoryResponse;
}>;
//#endregion
//#region src/actions/categories/listCategoryAttributes.d.ts
declare const listCategoryAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    required: boolean;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  categoryGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  user: {
    comments: string;
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
  };
  action: {
    comments: string;
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/addItemToChange.d.ts
declare const addItemToChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  newItemRevision: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  newRevisionNumber: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  newLifecyclePhase: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  materialEffectivityDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  retrainingRequired: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  dispositionAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  filesView: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  sourcingView: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  specsView: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  bomView: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChange.d.ts
declare const createChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    dataSource: string;
    clean: (value: unknown) => string;
  };
  numberSequencePrefix: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  routings: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    example: string;
    dataSource: string;
    clean: (value: unknown) => object;
  };
  approvalDeadlineDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  enforceApprovalDeadline: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  effectivityType: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  expirationDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  effectivityPlannedDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  supplierVisibility: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChangeFileAssociation.d.ts
declare const createChangeFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: true;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVo;
}>;
//#endregion
//#region src/actions/changes/createChangeImplementationFile.d.ts
declare const createChangeImplementationFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChangeImplementationTask.d.ts
declare const createChangeImplementationTask: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    type: "string";
  };
  assigneeUserGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  assigneeUserGroupGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dueDate: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChangeImplementationTaskFile.d.ts
declare const createChangeImplementationTaskFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChangeImplementationTaskNote.d.ts
declare const createChangeImplementationTaskNote: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  note: {
    label: string;
    type: "text";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  label: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  isPrivate: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/createChangeMarkupFile.d.ts
declare const createChangeMarkupFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/deleteChange.d.ts
declare const deleteChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    changeGuid: string;
    message: string;
  };
}>;
//#endregion
//#region src/actions/changes/deleteChangeFileAssociation.d.ts
declare const deleteChangeFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    changeGuid: string;
    changeFileAssociationGuid: string;
  };
}>;
//#endregion
//#region src/actions/changes/deleteChangeItemAssociation.d.ts
declare const deleteChangeItemAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeItemAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/changes/deleteChangeMarkupFile.d.ts
declare const deleteChangeMarkupFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeFileAssociationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/changes/listChangeAlerts.d.ts
declare const listChangeAlerts: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/getChangeByGuid.d.ts
declare const getChangeByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  guid: {
    label: string;
    required: boolean;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    type: "string";
    comments: string;
    example: string;
  };
  includeEmptyAdditionalAttributes: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    default: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ChangeFullVo;
}>;
//#endregion
//#region src/actions/changes/listChangeCategoryItemAttributes.d.ts
declare const listChangeCategoryItemAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  categoryGuid: {
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    example: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeCategoryRoutings.d.ts
declare const listChangeCategoryRoutings: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  categoryGuid: {
    required: boolean;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/getChangeFileAssociation.d.ts
declare const getChangeFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVo;
}>;
//#endregion
//#region src/actions/changes/listChangeFileAssociations.d.ts
declare const listChangeFileAssociations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVoResultRep;
}>;
//#endregion
//#region src/actions/changes/listChangeHistory.d.ts
declare const listChangeHistory: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeImplementationFiles.d.ts
declare const listChangeImplementationFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/getChangeImplementationTask.d.ts
declare const getChangeImplementationTask: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeImplementationTaskFiles.d.ts
declare const listChangeImplementationTaskFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeImplementationTaskNotes.d.ts
declare const listChangeImplementationTaskNotes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeImplementationTasks.d.ts
declare const listChangeImplementationTasks: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/getChangeItemAssociation.d.ts
declare const getChangeItemAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeItemAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeItems.d.ts
declare const listChangeItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChangeMarkupFiles.d.ts
declare const listChangeMarkupFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listChanges.d.ts
declare const listChanges: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    clean: (value: unknown) => string;
    type: "string";
    required: false;
    comments: string;
  };
  title: {
    label: string;
    placeholder: string;
    clean: (value: unknown) => string;
    type: "string";
    required: false;
    comments: string;
  };
  effectiveDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  submissionDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  lifecycleStatusType: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  implementationStatus: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
  };
  creatorGuid: {
    clean: (value: unknown) => string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
  };
  any: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
  includeChildCategories: {
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    label: string;
    type: "boolean";
    required: false;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<ChangeCompactVo>;
}>;
//#endregion
//#region src/actions/changes/listChangesAdministrators.d.ts
declare const listChangesAdministrators: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    placeholder: string;
    default: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/listNumberSequencePrefixes.d.ts
declare const listNumberSequencePrefixes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    required: boolean;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/updateChange.d.ts
declare const updateChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    dataSource: string;
    clean: (value: unknown) => string;
  };
  approvalDeadlineDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  enforceApprovalDeadline: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  effectivityType: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  expirationDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  effectivityPlannedDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  implementationStatus: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => string;
  };
  supplierVisibility: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/updateChangeImplementationTask.d.ts
declare const updateChangeImplementationTask: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  assigneeUserGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  assigneeUserGroupGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dueDate: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  status: {
    placeholder: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/updateChangeImplementationTaskNote.d.ts
declare const updateChangeImplementationTaskNote: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  implementationTaskGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  noteGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  note: {
    required: boolean;
    clean: (value: unknown) => string;
    comments: string;
    label: string;
    type: "text";
    placeholder: string;
  };
  label: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  isPrivate: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/changes/updateChangeItemAssociation.d.ts
declare const updateChangeItemAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeItemAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  filesViewIncluded: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  filesViewNotes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  sourcingViewIncluded: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  sourcingViewNotes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  specsViewIncluded: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  specsViewNotes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  bomViewIncluded: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  bomViewNotes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  newRevisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  newLifecyclePhase: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  materialEffectivityDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  retrainingRequired: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  dispositionAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/exports/createExport.d.ts
declare const createExport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region node_modules/axios/index.d.ts
type AxiosHeaderValue = AxiosHeaders | string | string[] | number | boolean | null;
type AxiosHeaderParameters = Record<string, string>;
interface RawAxiosHeaders {
  [key: string]: AxiosHeaderValue;
}
type AxiosHeaderMatcher = string | RegExp | ((this: AxiosHeaders, value: string, name: string) => boolean);
type AxiosHeaderParser = (this: AxiosHeaders, value: AxiosHeaderValue, header: string) => any;
declare class AxiosHeaders {
  constructor(headers?: RawAxiosHeaders | AxiosHeaders | string);
  [key: string]: any;
  set(headerName?: string, value?: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  set(headers?: RawAxiosHeaders | AxiosHeaders | string, rewrite?: boolean): AxiosHeaders;
  set(headers?: Iterable<[string, AxiosHeaderValue]>, rewrite?: boolean): AxiosHeaders;
  get(headerName: string, parser: typeof AxiosHeaders.parseParameters): AxiosHeaderParameters;
  get(headerName: string, parser: RegExp): RegExpExecArray | null;
  get(headerName: string, matcher?: true | AxiosHeaderParser): AxiosHeaderValue;
  has(header: string, matcher?: AxiosHeaderMatcher): boolean;
  delete(header: string | string[], matcher?: AxiosHeaderMatcher): boolean;
  clear(matcher?: AxiosHeaderMatcher): boolean;
  normalize(format: boolean): AxiosHeaders;
  concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
  toJSON(asStrings: true): Record<string, string>;
  toJSON(asStrings?: false): Record<string, string | string[]>;
  toJSON(asStrings?: boolean): Record<string, string | string[]>;
  static from(thing?: AxiosHeaders | RawAxiosHeaders | string): AxiosHeaders;
  static parseParameters(value: AxiosHeaderValue): AxiosHeaderParameters;
  static accessor(header: string | string[]): AxiosHeaders;
  static concat(...targets: Array<AxiosHeaders | RawAxiosHeaders | string | undefined | null>): AxiosHeaders;
  setContentType(value: ContentType, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentType(parser?: RegExp): RegExpExecArray | null;
  getContentType(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentType(matcher?: AxiosHeaderMatcher): boolean;
  setContentLength(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentLength(parser?: RegExp): RegExpExecArray | null;
  getContentLength(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentLength(matcher?: AxiosHeaderMatcher): boolean;
  setAccept(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getAccept(parser?: RegExp): RegExpExecArray | null;
  getAccept(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasAccept(matcher?: AxiosHeaderMatcher): boolean;
  setUserAgent(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getUserAgent(parser?: RegExp): RegExpExecArray | null;
  getUserAgent(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasUserAgent(matcher?: AxiosHeaderMatcher): boolean;
  setContentEncoding(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getContentEncoding(parser?: RegExp): RegExpExecArray | null;
  getContentEncoding(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasContentEncoding(matcher?: AxiosHeaderMatcher): boolean;
  setAuthorization(value: AxiosHeaderValue, rewrite?: boolean | AxiosHeaderMatcher): AxiosHeaders;
  getAuthorization(parser?: RegExp): RegExpExecArray | null;
  getAuthorization(matcher?: AxiosHeaderMatcher): AxiosHeaderValue;
  hasAuthorization(matcher?: AxiosHeaderMatcher): boolean;
  getSetCookie(): string[];
  toString(): string;
  [Symbol.iterator](): IterableIterator<[string, AxiosHeaderValue]>;
}
type ContentType = AxiosHeaderValue | 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';
//#endregion
//#region src/actions/exports/downloadExportRunFileContent.d.ts
declare const downloadExportRunFileContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  exportRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    content: string;
    contentType: string | number | true | string[] | AxiosHeaders;
    filename: any;
    size: number;
  };
}>;
//#endregion
//#region src/actions/exports/getExport.d.ts
declare const getExport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/exports/getExportRun.d.ts
declare const getExportRun: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  exportRunGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/exports/listExportRuns.d.ts
declare const listExportRuns: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  latestCompleted: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => boolean;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/exports/listExports.d.ts
declare const listExports: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorEmail: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/exports/getLatestCompletedExportRun.d.ts
declare const getLatestCompletedExportRun: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  view: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/exports/runExport.d.ts
declare const runExport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  exportGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  runData: {
    comments: string;
    label: string;
    type: "data";
    required: false;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/createExtract.d.ts
declare const createExtract: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/deleteExtract.d.ts
declare const deleteExtract: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/extracts/downloadExtractRunFileContent.d.ts
declare const downloadExtractRunFileContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  extractRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  runFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    content: string;
    contentType: string | number | true | string[] | AxiosHeaders;
    filename: any;
    size: number;
  };
}>;
//#endregion
//#region src/actions/extracts/getExtract.d.ts
declare const getExtract: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/getExtractRun.d.ts
declare const getExtractRun: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  extractRunGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/listExtractRunFiles.d.ts
declare const listExtractRunFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  extractRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/listExtractRuns.d.ts
declare const listExtractRuns: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/listExtracts.d.ts
declare const listExtracts: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  enabled: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  creatorFullName: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/extracts/getLatestCompletedExtractRun.d.ts
declare const getLatestCompletedExtractRun: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/runExtract.d.ts
declare const runExtract: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  runData: {
    comments: string;
    label: string;
    type: "data";
    required: false;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/extracts/updateExtract.d.ts
declare const updateExtract: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  extractGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  extractData: {
    comments: string;
    label: string;
    type: "data";
    required: true;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/changeFileCheckoutStatus.d.ts
declare const changeFileCheckoutStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileCheckoutData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
  fileContent: {
    comments: string;
    label: string;
    type: "data";
    required: false;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/createFileCorrection.d.ts
declare const createFileCorrection: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  content: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  comments: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    default: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  removeOriginalContent: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  haveContent: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/createFileEdition.d.ts
declare const createFileEdition: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
  fileContent: {
    comments: string;
    label: string;
    type: "data";
    required: false;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  location: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  title: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/createFileMarkup.d.ts
declare const createFileMarkup: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  markupContent: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  reserved: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  markupStorageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  markupCategoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  markupTitle: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  markupFormat: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  markupAuthorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/createFileWithContent.d.ts
declare const createFileWithContent: import("@prismatic-io/spectral").ActionDefinition<{
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
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    default: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  authorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  edition: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  private: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/deleteFile.d.ts
declare const deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    fileGuid: string;
    statusCode: number;
  };
}>;
//#endregion
//#region src/actions/files/downloadFileContent.d.ts
declare const downloadFileContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    content: string;
    contentType: string | number | true | string[] | AxiosHeaders;
    filename: any;
    size: number;
  };
}>;
//#endregion
//#region src/actions/files/listFileAttributes.d.ts
declare const listFileAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/getFileByGuid.d.ts
declare const getFileByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileDetailVo;
}>;
//#endregion
//#region src/actions/files/listFileCategories.d.ts
declare const listFileCategories: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  path: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  assignable: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  user: {
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  action: {
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/getFileCategoryAttributeDetails.d.ts
declare const getFileCategoryAttributeDetails: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    required: boolean;
    placeholder: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  categoryGuid: {
    required: boolean;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    comments: string;
    example: string;
  };
  attributeDefinitionGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/listFileCategoryAttributes.d.ts
declare const listFileCategoryAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  categoryGuid: {
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    example: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/getFileCategoryDetails.d.ts
declare const getFileCategoryDetails: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  categoryGuid: {
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/listFileCorrections.d.ts
declare const listFileCorrections: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/listFileEditions.d.ts
declare const listFileEditions: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/listFileMarkups.d.ts
declare const listFileMarkups: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/files/listFiles.d.ts
declare const listFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  title: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
  includeChildCategories: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<FileFullVo>;
}>;
//#endregion
//#region src/actions/files/getFileWatermarkContent.d.ts
declare const getFileWatermarkContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    content: string;
    contentType: string | number | true | string[] | AxiosHeaders;
    filename: any;
    size: number;
  };
}>;
//#endregion
//#region src/actions/files/updateFileContent.d.ts
declare const updateFileContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
  fileContent: {
    required: boolean;
    comments: string;
    label: string;
    type: "data";
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/createImport.d.ts
declare const createImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/forceCompleteImport.d.ts
declare const forceCompleteImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/getImport.d.ts
declare const getImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/getImportRun.d.ts
declare const getImportRun: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/getImportRunErrorContent.d.ts
declare const getImportRunErrorContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/getImportRunResultContent.d.ts
declare const getImportRunResultContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/getImportRunSubmitContent.d.ts
declare const getImportRunSubmitContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/listImportRuns.d.ts
declare const listImportRuns: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorEmail: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/imports/listImports.d.ts
declare const listImports: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  resource: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  mode: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorEmail: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/imports/rerunImport.d.ts
declare const rerunImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importRunGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/runImport.d.ts
declare const runImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  submitContent: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  fileContent: {
    comments: string;
    label: string;
    type: "data";
    required: false;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  submitFileType: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  commit: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  submitWorksheetName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  debug: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  actor: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    default: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/imports/updateImport.d.ts
declare const updateImport: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  importGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  importData: {
    comments: string;
    label: string;
    type: "data";
    required: true;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/getEvent.d.ts
declare const getEvent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listEventAssociations.d.ts
declare const listEventAssociations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemsReconciled: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => boolean;
  };
  creationDateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creationDateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/getEventItem.d.ts
declare const getEventItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listEventItemGuids.d.ts
declare const listEventItemGuids: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconciled: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listEventItems.d.ts
declare const listEventItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconciled: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => boolean;
  };
  reconciledDateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  reconciledDateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/getIntegration.d.ts
declare const getIntegration: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listIntegrationAdministrators.d.ts
declare const listIntegrationAdministrators: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listIntegrationFilters.d.ts
declare const listIntegrationFilters: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listIntegrations.d.ts
declare const listIntegrations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  enabled: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/listOutboundEventIntegrationAdministrators.d.ts
declare const listOutboundEventIntegrationAdministrators: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listOutboundEventIntegrationEvents.d.ts
declare const listOutboundEventIntegrationEvents: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  resourcesReconciled: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => boolean;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
  order: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/listOutboundEventIntegrations.d.ts
declare const listOutboundEventIntegrations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  enable: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/listOutboundEventIntegrationTriggers.d.ts
declare const listOutboundEventIntegrationTriggers: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/listOutboundEventResources.d.ts
declare const listOutboundEventResources: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  objectType: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconciled: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => boolean;
  };
  reconciledDateTimeFrom: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    example: string;
    clean: (value: unknown) => string;
  };
  reconciledDateTimeTo: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/integrations/updateEventItemReconciled.d.ts
declare const updateEventItemReconciled: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconciled: {
    label: string;
    type: "boolean";
    required: true;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/updateOutboundEventReconciliation.d.ts
declare const updateOutboundEventReconciliation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconcilePayload: {
    label: string;
    type: "boolean";
    required: true;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/integrations/updateOutboundEventResourceReconciliation.d.ts
declare const updateOutboundEventResourceReconciliation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  integrationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  eventGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  objectType: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
  };
  intUpdateGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  reconcilePayload: {
    label: string;
    type: "boolean";
    required: true;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/changeItemLifecyclePhase.d.ts
declare const changeItemLifecyclePhase: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  toLifecyclePhaseGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  revisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  proceedOnNotice: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemLifecycleChangeResponseVo;
}>;
//#endregion
//#region src/actions/items/createItem.d.ts
declare const createItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  revisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  shared: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  offTheShelf: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  uom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  productionCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  prototypeCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  targetPrice: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  targetCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  standardCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  ownerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatFields: {
    label: string;
    placeholder: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFullVo;
}>;
//#endregion
//#region src/actions/items/createItemFileAssociation.d.ts
declare const createItemFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  file: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  isPrivate: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
  authorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  edition: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  latestEditionAssociation: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
  primary: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFileVo;
}>;
//#endregion
//#region src/actions/items/createItemFromJson.d.ts
declare const createItemFromJson: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemJson: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  revisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  shared: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  offTheShelf: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  uom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  productionCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  prototypeCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  targetPrice: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  targetCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  standardCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  ownerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatFields: {
    label: string;
    placeholder: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFullVo;
}>;
//#endregion
//#region src/actions/items/createItemImage.d.ts
declare const createItemImage: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  content: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  filename: {
    label: string;
    placeholder: string;
    type: "string";
    required: false;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/createItemNumberFormatField.d.ts
declare const createItemNumberFormatField: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  formatGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fieldData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/createItemNumberReservation.d.ts
declare const createItemNumberReservation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  reservationData: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/deleteItem.d.ts
declare const deleteItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    itemGuid: string;
    message: string;
    statusCode: number;
  };
}>;
//#endregion
//#region src/actions/items/deleteItemFileAssociation.d.ts
declare const deleteItemFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    itemGuid: string;
    itemFileAssociationGuid: string;
  };
}>;
//#endregion
//#region src/actions/items/deleteItemImage.d.ts
declare const deleteItemImage: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/items/getItemByGuid.d.ts
declare const getItemByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  responseView: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFullVo;
}>;
//#endregion
//#region src/actions/items/getItemFileAssociation.d.ts
declare const getItemFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFileVo;
}>;
//#endregion
//#region src/actions/items/listItemFileAssociations.d.ts
declare const listItemFileAssociations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFileVoResultRep;
}>;
//#endregion
//#region src/actions/items/listItemFutureChanges.d.ts
declare const listItemFutureChanges: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItemHistory.d.ts
declare const listItemHistory: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/getItemImageContent.d.ts
declare const getItemImageContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    content: string;
    contentType: string | number | true | string[] | AxiosHeaders;
    size: any;
  };
}>;
//#endregion
//#region src/actions/items/listItemLifecyclePhases.d.ts
declare const listItemLifecyclePhases: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/getItemNumberFormatByGuid.d.ts
declare const getItemNumberFormatByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  guid: {
    label: string;
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    type: "string";
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/getItemNumberFormatField.d.ts
declare const getItemNumberFormatField: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  formatGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fieldGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItemNumberFormatFields.d.ts
declare const listItemNumberFormatFields: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  formatGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItemNumberFormats.d.ts
declare const listItemNumberFormats: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  active: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/items/listItemNumberReservations.d.ts
declare const listItemNumberReservations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  includeItemNumbers: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/items/listItemRequirements.d.ts
declare const listItemRequirements: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/getItemRevisions.d.ts
declare const getItemRevisions: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItems.d.ts
declare const listItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  revisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  lifecyclePhaseGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  lifecyclePhaseStage: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  ownerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorEmail: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  modifiedBom: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  modifiedFiles: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  modifiedSourcing: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  modifiedSpecs: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  inAssembly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  assemblyType: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  effectiveDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  responseView: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
  includeChildCategories: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<ItemFullVo>;
}>;
//#endregion
//#region src/actions/items/listItemTrainingPlans.d.ts
declare const listItemTrainingPlans: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItemTrainingRecords.d.ts
declare const listItemTrainingRecords: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/listItemWhereUsed.d.ts
declare const listItemWhereUsed: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/items/updateItem.d.ts
declare const updateItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  revisionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  shared: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  offTheShelf: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  uom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  targetPrice: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  targetCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  standardCost: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  ownerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberFormatFields: {
    label: string;
    placeholder: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFullVo;
}>;
//#endregion
//#region src/actions/items/updateItemFileAssociation.d.ts
declare const updateItemFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  latestEditionAssociation: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    example: string;
  };
  primary: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ItemFileVo;
}>;
//#endregion
//#region src/actions/lifecycle/changeLifecycleStatus.d.ts
declare const changeLifecycleStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  changeGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fromStatus: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  comment: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  administrators: {
    label: string;
    type: "data";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => object;
  };
  adminNeedConfig: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  implementationStatus: {
    label: string;
    type: "data";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ChangeLifecycleTransitionFullVo;
}>;
//#endregion
//#region src/actions/quality/addQualityStepApprover.d.ts
declare const addQualityStepApprover: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityprocessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  decisionType: {
    label: string;
    type: "string";
    required: true;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  userGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  groupGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/changeQualityProcessStatus.d.ts
declare const changeQualityProcessStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestType: {
    label: string;
    type: "string";
    required: true;
    model: {
      label: string;
      value: string;
    }[];
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  qualityProcessGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    model: {
      label: string;
      value: string;
    }[];
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  stepGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  comment: {
    comments: string;
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/createQualityProcess.d.ts
declare const createQualityProcess: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  targetCompletionDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  ownerGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  templateGuid: {
    required: boolean;
    clean: (value: unknown) => string;
    comments: string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  numberFormatPrefixGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  type: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/createQualityProcessStepAffected.d.ts
declare const createQualityProcessStepAffected: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  affectedObjectGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  notes: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/createQualityProcessStepAffectedQuality.d.ts
declare const createQualityProcessStepAffectedQuality: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  guid: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    example: string;
    clean: (value: unknown) => string;
  };
  affectedStepGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/createQualityProcessStepAffectedUrl.d.ts
declare const createQualityProcessStepAffectedUrl: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  guid: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    example: string;
    clean: (value: unknown) => string;
  };
  link: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  display: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/deleteQualityProcess.d.ts
declare const deleteQualityProcess: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/quality/deleteQualityProcessStepAffected.d.ts
declare const deleteQualityProcessStepAffected: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  affectedGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/quality/getQualityProcessByGuid.d.ts
declare const getQualityProcessByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcesses.d.ts
declare const listQualityProcesses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  templateGuid: {
    required: boolean;
    clean: (value: unknown) => string;
    comments: string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  type: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  ownerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  ownerGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/quality/getQualityProcessNumberFormatByGuid.d.ts
declare const getQualityProcessNumberFormatByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  guid: {
    label: string;
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    type: "string";
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessNumberFormats.d.ts
declare const listQualityProcessNumberFormats: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessOwners.d.ts
declare const listQualityProcessOwners: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessStepAffected.d.ts
declare const listQualityProcessStepAffected: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/getQualityProcessStepAffectedByGuid.d.ts
declare const getQualityProcessStepAffectedByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  affectedGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/getQualityProcessStepAttributeGroupByGuid.d.ts
declare const getQualityProcessStepAttributeGroupByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  attributeGroupGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessStepAttributeGroups.d.ts
declare const listQualityProcessStepAttributeGroups: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessStepAttributes.d.ts
declare const listQualityProcessStepAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  includePossibleValues: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  editableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  includeDeleted: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/getQualityProcessStepByGuid.d.ts
declare const getQualityProcessStepByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessSteps.d.ts
declare const listQualityProcessSteps: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessTemplateAttributeGroups.d.ts
declare const listQualityProcessTemplateAttributeGroups: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessTemplateAttributes.d.ts
declare const listQualityProcessTemplateAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includePossibleValues: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  editableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  includeDeleted: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/getQualityProcessTemplateByGuid.d.ts
declare const getQualityProcessTemplateByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityProcessTemplates.d.ts
declare const listQualityProcessTemplates: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  active: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    default: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/listQualityStepDecisions.d.ts
declare const listQualityStepDecisions: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityprocessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/submitQualityStepDecision.d.ts
declare const submitQualityStepDecision: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityprocessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    comments: string;
    example: string;
  };
  decisionGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  decision: {
    label: string;
    type: "string";
    required: true;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  comments: {
    placeholder: string;
    comments: string;
    label: string;
    type: "text";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/updateQualityProcess.d.ts
declare const updateQualityProcess: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  data: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    example: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/updateQualityProcessStep.d.ts
declare const updateQualityProcessStep: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  data: {
    label: string;
    comments: string;
    type: "data";
    required: true;
    example: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/quality/updateQualityProcessStepAffected.d.ts
declare const updateQualityProcessStepAffected: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  qualityProcessGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
  };
  affectedGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  notes: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/addEvaluationIssueResponse.d.ts
declare const addEvaluationIssueResponse: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  issueGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  response: {
    label: string;
    type: "text";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/addItemToRequest.d.ts
declare const addItemToRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  notes: {
    placeholder: string;
    comments: string;
    label: string;
    type: "text";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/attachFileToRequest.d.ts
declare const attachFileToRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/changeEvaluationIssueStatus.d.ts
declare const changeEvaluationIssueStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  issueGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    required: boolean;
    placeholder: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  response: {
    required: boolean;
    clean: (value: unknown) => string;
    placeholder: string;
    comments: string;
    label: string;
    type: "text";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/changeRequestStatus.d.ts
declare const changeRequestStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    label: string;
    required: boolean;
    placeholder: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    type: "string";
  };
  fromStatus: {
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    clean: (value: unknown) => string;
  };
  comment: {
    placeholder: string;
    comments: string;
    label: string;
    type: "text";
    required: false;
    clean: (value: unknown) => string;
  };
  resolutionNotes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  resolutionCode: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  deferralCode: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  deferDeadlineDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/createRequest.d.ts
declare const createRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  title: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  problem: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  requestedAction: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberSequencePrefix: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  evaluatorGroupGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  requestCode: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  creatorParticipation: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  supplierVisibility: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/createRequestEvaluationIssue.d.ts
declare const createRequestEvaluationIssue: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  issue: {
    label: string;
    type: "text";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierVisibility: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    default: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/createRequestMarkupFile.d.ts
declare const createRequestMarkupFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  markupGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/deleteRequest.d.ts
declare const deleteRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requests/deleteRequestMarkupFile.d.ts
declare const deleteRequestMarkupFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  requestFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requests/listEvaluationIssueResponses.d.ts
declare const listEvaluationIssueResponses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  issueGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/getRequestByGuid.d.ts
declare const getRequestByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestAdministrators.d.ts
declare const listRequestAdministrators: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestChanges.d.ts
declare const listRequestChanges: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestEvaluationIssues.d.ts
declare const listRequestEvaluationIssues: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestEvaluatorGroups.d.ts
declare const listRequestEvaluatorGroups: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestFiles.d.ts
declare const listRequestFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestItemAttributes.d.ts
declare const listRequestItemAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  includePossibleValues: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  editableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
  includeDeleted: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    model: {
      label: string;
      value: string;
    }[];
    default: string;
    clean: (value: unknown) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestItems.d.ts
declare const listRequestItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestMarkupFiles.d.ts
declare const listRequestMarkupFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestNumberSequencePrefixes.d.ts
declare const listRequestNumberSequencePrefixes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestNumberSequences.d.ts
declare const listRequestNumberSequences: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  objectType: {
    placeholder: string;
    default: string;
    model: {
      label: string;
      value: string;
    }[];
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestQualityProcesses.d.ts
declare const listRequestQualityProcesses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequestStatusChangeAttributes.d.ts
declare const listRequestStatusChangeAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requests/listRequests.d.ts
declare const listRequests: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  title: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  resolutionCode: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  requestCode: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  lifecycleStatus: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  deferralCode: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  includeChildCategories: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/requests/removeFileFromRequest.d.ts
declare const removeFileFromRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  requestFileAssociationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requests/updateRequest.d.ts
declare const updateRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requestGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  problem: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  requestedAction: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  numberSequencePrefix: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  requestCode: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  supplierVisibility: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/addRequirementChild.d.ts
declare const addRequirementChild: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  childRequirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/addRequirementFile.d.ts
declare const addRequirementFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/addRequirementQuality.d.ts
declare const addRequirementQuality: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  qualityGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/addRequirementTicket.d.ts
declare const addRequirementTicket: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/addRequirementTrace.d.ts
declare const addRequirementTrace: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  direction: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  objectType: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  relationshipTypeGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  targetRequirementGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/changeRequirementStatus.d.ts
declare const changeRequirementStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/createRequirement.d.ts
declare const createRequirement: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  priority: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  assigneeGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  numberSequencePrefix: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/deleteRequirement.d.ts
declare const deleteRequirement: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/deleteRequirementTrace.d.ts
declare const deleteRequirementTrace: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  traceLinkGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/getRequirement.d.ts
declare const getRequirement: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementChildren.d.ts
declare const listRequirementChildren: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  view: {
    label: string;
    type: "string";
    required: false;
    default: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/getRequirementFileAssociation.d.ts
declare const getRequirementFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementFiles.d.ts
declare const listRequirementFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementHistory.d.ts
declare const listRequirementHistory: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/getRequirementParent.d.ts
declare const getRequirementParent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementQuality.d.ts
declare const listRequirementQuality: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/getRequirementQualityAssociation.d.ts
declare const getRequirementQualityAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementRelationshipTypes.d.ts
declare const listRequirementRelationshipTypes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirements.d.ts
declare const listRequirements: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  title: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  assigneeFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  assigneeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  creatorGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  modificationDateTime: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  priority: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  description: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  any: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  templateGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/requirements/getRequirementTemplate.d.ts
declare const getRequirementTemplate: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementTemplateGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementTemplateAttributes.d.ts
declare const listRequirementTemplateAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  includePossibleValues: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  editableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementTemplates.d.ts
declare const listRequirementTemplates: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  active: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/getRequirementTicketAssociation.d.ts
declare const getRequirementTicketAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementTickets.d.ts
declare const listRequirementTickets: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/getRequirementTrace.d.ts
declare const getRequirementTrace: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  traceLinkGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/listRequirementTraces.d.ts
declare const listRequirementTraces: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  direction: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  suspect: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/removeRequirementChild.d.ts
declare const removeRequirementChild: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  childRequirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/removeRequirementFileAssociation.d.ts
declare const removeRequirementFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/removeRequirementQualityAssociation.d.ts
declare const removeRequirementQualityAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/removeRequirementTicketAssociation.d.ts
declare const removeRequirementTicketAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/requirements/updateRequirement.d.ts
declare const updateRequirement: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  priority: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  assigneeGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  setNull: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/requirements/updateRequirementTrace.d.ts
declare const updateRequirementTrace: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  requirementGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  traceLinkGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  relationshipTypeGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  suspected: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/settings/listApiUsages.d.ts
declare const listApiUsages: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  dateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/settings/listRecentActivityExports.d.ts
declare const listRecentActivityExports: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  dateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/settings/listRecentActivityFileAccesses.d.ts
declare const listRecentActivityFileAccesses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  dateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/settings/listRecentActivityReportRuns.d.ts
declare const listRecentActivityReportRuns: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  dateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/settings/listRecentActivityUserAccesses.d.ts
declare const listRecentActivityUserAccesses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  dateTimeFrom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  dateTimeTo: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/suppliers/createSourcingRelationship.d.ts
declare const createSourcingRelationship: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  amlRank: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  approved: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  makeItem: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  mfrItemGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  vendorItemGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  vendorItemConversionFactor: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/createSupplier.d.ts
declare const createSupplier: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierId: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  accountNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  website: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  approvalStatusGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  addresses: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  phoneNumbers: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierFullVo;
}>;
//#endregion
//#region src/actions/suppliers/createSupplierAddress.d.ts
declare const createSupplierAddress: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  label: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  address: {
    label: string;
    required: boolean;
    comments: string;
    inputs: {
      address1: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      address2: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      province: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      postalCode: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      country: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
    };
  } & {
    type: "structuredObject";
  };
  isPrimary: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierAddressCompactVo;
}>;
//#endregion
//#region src/actions/suppliers/createSupplierFileAssociation.d.ts
declare const createSupplierFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVo;
}>;
//#endregion
//#region src/actions/suppliers/createSupplierItem.d.ts
declare const createSupplierItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  type: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  uom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  offTheShelf: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  procurementType: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/createSupplierItemFile.d.ts
declare const createSupplierItemFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  file: {
    label: string;
    type: "data";
    required: true;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    default: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  authorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  edition: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  private: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
  latestEditionAssociation: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  primary: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/createSupplierPhoneNumber.d.ts
declare const createSupplierPhoneNumber: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  label: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  number: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  extension: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  comment: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierPhoneNumberVo;
}>;
//#endregion
//#region src/actions/suppliers/deleteSourcingRelationship.d.ts
declare const deleteSourcingRelationship: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  sourcingRelationshipGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    itemGuid: string;
    sourcingRelationshipGuid: string;
    message: string;
    statusCode: number;
  };
}>;
//#endregion
//#region src/actions/suppliers/deleteSupplier.d.ts
declare const deleteSupplier: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    supplierGuid: string;
  };
}>;
//#endregion
//#region src/actions/suppliers/deleteSupplierAddress.d.ts
declare const deleteSupplierAddress: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  addressGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    supplierGuid: string;
    addressGuid: string;
  };
}>;
//#endregion
//#region src/actions/suppliers/deleteSupplierFileAssociation.d.ts
declare const deleteSupplierFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    supplierGuid: string;
    supplierFileAssociationGuid: string;
  };
}>;
//#endregion
//#region src/actions/suppliers/deleteSupplierItem.d.ts
declare const deleteSupplierItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    guid: string;
  };
}>;
//#endregion
//#region src/actions/suppliers/deleteSupplierPhoneNumber.d.ts
declare const deleteSupplierPhoneNumber: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  phoneNumberGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
    supplierGuid: string;
    phoneNumberGuid: string;
  };
}>;
//#endregion
//#region src/actions/suppliers/listSourcingRelationships.d.ts
declare const listSourcingRelationships: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierAddresses.d.ts
declare const listSupplierAddresses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierAddressCompactVoResultRep;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierApprovalStatuses.d.ts
declare const listSupplierApprovalStatuses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  type: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/suppliers/getSupplierByGuid.d.ts
declare const getSupplierByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierFullVo;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierFileAssociations.d.ts
declare const listSupplierFileAssociations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVoResultRep;
}>;
//#endregion
//#region src/actions/suppliers/getSupplierItemByGuid.d.ts
declare const getSupplierItemByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includeEmptyAdditionalAttributes: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierItemCompliance.d.ts
declare const listSupplierItemCompliance: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/getSupplierItemFileContent.d.ts
declare const getSupplierItemFileContent: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierItemFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: Buffer<any>;
  contentType: string;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierItemFiles.d.ts
declare const listSupplierItemFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierItemRequirements.d.ts
declare const listSupplierItemRequirements: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierItemSourcing.d.ts
declare const listSupplierItemSourcing: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierItems.d.ts
declare const listSupplierItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  supplierName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierPhoneNumbers.d.ts
declare const listSupplierPhoneNumbers: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierPhoneNumberVoResultRep;
}>;
//#endregion
//#region src/actions/suppliers/getSupplierQualityProcessAssociation.d.ts
declare const getSupplierQualityProcessAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierQualityAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: QualityAssociationVo;
}>;
//#endregion
//#region src/actions/suppliers/listSupplierQualityProcessAssociations.d.ts
declare const listSupplierQualityProcessAssociations: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ChangeQualityAssociationVoResultRep;
}>;
//#endregion
//#region src/actions/suppliers/listSuppliers.d.ts
declare const listSuppliers: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  supplierId: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: QueryResultRepSupplierFullVo;
}>;
//#endregion
//#region src/actions/suppliers/updateSourcingRelationship.d.ts
declare const updateSourcingRelationship: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  itemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  sourcingRelationshipGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  setNull: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  amlRank: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  approved: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  mfrItemGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  notes: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  vendorItemGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  vendorItemConversionFactor: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  amlSplit: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/updateSupplier.d.ts
declare const updateSupplier: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierId: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  accountNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  website: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  approvalStatusGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  addresses: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  phoneNumbers: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierFullVo;
}>;
//#endregion
//#region src/actions/suppliers/updateSupplierAddress.d.ts
declare const updateSupplierAddress: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  addressGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  label: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  address: {
    label: string;
    required: boolean;
    comments: string;
    inputs: {
      address1: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      address2: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      city: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      state: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      province: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      postalCode: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
      country: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        clean: (value: unknown) => string;
        comments: string;
        example: string;
      };
    };
  } & {
    type: "structuredObject";
  };
  isPrimary: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierAddressCompactVo;
}>;
//#endregion
//#region src/actions/suppliers/updateSupplierFileAssociation.d.ts
declare const updateSupplierFileAssociation: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  supplierFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  title: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  edition: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  format: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  isPrivate: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
  authorFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  categoryGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  storageMethodName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  latestEditionAssociation: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
  isPrimary: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: FileAssociationVo;
}>;
//#endregion
//#region src/actions/suppliers/updateSupplierItem.d.ts
declare const updateSupplierItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierItemGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  type: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  uom: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  offTheShelf: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  procurementType: {
    label: string;
    type: "string";
    required: false;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/suppliers/updateSupplierPhoneNumber.d.ts
declare const updateSupplierPhoneNumber: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  supplierGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  phoneNumberGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    comments: string;
    example: string;
  };
  label: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  number: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  extension: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
  comment: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: SupplierPhoneNumberVo;
}>;
//#endregion
//#region src/actions/tickets/addTicketChange.d.ts
declare const addTicketChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  changeGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/addTicketFile.d.ts
declare const addTicketFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
  editionNumber: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/addTicketItem.d.ts
declare const addTicketItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  latestRevisionAssociation: {
    label: string;
    type: "boolean";
    required: false;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/addTicketQualityProcess.d.ts
declare const addTicketQualityProcess: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  qualityProcessGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/addTicketReference.d.ts
declare const addTicketReference: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  referencedTicketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/changeTicketStatus.d.ts
declare const changeTicketStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    required: boolean;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
  };
  notes: {
    placeholder: string;
    comments: string;
    label: string;
    type: "text";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/createTicket.d.ts
declare const createTicket: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    required: boolean;
    placeholder: string;
    comments: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  number: {
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  numberSequencePrefix: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    example: string;
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/deleteTicket.d.ts
declare const deleteTicket: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/getTicketByGuid.d.ts
declare const getTicketByGuid: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketChanges.d.ts
declare const listTicketChanges: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketFiles.d.ts
declare const listTicketFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketItems.d.ts
declare const listTicketItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketQualityProcesses.d.ts
declare const listTicketQualityProcesses: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketReferences.d.ts
declare const listTicketReferences: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTickets.d.ts
declare const listTickets: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  title: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  templateGuid: {
    required: boolean;
    clean: (value: unknown) => string;
    comments: string;
    label: string;
    type: "string";
    placeholder: string;
    example: string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/tickets/listTicketTemplateAttributes.d.ts
declare const listTicketTemplateAttributes: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  templateGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  includePossibleValues: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  creatableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  editableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
  searchableOnly: {
    label: string;
    type: "boolean";
    required: false;
    default: string;
    comments: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/listTicketTemplates.d.ts
declare const listTicketTemplates: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  active: {
    comments: string;
    label: string;
    type: "boolean";
    required: false;
    default: string;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/tickets/removeTicketChange.d.ts
declare const removeTicketChange: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/removeTicketFile.d.ts
declare const removeTicketFile: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/removeTicketItem.d.ts
declare const removeTicketItem: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/removeTicketQualityProcess.d.ts
declare const removeTicketQualityProcess: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/removeTicketReference.d.ts
declare const removeTicketReference: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  associationGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/tickets/updateTicket.d.ts
declare const updateTicket: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  ticketGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  title: {
    placeholder: string;
    comments: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  assigneeGuid: {
    placeholder: string;
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  fixVersion: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  foundOn: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => string;
  };
  priority: {
    comments: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  additionalAttributes: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => any[];
  };
  attributeDefinitions: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  additionalAttributeJson: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/addFileToTrainingPlan.d.ts
declare const addFileToTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  fileGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
    example: string;
  };
  latestEditionAssociation: {
    label: string;
    type: "boolean";
    required: false;
    clean: (value: unknown, defaultValue?: boolean) => boolean;
    comments: string;
    example: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/addItemToTrainingPlan.d.ts
declare const addItemToTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  itemGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/addQualityToTrainingPlan.d.ts
declare const addQualityToTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  qualityProcessGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  stepGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/addUserToTrainingPlan.d.ts
declare const addUserToTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  userGuid: {
    required: boolean;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
    placeholder: string;
  };
  dueDate: {
    placeholder: string;
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/changeTrainingPlanStatus.d.ts
declare const changeTrainingPlanStatus: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  status: {
    required: boolean;
    placeholder: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
    label: string;
    type: "string";
  };
  comment: {
    placeholder: string;
    comments: string;
    example: string;
    label: string;
    type: "text";
    required: false;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/listTrainingManagers.d.ts
declare const listTrainingManagers: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: UserCompactVoResultRep;
}>;
//#endregion
//#region src/actions/training/listTrainingPlanFiles.d.ts
declare const listTrainingPlanFiles: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/listTrainingPlanItems.d.ts
declare const listTrainingPlanItems: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/listTrainingPlanQuality.d.ts
declare const listTrainingPlanQuality: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/listTrainingPlanRecords.d.ts
declare const listTrainingPlanRecords: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/listTrainingPlans.d.ts
declare const listTrainingPlans: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  number: {
    label: string;
    placeholder: string;
    comments: string;
    example: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    example: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  status: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
  managerGuid: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  managerFullName: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  userGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
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
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    };
  } & {
    type: "structuredObject";
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: ArenaListResponse<unknown>;
}>;
//#endregion
//#region src/actions/training/listTrainingPlanUsers.d.ts
declare const listTrainingPlanUsers: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/training/removeFileFromTrainingPlan.d.ts
declare const removeFileFromTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  trainingFileAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/training/removeItemFromTrainingPlan.d.ts
declare const removeItemFromTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  trainingItemAssociationGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/training/removeQualityFromTrainingPlan.d.ts
declare const removeQualityFromTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  referenceGuid: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    success: boolean;
    message: string;
  };
}>;
//#endregion
//#region src/actions/training/updateTrainingPlan.d.ts
declare const updateTrainingPlan: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  trainingGuid: {
    comments: string;
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  name: {
    label: string;
    placeholder: string;
    comments: string;
    example: string;
    type: "string";
    required: false;
    clean: (value: unknown) => string;
  };
  description: {
    label: string;
    type: "text";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => string;
  };
  daysToComplete: {
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown) => number;
  };
  managerGuid: {
    comments: string;
    example: string;
    label: string;
    type: "string";
    required: false;
    placeholder: string;
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: any;
}>;
//#endregion
//#region src/actions/misc/rawRequest.d.ts
declare const rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
  connection: {
    label: string;
    type: "connection";
    required: true;
    comments: string;
  };
  endpoint: {
    label: string;
    type: "string";
    required: true;
    placeholder: string;
    comments: string;
    example: string;
    clean: (value: unknown, defaultValue?: string) => string;
  };
  httpMethod: {
    label: string;
    type: "string";
    required: true;
    default: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown, defaultValue?: string) => string;
  };
  jsonPayload: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => object;
  };
  formData: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => any[];
  };
  fileData: {
    label: string;
    type: "data";
    required: false;
    comments: string;
    clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
  };
  queryParameters: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => any[];
  };
  additionalHeaders: {
    label: string;
    type: "string";
    collection: "keyvaluelist";
    required: false;
    placeholder: string;
    comments: string;
    clean: (value: unknown) => any[];
  };
  responseType: {
    label: string;
    type: "string";
    required: false;
    default: string;
    comments: string;
    model: {
      label: string;
      value: string;
    }[];
    clean: (value: unknown) => string;
  };
}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
  data: {
    responseData: unknown;
    statusCode: number;
    headers: {
      [k: string]: string;
    };
  };
}>;
declare namespace index_d_exports {
  export { addEvaluationIssueResponse, addFileToTrainingPlan, addItemToChange, addItemToRequest, addItemToTrainingPlan, addQualityStepApprover, addQualityToTrainingPlan, addRequirementChild, addRequirementFile, addRequirementQuality, addRequirementTicket, addRequirementTrace, addTicketChange, addTicketFile, addTicketItem, addTicketQualityProcess, addTicketReference, addUserToTrainingPlan, attachFileToRequest, changeEvaluationIssueStatus, changeFileCheckoutStatus, changeItemLifecyclePhase, changeLifecycleStatus, changeQualityProcessStatus, changeRequestStatus, changeRequirementStatus, changeTicketStatus, changeTrainingPlanStatus, createBomLine, createBomSubstitute, createChange, createChangeFileAssociation, createChangeImplementationFile, createChangeImplementationTask, createChangeImplementationTaskFile, createChangeImplementationTaskNote, createChangeMarkupFile, createExport, createExtract, createFileCorrection, createFileEdition, createFileMarkup, createFileWithContent, createImport, createItem, createItemFileAssociation, createItemFromJson, createItemImage, createItemNumberFormatField, createItemNumberReservation, createQualityProcess, createQualityProcessStepAffected, createQualityProcessStepAffectedQuality, createQualityProcessStepAffectedUrl, createRequest, createRequestEvaluationIssue, createRequestMarkupFile, createRequirement, createSourcingRelationship, createSupplier, createSupplierAddress, createSupplierFileAssociation, createSupplierItem, createSupplierItemFile, createSupplierPhoneNumber, createTicket, deleteBomLine, deleteBomSubstitute, deleteChange, deleteChangeFileAssociation, deleteChangeItemAssociation, deleteChangeMarkupFile, deleteExtract, deleteFile, deleteItem, deleteItemFileAssociation, deleteItemImage, deleteQualityProcess, deleteQualityProcessStepAffected, deleteRequest, deleteRequestMarkupFile, deleteRequirement, deleteRequirementTrace, deleteSourcingRelationship, deleteSupplier, deleteSupplierAddress, deleteSupplierFileAssociation, deleteSupplierItem, deleteSupplierPhoneNumber, deleteTicket, downloadExportRunFileContent, downloadExtractRunFileContent, downloadFileContent, forceCompleteImport, getBomLine, getBomSettings, getBomSubstitute, getChangeByGuid, getChangeFileAssociation, getChangeImplementationTask, getChangeItemAssociation, getEvent, getEventItem, getExport, getExportRun, getExtract, getExtractRun, getFileByGuid, getFileCategoryAttributeDetails, getFileCategoryDetails, getFileWatermarkContent, getImport, getImportRun, getImportRunErrorContent, getImportRunResultContent, getImportRunSubmitContent, getIntegration, getItemByGuid, getItemFileAssociation, getItemImageContent, getItemNumberFormatByGuid, getItemNumberFormatField, getItemRevisions, getLatestCompletedExportRun, getLatestCompletedExtractRun, getQualityProcessByGuid, getQualityProcessNumberFormatByGuid, getQualityProcessStepAffectedByGuid, getQualityProcessStepAttributeGroupByGuid, getQualityProcessStepByGuid, getQualityProcessTemplateByGuid, getRequestByGuid, getRequirement, getRequirementFileAssociation, getRequirementParent, getRequirementQualityAssociation, getRequirementTemplate, getRequirementTicketAssociation, getRequirementTrace, getSupplierByGuid, getSupplierItemByGuid, getSupplierItemFileContent, getSupplierQualityProcessAssociation, getTicketByGuid, listApiUsages, listBom, listBomAttributes, listBomSubstitutes, listCategories, listCategoryAttributes, listChangeAlerts, listChangeCategoryItemAttributes, listChangeCategoryRoutings, listChangeFileAssociations, listChangeHistory, listChangeImplementationFiles, listChangeImplementationTaskFiles, listChangeImplementationTaskNotes, listChangeImplementationTasks, listChangeItems, listChangeMarkupFiles, listChanges, listChangesAdministrators, listEvaluationIssueResponses, listEventAssociations, listEventItemGuids, listEventItems, listExportRuns, listExports, listExtractRunFiles, listExtractRuns, listExtracts, listFileAttributes, listFileCategories, listFileCategoryAttributes, listFileCorrections, listFileEditions, listFileMarkups, listFiles, listImportRuns, listImports, listIntegrationAdministrators, listIntegrationFilters, listIntegrations, listItemFileAssociations, listItemFutureChanges, listItemHistory, listItemLifecyclePhases, listItemNumberFormatFields, listItemNumberFormats, listItemNumberReservations, listItemRequirements, listItemTrainingPlans, listItemTrainingRecords, listItemWhereUsed, listItems, listNumberSequencePrefixes, listOutboundEventIntegrationAdministrators, listOutboundEventIntegrationEvents, listOutboundEventIntegrationTriggers, listOutboundEventIntegrations, listOutboundEventResources, listQualityProcessNumberFormats, listQualityProcessOwners, listQualityProcessStepAffected, listQualityProcessStepAttributeGroups, listQualityProcessStepAttributes, listQualityProcessSteps, listQualityProcessTemplateAttributeGroups, listQualityProcessTemplateAttributes, listQualityProcessTemplates, listQualityProcesses, listQualityStepDecisions, listRecentActivityExports, listRecentActivityFileAccesses, listRecentActivityReportRuns, listRecentActivityUserAccesses, listRequestAdministrators, listRequestChanges, listRequestEvaluationIssues, listRequestEvaluatorGroups, listRequestFiles, listRequestItemAttributes, listRequestItems, listRequestMarkupFiles, listRequestNumberSequencePrefixes, listRequestNumberSequences, listRequestQualityProcesses, listRequestStatusChangeAttributes, listRequests, listRequirementChildren, listRequirementFiles, listRequirementHistory, listRequirementQuality, listRequirementRelationshipTypes, listRequirementTemplateAttributes, listRequirementTemplates, listRequirementTickets, listRequirementTraces, listRequirements, listSourcingRelationships, listSupplierAddresses, listSupplierApprovalStatuses, listSupplierFileAssociations, listSupplierItemCompliance, listSupplierItemFiles, listSupplierItemRequirements, listSupplierItemSourcing, listSupplierItems, listSupplierPhoneNumbers, listSupplierQualityProcessAssociations, listSuppliers, listTicketChanges, listTicketFiles, listTicketItems, listTicketQualityProcesses, listTicketReferences, listTicketTemplateAttributes, listTicketTemplates, listTickets, listTrainingManagers, listTrainingPlanFiles, listTrainingPlanItems, listTrainingPlanQuality, listTrainingPlanRecords, listTrainingPlanUsers, listTrainingPlans, rawRequest, removeFileFromRequest, removeFileFromTrainingPlan, removeItemFromTrainingPlan, removeQualityFromTrainingPlan, removeRequirementChild, removeRequirementFileAssociation, removeRequirementQualityAssociation, removeRequirementTicketAssociation, removeTicketChange, removeTicketFile, removeTicketItem, removeTicketQualityProcess, removeTicketReference, rerunImport, runExport, runExtract, runImport, submitQualityStepDecision, updateBomLine, updateBomSettings, updateBomSubstitute, updateChange, updateChangeImplementationTask, updateChangeImplementationTaskNote, updateChangeItemAssociation, updateEventItemReconciled, updateExtract, updateFileContent, updateImport, updateItem, updateItemFileAssociation, updateOutboundEventReconciliation, updateOutboundEventResourceReconciliation, updateQualityProcess, updateQualityProcessStep, updateQualityProcessStepAffected, updateRequest, updateRequirement, updateRequirementTrace, updateSourcingRelationship, updateSupplier, updateSupplierAddress, updateSupplierFileAssociation, updateSupplierItem, updateSupplierPhoneNumber, updateTicket, updateTrainingPlan };
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "arena-plm-v2";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  documentationUrl: "https://prismatic.io/docs/components/arena-plm-v2/";
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "arenaApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customBaseUrl: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      apiKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    };
  }, "arenaApiKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "arenaUsernamePassword";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      customBaseUrl: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      password: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    };
  }, "arenaUsernamePassword"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "arenaOAuth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        placeholder: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
      };
      customBaseUrl: {
        label: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        placeholder: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        placeholder: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: false;
        placeholder: string;
        comments: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: true;
        placeholder: string;
        comments: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: true;
        placeholder: string;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        shown: true;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
      };
    };
  }, "arenaOAuth">)[];
  actions: typeof index_d_exports;
  dataSources: {
    categoriesPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeDeleted: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean;
      };
      assignable: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    categoryAttributesObjectSelection: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      categoryGuid: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeInactive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    numberSequencePrefixesPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      objectType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    changeCategoryRoutingsPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      categoryGuid: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    outboundEventIntegrationsPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      enabled: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    qualityProcessTemplatesPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    exportsPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      number: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
      name: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
      description: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string;
      };
      creatorGuid: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      creatorEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      creatorFullName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      limit: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      offset: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    integrationsPicklist: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      enabled: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    notificationJsonForm: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "jsonForm">;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      integrationGuid: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string;
      };
      itemsReconciled: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        example: string;
        clean: (value: unknown) => string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;