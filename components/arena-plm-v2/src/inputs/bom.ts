import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  attributeDefinitionsInput,
  connectionInput,
  includeEmptyAdditionalAttributesInput,
  itemGuidInput,
  setNullInput,
} from "./common";
const bomItemGuidInput = input({
  label: "BOM Item GUID",
  type: "string",
  required: true,
  placeholder: "Enter BOM item GUID",
  comments: "GUID of the item to add to the BOM.",
  example: "BM1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const bomRefDesInput = input({
  label: "Reference Designator",
  type: "string",
  required: false,
  placeholder: "Enter reference designator",
  comments: "Reference designator for the BOM line (e.g., R1, C2, U5).",
  example: "R1, R2, R3",
  clean: toOptionalString,
});
const bomQuantityInput = input({
  label: "Quantity",
  type: "string",
  required: false,
  placeholder: "Enter quantity",
  comments: "Quantity of the item in the BOM.",
  example: "2.5",
  default: "1",
  clean: toOptionalNumber,
});
const bomNotesInput = input({
  label: "Notes",
  type: "text",
  required: false,
  placeholder: "Enter BOM line notes",
  comments: "Additional notes for the BOM line.",
  example: "Use high-precision resistors",
  clean: toOptionalString,
});
const bomLineGuidInput = input({
  label: "BOM Line GUID",
  type: "string",
  required: true,
  placeholder: "Enter BOM line GUID",
  comments: "GUID of the BOM line to retrieve, update, or delete.",
  example: "BM4XIKY75ZITAA28ZABJKCAT",
  clean: util.types.toString,
});
const substituteGuidInput = input({
  label: "Substitute GUID",
  type: "string",
  required: true,
  placeholder: "Enter substitute GUID",
  comments: "GUID of the BOM substitute to retrieve, update, or delete.",
  example: "BMSJ6Z57GF3S43WZZ58HQ59S",
  clean: util.types.toString,
});
const substituteRankInput = input({
  label: "Substitute Rank",
  type: "string",
  required: false,
  placeholder: "Enter substitute rank",
  comments:
    "Ranking order of the substitute (1 = primary, 2 = secondary, etc.).",
  example: "1",
  clean: toOptionalNumber,
});
const includeBomSubstitutesInput = input({
  label: "Include BOM Substitutes",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, substitute components are included in the BOM line response.",
  clean: util.types.toBool,
});
const includeAdditionalAttributesInput = input({
  label: "Include Additional Attributes",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, additional attributes are included in the response.",
  clean: util.types.toBool,
});
const automaticallyGenerateLineNumbersInput = input({
  label: "Automatically Generate Line Numbers",
  type: "boolean",
  required: false,
  comments:
    "When true, line numbers are automatically generated for BOM lines.",
  clean: util.types.toBool,
});
const checkReferenceDesignatorsInput = input({
  label: "Check Reference Designators",
  type: "boolean",
  required: false,
  comments: "When true, reference designators are checked in the BOM.",
  clean: util.types.toBool,
});
export const createBomLineInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomItemGuid: bomItemGuidInput,
  refDes: bomRefDesInput,
  quantity: bomQuantityInput,
  notes: bomNotesInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const createBomSubstituteInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  bomItemGuid: bomItemGuidInput,
  quantity: bomQuantityInput,
  notes: bomNotesInput,
  rank: substituteRankInput,
};
export const deleteBomLineInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
};
export const deleteBomSubstituteInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  substituteGuid: substituteGuidInput,
};
export const listBomInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  includeAdditionalAttributes: includeAdditionalAttributesInput,
};
export const getBomLineInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
  includeBomSubstitutes: includeBomSubstitutesInput,
};
export const getBomSettingsInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
};
export const getBomSubstituteInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  substituteGuid: substituteGuidInput,
};
export const listBomSubstitutesInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
};
export const updateBomLineInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  refDes: bomRefDesInput,
  quantity: bomQuantityInput,
  notes: bomNotesInput,
  setNull: setNullInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const updateBomSettingsInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  automaticallyGenerateLineNumbers: automaticallyGenerateLineNumbersInput,
  checkReferenceDesignators: checkReferenceDesignatorsInput,
};
export const updateBomSubstituteInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  bomLineGuid: bomLineGuidInput,
  substituteGuid: substituteGuidInput,
  quantity: bomQuantityInput,
  notes: bomNotesInput,
  rank: substituteRankInput,
};
