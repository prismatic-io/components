import { input, util } from "@prismatic-io/spectral";
import {
  GET_PURCHASE_REQUISITION_ITEM_DETAILS_EXPAND_MODEL,
  GET_PURCHASE_REQUISITION_ITEM_DETAILS_ORDER_BY_MODEL,
  GET_PURCHASE_REQUISITION_ITEM_DETAILS_SELECT_MODEL,
  pollResourceModel,
} from "./constants";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const requestBody = input({
  label: "Request Body",
  type: "string",
  comments: "Request Body",
  required: true,
  clean: util.types.toString,
});

export const requestBodyCode = input({
  label: "Body",
  type: "code",
  language: "json",
  required: false,
  comments: "Request Body",
  default: `{
    "BusEventSubscriberCode": "string",
    "SAPObjectType": "string",
    "SAPObjectTaskCode": "string",
    "BusEventSubscriptionStateCode": "string",
    "BusEventPriority": 0
 }`,
  clean: util.types.toString,
});

export const documentInfoRecordDocumentType = input({
  label: "Document Info Record Document Type",
  type: "string",
  comments: "Document Info Record Document Type",
  required: true,
  clean: util.types.toString,
});

export const documentInfoRecordDocumentNumber = input({
  label: "Document Info Record Document Number",
  type: "string",
  comments: "Document Info Record Document Number",
  required: true,
  clean: util.types.toString,
});

export const documentInfoRecordDocumentVersion = input({
  label: "Document Info Record Document Version",
  type: "string",
  comments: "Document Info Record Document Version",
  required: true,
  clean: util.types.toString,
});

export const documentInfoRecordDocumentPart = input({
  label: "Document Info Record Document Part",
  type: "string",
  comments: "Document Info Record Document Part",
  required: true,
  clean: util.types.toString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  comments: "Filter items by property values",
  required: false,
  clean: util.types.toString,
});

export const inlinecount = input({
  label: "Inline Count",
  type: "string",
  required: false,
  model: [
    {
      label: "allpages",
      value: "allpages",
    },
    {
      label: "none",
      value: "none",
    },
  ],
  clean: util.types.toString,
});

export const orderBy = input({
  label: "Order By",
  type: "string",
  collection: "valuelist",
  comments: "Order items by property value",
  example:
    "Available values (use one): FileSize, FileSize desc, FileName, FileName desc, MimeType, MimeType desc, CreatedByUser, CreatedByUser desc, CreationDateTime, CreationDateTime desc, LastChangedByUser, LastChangedByUser desc, ChangedDateTime, ChangedDateTime desc",
  required: false,
  clean: (value: unknown) => (value as unknown[]).map((item) => util.types.toString(item)),
});

export const select = input({
  label: "Select",
  type: "string",
  collection: "valuelist",
  comments: "Select property to be returned",
  example:
    "Available values (use one): DocumentInfoRecordDocType, DocumentInfoRecordDocNumber, DocumentInfoRecordDocVersion, DocumentInfoRecordDocPart, LogicalDocument, ArchiveDocumentID, LinkedSAPObjectKey, BusinessObjectTypeName, SemanticObject, WorkstationApplication, FileSize, FileName, DocumentURL, MimeType, Content, CreatedByUser, CreatedByUserFullName, CreationDateTime, BusinessObjectType, LastChangedByUser, LastChangedByUserFullName, ChangedDateTime, StorageCategory, ArchiveLinkRepository, SAPObjectType, SAPObjectNodeType, HarmonizedDocumentType, AttachmentDeletionIsAllowed, AttachmentRenameIsAllowed, Source, AttachmentContentHash",
  required: false,
  clean: (value: unknown) => (value as unknown[]).map((item) => util.types.toString(item)),
});

export const logicalDocument = input({
  label: "Logical Document",
  type: "string",
  comments: "Logical Document",
  required: true,
  clean: util.types.toString,
});

export const archiveDocumentId = input({
  label: "Archive Document ID",
  type: "string",
  comments: "Archive Document ID",
  required: true,
  clean: util.types.toString,
});

export const linkedSapObjectKey = input({
  label: "Linked SAP Object Key",
  type: "string",
  comments: "Linked SAP Object Key",
  required: true,
  clean: util.types.toString,
});

export const businessObjectTypeName = input({
  label: "Business Object Type Name",
  type: "string",
  comments: "Business Object Type Name",
  required: true,
  clean: util.types.toString,
});

