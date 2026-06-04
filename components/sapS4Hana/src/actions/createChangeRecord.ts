import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput, projectId } from "../inputs";

export const createChangeRecord = action({
  display: {
    label: "Create Change Record",
    description: "Creates a change record.",
  },
  perform: async (_context, { requestBodyCode, connectionInput }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        "/sap/opu/odata/sap/API_CHANGE_RECORD/A_ChangeRecord",
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: `{
        "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "ChangeRecord": "string",
        "ChangeRecordType": "string",
        "ChangeRecordStatus": "string",
        "ChangeNumber": "string",
        "ChangeRecordLifecycleStatus": "string",
        "Partner": "string",
        "ChgRecordDescriptionText": "string",
        "ChangeRecordDetailDescription": "string",
        "ChgRecdExpectedCompletionDate": "/Date(1492041600000)/",
        "to_ChangeRecordFuncLocTskList": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "FuncLocTskListGroup": "string",
                 "FuncLocTskList": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChangeRecordRefCharc": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "Characteristic": "string",
                 "ChangeNumber": "string",
                 "CharcDataType": "string",
                 "CharcStatus": "string",
                 "ValidityStartDate": "/Date(1492041600000)/",
                 "CharcInternalID": "string",
                 "CharcDecimals": 0,
                 "CharcLength": 0,
                 "CharcValueUnit": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordReference": "string",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "CreationDate": "/Date(1492041600000)/",
                 "LastChangeDate": "/Date(1492041600000)/",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChangeRecordRefClass": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "Class": "string",
                 "ClassType": "string",
                 "ChangeNumber": "string",
                 "ClassName": "string",
                 "ClassTypeName": "string",
                 "ValidityStartDate": "/Date(1492041600000)/",
                 "ClassStatus": "string",
                 "ClassStatusName": "string",
                 "ClassInternalID": "string",
                 "ChangeRecordItemProcgStatus": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordReference": "string",
                 "ChangeRecordStatus": "string",
                 "CreationDate": "/Date(1492041600000)/",
                 "LastChangeDate": "/Date(1492041600000)/",
                 "ChangeRecordVirtualRefInd": "string"
              }
           ]
        },
        "to_ChangeRecordRefEquipTskList": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "EquipmentTskListGroup": "string",
                 "EquipmentTskList": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChangeRecordRefMasterRecipe": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "MasterRecipeGroup": "string",
                 "MasterRecipe": "string",
                 "ChangeRecordItemProcgStatus": "string",
                 "ChangeRecordItemRelevance": "string"
              }
           ]
        },
        "to_ChangeRecordRefProdnRouting": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "BillOfOperationsGroup": "string",
                 "BillOfOperationsVariant": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChangeRecordRefStdBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "StandardObject": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeNumber": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChangeRecordRefVarBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordReference": "string",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "BillOfMaterialCategory": "string",
                 "ChangeNumber": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "BillOfMaterial": "string",
                 "Material": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChgRecdCollaboration": {
           "results": [
              {
                 "ChgRecdPLMEPDCollabnUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChgRecdPLMEPDCollabnType": "string",
                 "CreatedByUser": "string",
                 "CreationDateTime": "/Date(1492098664000)/",
                 "ChgRecdPLMEPDCollabnSourceID": "string",
                 "ChgRecdPLMEPDCollabnID": "string"
              }
           ]
        },
        "to_ChgRecdEquipBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "Equipment": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordReference": "string",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "BillOfMaterialCategory": "string",
                 "ChangeNumber": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "BillOfMaterial": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChgRecdFuncLocBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "FunctionalLocation": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordReference": "string",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "BillOfMaterialCategory": "string",
                 "ChangeNumber": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "BillOfMaterial": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChgRecdRefEngBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "Material": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "BillOfMaterial": "string",
                 "BillOfMaterialCategory": "string",
                 "BillOfMaterialVersion": "string",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChgRecdRefMaintTskList": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "RefMaintTskListGroup": "string",
                 "RefMaintTskList": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_ChgRecdRefMfgBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "Material": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "BillOfMaterial": "string",
                 "BillOfMaterialCategory": "string",
                 "BillOfMaterialVersion": "string",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "ChangeRecordReferenceSubtype": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ParentChangeRecordRefUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "IsMainReference": "string",
                 "ChangeRecordVirtualRefInd": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_RefBit": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "BillOfMaterialItemNumber": "string",
                 "BillOfMaterialComponent": "string",
                 "Material": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecordItemRelevance": "string"
              }
           ]
        },
        "to_RefBOM": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "Material": "string",
                 "Plant": "string",
                 "BillOfMaterialVariantUsage": "string",
                 "BillOfMaterialVariant": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_RefDoc": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "DocumentInfoRecord": "string",
                 "DocumentType": "string",
                 "DocumentPart": "string",
                 "DocumentVersion": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ExternalDocumentStatus": "string"
              }
           ]
        },
        "to_RefMat": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordReferenceType": "string",
                 "Material": "string",
                 "MaterialType": "string",
                 "BaseUnit": "string",
                 "MaterialStatus": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordItemProcgStatus": "string"
              }
           ]
        },
        "to_RefPSV": {
           "results": [
              {
                 "ChangeRecordReferenceUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecordUUID": "01234567-89ab-cdef-0123-456789abcdef",
                 "ChangeRecord": "string",
                 "ChangeRecordReferenceType": "string",
                 "Material": "string",
                 "Class": "string",
                 "ProductStructureNodeName": "string",
                 "ProdStrucNodeDescription": "string",
                 "ProductStructureVariantName": "string",
                 "ProdStrucVariantDescription": "string",
                 "ProdStrucVariantChangeNumber": "string",
                 "ChangeRecordItemRelevance": "string",
                 "ChangeRecordRefObjectUUID": "01234567-89ab-cdef-0123-456789abcdef"
              }
           ]
        }
     }`,
    },
    connectionInput,
    projectId,
  },
});