export const top = input({
  label: "Top",
  type: "string",
  comments: "Show only the first n items",
  required: false,
  clean: util.types.toString,
});

export const skip = input({
  label: "Skip",
  type: "string",
  comments: "Skip the first n items",
  required: false,
  clean: util.types.toString,
});

export const search = input({
  label: "Search",
  type: "string",
  comments: "Search items by search phrases",
  required: false,
  clean: util.types.toString,
});

export const busEventSubscriberCode = input({
  label: "Bus Event Subscriber Code",
  type: "string",
  comments: "Subscriber ID",
  required: true,
  clean: util.types.toString,
});

export const sapObjectType = input({
  label: "SAP Object Type",
  type: "string",
  comments: "SAP Object Type",
  required: true,
  clean: util.types.toString,
});

export const sapObjectTaskCode = input({
  label: "SAP Object Task Code",
  type: "string",
  comments: "SAP Object Task Code",
  required: true,
  clean: util.types.toString,
});

export const expand = input({
  label: "Expand",
  type: "string",
  collection: "valuelist",
  comments: "Expand related entities",
  example: "Available values (use one): ProjectRoleSet, WorkPackageSet",
  required: false,
  clean: (value: unknown) => (value as unknown[]).map((item) => util.types.toString(item)),
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  comments: "Project ID",
  required: true,
  dataSource: "selectProject",
  clean: util.types.toString,
});

export const changeRecordUuid = input({
  label: "Change Record UUID",
  type: "string",
  comments: "NodeID",
  required: true,
  dataSource: "selectChangeRecord",
  clean: util.types.toString,
});

export const attachOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order items by property value",
  collection: "valuelist",
  model: [
    { label: "FileSize", value: "FileSize" },
    { label: "FileSize desc", value: "FileSize desc" },
    { label: "FileName", value: "FileName" },
    { label: "FileName desc", value: "FileName desc" },
    { label: "MimeType", value: "MimeType" },
    { label: "MimeType desc", value: "MimeType desc" },
    { label: "CreatedByUser", value: "CreatedByUser" },
    { label: "CreatedByUser desc", value: "CreatedByUser desc" },
    { label: "CreationDateTime", value: "CreationDateTime" },
    { label: "CreationDateTime desc", value: "CreationDateTime desc" },
    { label: "LastChangedByUser", value: "LastChangedByUser" },
    { label: "LastChangedByUser desc", value: "LastChangedByUser desc" },
    { label: "ChangedDateTime", value: "ChangedDateTime" },
    { label: "ChangedDateTime desc", value: "ChangedDateTime desc" },
  ],
  clean: util.types.toString,
});

export const attachSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: [
    { label: "DocumentInfoRecordDocType", value: "DocumentInfoRecordDocType" },
    {
      label: "DocumentInfoRecordDocNumber",
      value: "DocumentInfoRecordDocNumber",
    },
    {
      label: "DocumentInfoRecordDocVersion",
      value: "DocumentInfoRecordDocVersion",
    },
    { label: "DocumentInfoRecordDocPart", value: "DocumentInfoRecordDocPart" },
    { label: "LogicalDocument", value: "LogicalDocument" },
    { label: "ArchiveDocumentID", value: "ArchiveDocumentID" },
    { label: "LinkedSAPObjectKey", value: "LinkedSAPObjectKey" },
    { label: "BusinessObjectTypeName", value: "BusinessObjectTypeName" },
    { label: "SemanticObject", value: "SemanticObject" },
    { label: "WorkstationApplication", value: "WorkstationApplication" },
    { label: "FileSize", value: "FileSize" },
    { label: "FileName", value: "FileName" },
    { label: "DocumentURL", value: "DocumentURL" },
    { label: "MimeType", value: "MimeType" },
    { label: "Content", value: "Content" },
    { label: "CreatedByUser", value: "CreatedByUser" },
    { label: "CreatedByUserFullName", value: "CreatedByUserFullName" },
    { label: "CreationDateTime", value: "CreationDateTime" },
    { label: "BusinessObjectType", value: "BusinessObjectType" },
    { label: "LastChangedByUser", value: "LastChangedByUser" },
    { label: "LastChangedByUserFullName", value: "LastChangedByUserFullName" },
    { label: "ChangedDateTime", value: "ChangedDateTime" },
    { label: "StorageCategory", value: "StorageCategory" },
    { label: "ArchiveLinkRepository", value: "ArchiveLinkRepository" },
    { label: "SAPObjectType", value: "SAPObjectType" },
    { label: "SAPObjectNodeType", value: "SAPObjectNodeType" },
    { label: "HarmonizedDocumentType", value: "HarmonizedDocumentType" },
    {
      label: "AttachmentDeletionIsAllowed",
      value: "AttachmentDeletionIsAllowed",
    },
    { label: "AttachmentRenameIsAllowed", value: "AttachmentRenameIsAllowed" },
    { label: "Source", value: "Source" },
    { label: "AttachmentContentHash", value: "AttachmentContentHash" },
  ],
  clean: util.types.toString,
});


export const changerecordSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: [
    { label: "Update_mc", value: "Update_mc" },
    {
      label: "to_ChangeRecordFuncLocTskList_oc",
      value: "to_ChangeRecordFuncLocTskList_oc",
    },
    {
      label: "to_ChangeRecordRateRtgTskList_oc",
      value: "to_ChangeRecordRateRtgTskList_oc",
    },
    {
      label: "to_ChangeRecordRefCharc_oc",
      value: "to_ChangeRecordRefCharc_oc",
    },
    {
      label: "to_ChangeRecordRefClass_oc",
      value: "to_ChangeRecordRefClass_oc",
    },
    {
      label: "to_ChangeRecordRefEquipTskList_oc",
      value: "to_ChangeRecordRefEquipTskList_oc",
    },
    {
      label: "to_ChangeRecordRefInspPlan_oc",
      value: "to_ChangeRecordRefInspPlan_oc",
    },
    {
      label: "to_ChangeRecordRefLabelSet_oc",
      value: "to_ChangeRecordRefLabelSet_oc",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe_oc",
      value: "to_ChangeRecordRefMasterRecipe_oc",
    },
    {
      label: "to_ChangeRecordRefOpSetTskList_oc",
      value: "to_ChangeRecordRefOpSetTskList_oc",
    },
    {
      label: "to_ChangeRecordRefProdnRouting_oc",
      value: "to_ChangeRecordRefProdnRouting_oc",
    },
    {
      label: "to_ChangeRecordRefRecipe_oc",
      value: "to_ChangeRecordRefRecipe_oc",
    },
    {
      label: "to_ChangeRecordRefSpecification_oc",
      value: "to_ChangeRecordRefSpecification_oc",
    },
    {
      label: "to_ChangeRecordRefStdBOM_oc",
      value: "to_ChangeRecordRefStdBOM_oc",
    },
    {
      label: "to_ChangeRecordRefTmplRouting_oc",
      value: "to_ChangeRecordRefTmplRouting_oc",
    },
    {
      label: "to_ChangeRecordRefVarBOM_oc",
      value: "to_ChangeRecordRefVarBOM_oc",
    },
    {
      label: "to_ChgRecdCollaboration_oc",
      value: "to_ChgRecdCollaboration_oc",
    },
    { label: "to_ChgRecdEquipBOM_oc", value: "to_ChgRecdEquipBOM_oc" },
    { label: "to_ChgRecdFuncLocBOM_oc", value: "to_ChgRecdFuncLocBOM_oc" },
    {
      label: "to_ChgRecdRefCutPlngPrflTskList_oc",
      value: "to_ChgRecdRefCutPlngPrflTskList_oc",
    },
    { label: "to_ChgRecdRefEngBOM_oc", value: "to_ChgRecdRefEngBOM_oc" },
    {
      label: "to_ChgRecdRefMaintTskList_oc",
      value: "to_ChgRecdRefMaintTskList_oc",
    },
    { label: "to_ChgRecdRefMfgBOM_oc", value: "to_ChgRecdRefMfgBOM_oc" },
    { label: "to_ChgRecdRefPlngScp_oc", value: "to_ChgRecdRefPlngScp_oc" },
    {
      label: "to_ChgRecdRefRateRtgTskList_oc",
      value: "to_ChgRecdRefRateRtgTskList_oc",
    },
    { label: "to_ChgRecdWBSElmntBOM_oc", value: "to_ChgRecdWBSElmntBOM_oc" },
    { label: "to_RefBit_oc", value: "to_RefBit_oc" },
    { label: "to_RefBOM_oc", value: "to_RefBOM_oc" },
    { label: "to_RefDoc_oc", value: "to_RefDoc_oc" },
    { label: "to_RefMat_oc", value: "to_RefMat_oc" },
    { label: "to_RefPSV_oc", value: "to_RefPSV_oc" },
    { label: "ChangeRecordUUID", value: "ChangeRecordUUID" },
    { label: "ChangeRecord", value: "ChangeRecord" },
    { label: "ChangeRecordType", value: "ChangeRecordType" },
    { label: "ChangeRecordStatus", value: "ChangeRecordStatus" },
    { label: "ChangeNumber", value: "ChangeNumber" },
    { label: "CreatedByUser", value: "CreatedByUser" },
    { label: "CreationDateTime", value: "CreationDateTime" },
    { label: "LastChangedByUser", value: "LastChangedByUser" },
    { label: "LastChangeDateTime", value: "LastChangeDateTime" },
    {
      label: "ChangeRecordLifecycleStatus",
      value: "ChangeRecordLifecycleStatus",
    },
    { label: "Partner", value: "Partner" },
    { label: "ChgRecordDescriptionText", value: "ChgRecordDescriptionText" },
    {
      label: "ChangeRecordDetailDescription",
      value: "ChangeRecordDetailDescription",
    },
    {
      label: "ChgRecdExpectedCompletionDate",
      value: "ChgRecdExpectedCompletionDate",
    },
    {
      label: "to_ChangeRecordFuncLocTskList",
      value: "to_ChangeRecordFuncLocTskList",
    },
    { label: "to_ChangeRecordRefCharc", value: "to_ChangeRecordRefCharc" },
    { label: "to_ChangeRecordRefClass", value: "to_ChangeRecordRefClass" },
    {
      label: "to_ChangeRecordRefEquipTskList",
      value: "to_ChangeRecordRefEquipTskList",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe",
      value: "to_ChangeRecordRefMasterRecipe",
    },
    {
      label: "to_ChangeRecordRefProdnRouting",
      value: "to_ChangeRecordRefProdnRouting",
    },
    { label: "to_ChangeRecordRefStdBOM", value: "to_ChangeRecordRefStdBOM" },
    { label: "to_ChangeRecordRefVarBOM", value: "to_ChangeRecordRefVarBOM" },
    { label: "to_ChgRecdCollaboration", value: "to_ChgRecdCollaboration" },
    { label: "to_ChgRecdEquipBOM", value: "to_ChgRecdEquipBOM" },
    { label: "to_ChgRecdFuncLocBOM", value: "to_ChgRecdFuncLocBOM" },
    { label: "to_ChgRecdRefEngBOM", value: "to_ChgRecdRefEngBOM" },
    { label: "to_ChgRecdRefMaintTskList", value: "to_ChgRecdRefMaintTskList" },
    { label: "to_ChgRecdRefMfgBOM", value: "to_ChgRecdRefMfgBOM" },
    { label: "to_RefBit", value: "to_RefBit" },
    { label: "to_RefBOM", value: "to_RefBOM" },
    { label: "to_RefDoc", value: "to_RefDoc" },
    { label: "to_RefMat", value: "to_RefMat" },
    { label: "to_RefPSV", value: "to_RefPSV" },
  ],
});


export const changerecordExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: [
    {
      label: "to_ChangeRecordFuncLocTskList",
      value: "to_ChangeRecordFuncLocTskList",
    },
    { label: "to_ChangeRecordRefCharc", value: "to_ChangeRecordRefCharc" },
    { label: "to_ChangeRecordRefClass", value: "to_ChangeRecordRefClass" },
    {
      label: "to_ChangeRecordRefEquipTskList",
      value: "to_ChangeRecordRefEquipTskList",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe",
      value: "to_ChangeRecordRefMasterRecipe",
    },
    {
      label: "to_ChangeRecordRefProdnRouting",
      value: "to_ChangeRecordRefProdnRouting",
    },
    { label: "to_ChangeRecordRefStdBOM", value: "to_ChangeRecordRefStdBOM" },
    { label: "to_ChangeRecordRefVarBOM", value: "to_ChangeRecordRefVarBOM" },
    { label: "to_ChgRecdCollaboration", value: "to_ChgRecdCollaboration" },
    { label: "to_ChgRecdEquipBOM", value: "to_ChgRecdEquipBOM" },
    { label: "to_ChgRecdFuncLocBOM", value: "to_ChgRecdFuncLocBOM" },
    { label: "to_ChgRecdRefEngBOM", value: "to_ChgRecdRefEngBOM" },
    { label: "to_ChgRecdRefMaintTskList", value: "to_ChgRecdRefMaintTskList" },
    { label: "to_ChgRecdRefMfgBOM", value: "to_ChgRecdRefMfgBOM" },
    { label: "to_RefBit", value: "to_RefBit" },
    { label: "to_RefBOM", value: "to_RefBOM" },
    { label: "to_RefDoc", value: "to_RefDoc" },
    { label: "to_RefMat", value: "to_RefMat" },
    { label: "to_RefPSV", value: "to_RefPSV" },
  ],
});

export const projectSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: [
    { label: "ProjectID", value: "ProjectID" },
    { label: "ProjectName", value: "ProjectName" },
    { label: "ProjectStage", value: "ProjectStage" },
    { label: "OrgID", value: "OrgID" },
    { label: "ProjectCategory", value: "ProjectCategory" },
    { label: "Currency", value: "Currency" },
    { label: "StartDate", value: "StartDate" },
    { label: "EndDate", value: "EndDate" },
    { label: "ProjManagerExtId", value: "ProjManagerExtId" },
    { label: "ProjManagerCompCode", value: "ProjManagerCompCode" },
    { label: "Customer", value: "Customer" },
    { label: "CostCenter", value: "CostCenter" },
    { label: "ProfitCenter", value: "ProfitCenter" },
    { label: "ProjAccountantExtId", value: "ProjAccountantExtId" },
    { label: "ProjAccountantCompCode", value: "ProjAccountantCompCode" },
    { label: "ProjControllerExtId", value: "ProjControllerExtId" },
    { label: "ProjControllerCompCode", value: "ProjControllerCompCode" },
    { label: "ProjPartnerExtId", value: "ProjPartnerExtId" },
    { label: "ProjPartnerCompCode", value: "ProjPartnerCompCode" },
    { label: "ProjectDesc", value: "ProjectDesc" },
    { label: "Confidential", value: "Confidential" },
    { label: "UseProjectBilling", value: "UseProjectBilling" },
    { label: "RestrictTimePosting", value: "RestrictTimePosting" },
    { label: "CreatedOn", value: "CreatedOn" },
    { label: "ChangedOn", value: "ChangedOn" },
    { label: "ProjectRoleSet", value: "ProjectRoleSet" },
    { label: "WorkPackageSet", value: "WorkPackageSet" },
  ],
});

export const projectExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand to include related entities",
  collection: "valuelist",
  model: [
    { label: "ProjectRoleSet", value: "ProjectRoleSet" },
    { label: "WorkPackageSet", value: "WorkPackageSet" },
  ],
});

export const changeRecordOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order items by property value",
  collection: "valuelist",
  model: [
    { label: "ChangeRecordUUID", value: "ChangeRecordUUID" },
    { label: "ChangeRecordUUID desc", value: "ChangeRecordUUID desc" },
    { label: "ChangeRecord", value: "ChangeRecord" },
    { label: "ChangeRecord desc", value: "ChangeRecord desc" },
    { label: "ChangeRecordType", value: "ChangeRecordType" },
    { label: "ChangeRecordType desc", value: "ChangeRecordType desc" },
    { label: "ChangeRecordStatus", value: "ChangeRecordStatus" },
    { label: "ChangeRecordStatus desc", value: "ChangeRecordStatus desc" },
    { label: "ChangeNumber", value: "ChangeNumber" },
    { label: "ChangeNumber desc", value: "ChangeNumber desc" },
    { label: "CreatedByUser", value: "CreatedByUser" },
    { label: "CreatedByUser desc", value: "CreatedByUser desc" },
    { label: "CreationDateTime", value: "CreationDateTime" },
    { label: "CreationDateTime desc", value: "CreationDateTime desc" },
    { label: "LastChangedByUser", value: "LastChangedByUser" },
    { label: "LastChangedByUser desc", value: "LastChangedByUser desc" },
    { label: "LastChangeDateTime", value: "LastChangeDateTime" },
    { label: "LastChangeDateTime desc", value: "LastChangeDateTime desc" },
    {
      label: "ChangeRecordLifecycleStatus",
      value: "ChangeRecordLifecycleStatus",
    },
    {
      label: "ChangeRecordLifecycleStatus desc",
      value: "ChangeRecordLifecycleStatus desc",
    },
    { label: "Partner", value: "Partner" },
    { label: "Partner desc", value: "Partner desc" },
    { label: "ChgRecordDescriptionText", value: "ChgRecordDescriptionText" },
    {
      label: "ChgRecordDescriptionText desc",
      value: "ChgRecordDescriptionText desc",
    },
    {
      label: "ChgRecdExpectedCompletionDate",
      value: "ChgRecdExpectedCompletionDate",
    },
    {
      label: "ChgRecdExpectedCompletionDate desc",
      value: "ChgRecdExpectedCompletionDate desc",
    },
  ],
  clean: util.types.toString,
});

export const changeRecordSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: [
    { label: "Update_mc", value: "Update_mc" },
    {
      label: "to_ChangeRecordFuncLocTskList_oc",
      value: "to_ChangeRecordFuncLocTskList_oc",
    },
    {
      label: "to_ChangeRecordRateRtgTskList_oc",
      value: "to_ChangeRecordRateRtgTskList_oc",
    },
    {
      label: "to_ChangeRecordRefCharc_oc",
      value: "to_ChangeRecordRefCharc_oc",
    },
    {
      label: "to_ChangeRecordRefClass_oc",
      value: "to_ChangeRecordRefClass_oc",
    },
    {
      label: "to_ChangeRecordRefEquipTskList_oc",
      value: "to_ChangeRecordRefEquipTskList_oc",
    },
    {
      label: "to_ChangeRecordRefInspPlan_oc",
      value: "to_ChangeRecordRefInspPlan_oc",
    },
    {
      label: "to_ChangeRecordRefLabelSet_oc",
      value: "to_ChangeRecordRefLabelSet_oc",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe_oc",
      value: "to_ChangeRecordRefMasterRecipe_oc",
    },
    {
      label: "to_ChangeRecordRefOpSetTskList_oc",
      value: "to_ChangeRecordRefOpSetTskList_oc",
    },
    {
      label: "to_ChangeRecordRefProdnRouting_oc",
      value: "to_ChangeRecordRefProdnRouting_oc",
    },
    {
      label: "to_ChangeRecordRefRecipe_oc",
      value: "to_ChangeRecordRefRecipe_oc",
    },
    {
      label: "to_ChangeRecordRefSpecification_oc",
      value: "to_ChangeRecordRefSpecification_oc",
    },
    {
      label: "to_ChangeRecordRefStdBOM_oc",
      value: "to_ChangeRecordRefStdBOM_oc",
    },
    {
      label: "to_ChangeRecordRefTmplRouting_oc",
      value: "to_ChangeRecordRefTmplRouting_oc",
    },
    {
      label: "to_ChangeRecordRefVarBOM_oc",
      value: "to_ChangeRecordRefVarBOM_oc",
    },
    {
      label: "to_ChgRecdCollaboration_oc",
      value: "to_ChgRecdCollaboration_oc",
    },
    { label: "to_ChgRecdEquipBOM_oc", value: "to_ChgRecdEquipBOM_oc" },
    { label: "to_ChgRecdFuncLocBOM_oc", value: "to_ChgRecdFuncLocBOM_oc" },
    {
      label: "to_ChgRecdRefCutPlngPrflTskList_oc",
      value: "to_ChgRecdRefCutPlngPrflTskList_oc",
    },
    { label: "to_ChgRecdRefEngBOM_oc", value: "to_ChgRecdRefEngBOM_oc" },
    {
      label: "to_ChgRecdRefMaintTskList_oc",
      value: "to_ChgRecdRefMaintTskList_oc",
    },
    { label: "to_ChgRecdRefMfgBOM_oc", value: "to_ChgRecdRefMfgBOM_oc" },
    { label: "to_ChgRecdRefPlngScp_oc", value: "to_ChgRecdRefPlngScp_oc" },
    {
      label: "to_ChgRecdRefRateRtgTskList_oc",
      value: "to_ChgRecdRefRateRtgTskList_oc",
    },
    { label: "to_ChgRecdWBSElmntBOM_oc", value: "to_ChgRecdWBSElmntBOM_oc" },
    { label: "to_RefBit_oc", value: "to_RefBit_oc" },
    { label: "to_RefBOM_oc", value: "to_RefBOM_oc" },
    { label: "to_RefDoc_oc", value: "to_RefDoc_oc" },
    { label: "to_RefMat_oc", value: "to_RefMat_oc" },
    { label: "to_RefPSV_oc", value: "to_RefPSV_oc" },
    { label: "ChangeRecordUUID", value: "ChangeRecordUUID" },
    { label: "ChangeRecord", value: "ChangeRecord" },
    { label: "ChangeRecordType", value: "ChangeRecordType" },
    { label: "ChangeRecordStatus", value: "ChangeRecordStatus" },
    { label: "ChangeNumber", value: "ChangeNumber" },
    { label: "CreatedByUser", value: "CreatedByUser" },
    { label: "CreationDateTime", value: "CreationDateTime" },
    { label: "LastChangedByUser", value: "LastChangedByUser" },
    { label: "LastChangeDateTime", value: "LastChangeDateTime" },
    {
      label: "ChangeRecordLifecycleStatus",
      value: "ChangeRecordLifecycleStatus",
    },
    { label: "Partner", value: "Partner" },
    { label: "ChgRecordDescriptionText", value: "ChgRecordDescriptionText" },
    {
      label: "ChangeRecordDetailDescription",
      value: "ChangeRecordDetailDescription",
    },
    {
      label: "ChgRecdExpectedCompletionDate",
      value: "ChgRecdExpectedCompletionDate",
    },
    {
      label: "to_ChangeRecordFuncLocTskList",
      value: "to_ChangeRecordFuncLocTskList",
    },
    { label: "to_ChangeRecordRefCharc", value: "to_ChangeRecordRefCharc" },
    { label: "to_ChangeRecordRefClass", value: "to_ChangeRecordRefClass" },
    {
      label: "to_ChangeRecordRefEquipTskList",
      value: "to_ChangeRecordRefEquipTskList",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe",
      value: "to_ChangeRecordRefMasterRecipe",
    },
    {
      label: "to_ChangeRecordRefProdnRouting",
      value: "to_ChangeRecordRefProdnRouting",
    },
    { label: "to_ChangeRecordRefStdBOM", value: "to_ChangeRecordRefStdBOM" },
    { label: "to_ChangeRecordRefVarBOM", value: "to_ChangeRecordRefVarBOM" },
    { label: "to_ChgRecdCollaboration", value: "to_ChgRecdCollaboration" },
    { label: "to_ChgRecdEquipBOM", value: "to_ChgRecdEquipBOM" },
    { label: "to_ChgRecdFuncLocBOM", value: "to_ChgRecdFuncLocBOM" },
    { label: "to_ChgRecdRefEngBOM", value: "to_ChgRecdRefEngBOM" },
    { label: "to_ChgRecdRefMaintTskList", value: "to_ChgRecdRefMaintTskList" },
    { label: "to_ChgRecdRefMfgBOM", value: "to_ChgRecdRefMfgBOM" },
    { label: "to_RefBit", value: "to_RefBit" },
    { label: "to_RefBOM", value: "to_RefBOM" },
    { label: "to_RefDoc", value: "to_RefDoc" },
    { label: "to_RefMat", value: "to_RefMat" },
    { label: "to_RefPSV", value: "to_RefPSV" },
  ],
  clean: util.types.toString,
});

export const changeRecordExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: [
    {
      label: "to_ChangeRecordFuncLocTskList",
      value: "to_ChangeRecordFuncLocTskList",
    },
    { label: "to_ChangeRecordRefCharc", value: "to_ChangeRecordRefCharc" },
    { label: "to_ChangeRecordRefClass", value: "to_ChangeRecordRefClass" },
    {
      label: "to_ChangeRecordRefEquipTskList",
      value: "to_ChangeRecordRefEquipTskList",
    },
    {
      label: "to_ChangeRecordRefMasterRecipe",
      value: "to_ChangeRecordRefMasterRecipe",
    },
    {
      label: "to_ChangeRecordRefProdnRouting",
      value: "to_ChangeRecordRefProdnRouting",
    },
    { label: "to_ChangeRecordRefStdBOM", value: "to_ChangeRecordRefStdBOM" },
    { label: "to_ChangeRecordRefVarBOM", value: "to_ChangeRecordRefVarBOM" },
    { label: "to_ChgRecdCollaboration", value: "to_ChgRecdCollaboration" },
    { label: "to_ChgRecdEquipBOM", value: "to_ChgRecdEquipBOM" },
    { label: "to_ChgRecdFuncLocBOM", value: "to_ChgRecdFuncLocBOM" },
    { label: "to_ChgRecdRefEngBOM", value: "to_ChgRecdRefEngBOM" },
    { label: "to_ChgRecdRefMaintTskList", value: "to_ChgRecdRefMaintTskList" },
    { label: "to_ChgRecdRefMfgBOM", value: "to_ChgRecdRefMfgBOM" },
    { label: "to_RefBit", value: "to_RefBit" },
    { label: "to_RefBOM", value: "to_RefBOM" },
    { label: "to_RefDoc", value: "to_RefDoc" },
    { label: "to_RefMat", value: "to_RefMat" },
    { label: "to_RefPSV", value: "to_RefPSV" },
  ],
  clean: util.types.toString,
});

export const listPurchaseRequisitionsOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order items by property value",
  collection: "valuelist",
  model: [
    { label: "PurchaseRequisition", value: "PurchaseRequisition" },
    {
      label: "PurchaseRequisition desc",
      value: "PurchaseRequisition desc",
    },
    {
      label: "PurchaseRequisitionType",
      value: "PurchaseRequisitionType",
    },
    {
      label: "PurchaseRequisitionType desc",
      value: "PurchaseRequisitionType desc",
    },
    { label: "PurReqnDescription", value: "PurReqnDescription" },
    {
      label: "PurReqnDescription desc",
      value: "PurReqnDescription desc",
    },
    { label: "SourceDetermination", value: "SourceDetermination" },
    {
      label: "SourceDetermination desc",
      value: "SourceDetermination desc",
    },
    {
      label: "PurReqnDoOnlyValidation",
      value: "PurReqnDoOnlyValidation",
    },
    {
      label: "PurReqnDoOnlyValidation desc",
      value: "PurReqnDoOnlyValidation desc",
    },
  ],
  clean: util.types.toString,
});

export const listPurchaseRequisitionSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: [
    { label: "PurchaseRequisition", value: "PurchaseRequisition" },
    {
      label: "PurchaseRequisitionType",
      value: "PurchaseRequisitionType",
    },
    { label: "PurReqnDescription", value: "PurReqnDescription" },
    { label: "SourceDetermination", value: "SourceDetermination" },
    {
      label: "PurReqnDoOnlyValidation",
      value: "PurReqnDoOnlyValidation",
    },
    { label: "to_PurchaseReqnItem", value: "to_PurchaseReqnItem" },
  ],
  clean: util.types.toString,
});

export const listPurchaseRequisitionExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: [
    {
      label: "to_PurchaseReqnItem",
      value: "to_PurchaseReqnItem",
    },
  ],
  clean: util.types.toString,
});

export const purchaseRequisitionNumberInput = input({
  label: "Purchase Requisition Number",
  placeholder: "123123123123",
  type: "string",
  required: true,
  comments: "Purchase Requisition Number",
  dataSource: "selectPurchaseRequisition",
  clean: util.types.toString,
});

export const getPurchaseRequisitionItemDetailsOrderBy = input({
  label: "Order By",
  placeholder: "Order By",
  type: "string",
  required: false,
  comments: "Order items by property value",
  collection: "valuelist",
  model: GET_PURCHASE_REQUISITION_ITEM_DETAILS_ORDER_BY_MODEL,
  clean: util.types.toString,
});

export const getPurchaseRequisitionItemDetailsSelect = input({
  label: "Select",
  placeholder: "Select",
  type: "string",
  required: false,
  comments: "Select property to be returned",
  collection: "valuelist",
  model: GET_PURCHASE_REQUISITION_ITEM_DETAILS_SELECT_MODEL,
  clean: util.types.toString,
});

export const getPurchaseRequisitionItemDetailsExpand = input({
  label: "Expand",
  placeholder: "Expand",
  type: "string",
  required: false,
  comments: "Expand property to be returned",
  collection: "valuelist",
  model: GET_PURCHASE_REQUISITION_ITEM_DETAILS_EXPAND_MODEL,
  clean: util.types.toString,
});

export const recordType = input({
  label: "Record Type",
  type: "string",
  comments: "Type of SAP S/4HANA Record, e.g: WorkItemSet",
  required: true,
  default: "WorkItemSet",
  clean: util.types.toString,
});

export const recordId = input({
  label: "Record ID",
  type: "string",
  comments: "ID number tied to the record",
  required: true,
  default: "12312313",
  clean: util.types.toString,
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new and updated records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include updated records in trigger results.",
  clean: util.types.toBool,
});
