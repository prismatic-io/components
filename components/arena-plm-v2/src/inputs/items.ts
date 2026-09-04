import { input, util } from "@prismatic-io/spectral";
import {
  toKeyValueListArray,
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
} from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  attributeDefinitionsInput,
  categoryGuidInput,
  connectionInput,
  fetchAllInput,
  fileAuthorFullNameInput,
  fileCategoryGuidInput,
  fileDescriptionInput,
  fileEditionInput,
  fileFormatInput,
  fileInput,
  filePrivateInput,
  fileStorageMethodNameInput,
  fileTitleInput,
  guidInput,
  includeChildCategoriesInput,
  includeEmptyAdditionalAttributesInput,
  itemGuidInput,
  latestEditionAssociationInput,
  nameInput,
  pagination,
  primaryFileInput,
} from "./common";
const itemNameOptionalInput = input({
  label: "Item Name",
  type: "string",
  required: false,
  placeholder: "Enter item name (or include in JSON payload)",
  comments:
    "The name/title of the item to create. If provided, overrides the name in JSON payload.",
  example: "Circuit Board Assembly v2.1",
  clean: toOptionalString,
});
const itemJsonInput = input({
  label: "Item JSON Payload",
  type: "text",
  required: false,
  placeholder: "Enter complete item JSON payload",
  comments:
    "Complete JSON payload for item creation. Core attribute inputs will override values in this JSON if provided.",
  example: JSON.stringify(
    {
      name: "Circuit Board Assembly",
      description: "Main circuit board",
      category: { guid: "abc123" },
      additionalAttributes: [
        { guid: "custom-attr-guid", value: "custom value" },
      ],
    },
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      return null;
    }
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value.trim());
        return parsed;
      } catch {
        return value.trim();
      }
    }
    return value;
  },
});
const itemNameInput = input({
  label: "Item Name",
  type: "string",
  required: true,
  placeholder: "Enter item name",
  comments: "The name/title of the item to create.",
  example: "Circuit Board Assembly v2.1",
  clean: util.types.toString,
});
const itemDescriptionInput = input({
  label: "Item Description",
  type: "text",
  required: false,
  placeholder: "Enter item description",
  comments: "Detailed description of the item.",
  example: "Main circuit board assembly for product revision 2.1",
  clean: toOptionalString,
});
const itemRevisionNumberInput = input({
  label: "Revision Number",
  type: "string",
  required: false,
  placeholder: "Enter revision number",
  comments: "Revision number for the item (if not auto-generated).",
  example: "A",
  clean: toOptionalString,
});
const itemCategoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: false,
  placeholder: "Enter category GUID",
  comments: "GUID of the category to assign to this item.",
  example: "IT1AB2CD3EF4GH5IJ6KL7MN8",
  clean: toOptionalString,
});
const itemSharedInput = input({
  label: "Shared Item",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, this item is shared across workspaces.",
  clean: util.types.toBool,
});
const itemOffTheShelfInput = input({
  label: "Off The Shelf",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, this is an off-the-shelf item.",
  clean: util.types.toBool,
});
const itemUomInput = input({
  label: "Unit of Measure",
  type: "string",
  required: false,
  placeholder: "Enter unit of measure",
  comments: "Unit of measure for the item (e.g., 'EA', 'LB', 'FT').",
  example: "EA",
  clean: toOptionalString,
});
const itemProductionCostInput = input({
  label: "Production Cost",
  type: "string",
  required: false,
  placeholder: "Enter production cost",
  comments: "Production cost of the item.",
  example: "25.50",
  clean: toOptionalNumber,
});
const itemPrototypeCostInput = input({
  label: "Prototype Cost",
  type: "string",
  required: false,
  placeholder: "Enter prototype cost",
  comments: "Prototype cost of the item.",
  example: "125.00",
  clean: toOptionalNumber,
});
const itemTargetPriceInput = input({
  label: "Target Price",
  type: "string",
  required: false,
  placeholder: "Enter target price",
  comments: "Target selling price of the item.",
  example: "45.00",
  clean: toOptionalNumber,
});
const itemTargetCostInput = input({
  label: "Target Cost",
  type: "string",
  required: false,
  placeholder: "Enter target cost",
  comments: "Target cost of the item.",
  example: "30.00",
  clean: toOptionalNumber,
});
const itemStandardCostInput = input({
  label: "Standard Cost",
  type: "string",
  required: false,
  placeholder: "Enter standard cost",
  comments: "Standard cost of the item.",
  example: "28.75",
  clean: toOptionalNumber,
});
const itemOwnerFullNameInput = input({
  label: "Owner Full Name",
  type: "string",
  required: false,
  placeholder: "Enter owner full name",
  comments: "Full name of the user who will own this item.",
  example: "John Doe",
  clean: toOptionalString,
});
const itemNumberFormatGuidInput = input({
  label: "Number Format GUID",
  type: "string",
  required: false,
  placeholder: "Enter number format GUID",
  comments: "GUID of the number format to use for generating the item number.",
  example: "IT4IVLHFUC584FSNJJLVR6I2",
  clean: toOptionalString,
});
const itemNumberFormatFieldsInput = input({
  label: "Number Format Fields",
  placeholder: "Enter number format fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Fields for the number format. Key should be the field GUID, value should be the field value.",
  example: "K2M5JGKMXEVI1K2AXGLN: 999-0011",
  clean: toKeyValueListArray,
});
const itemFileAssociationGuidInput = input({
  label: "Item File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter item file association GUID",
  comments: "GUID of the item file association.",
  example: "IT1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const itemUpdateNameInput = input({
  label: "Item Name",
  type: "string",
  required: false,
  placeholder: "Enter item name",
  comments: "The name/title of the item (optional for updates).",
  example: "Circuit Board Assembly v2.1",
  clean: toOptionalString,
});
const itemSearchNumberInput = input({
  label: "Item Number",
  type: "string",
  required: false,
  placeholder: "Enter item number",
  comments: "Search for items with specific number.",
  example: "IT-001",
  clean: toOptionalString,
});
const itemSearchNameInput = input({
  label: "Item Name",
  type: "string",
  required: false,
  placeholder: "Enter item name",
  comments: "Search for items with specific name.",
  example: "Circuit Board Assembly",
  clean: toOptionalString,
});
const itemSearchDescriptionInput = input({
  label: "Description",
  type: "string",
  required: false,
  placeholder: "Enter description",
  comments: "Search for items with specific description.",
  example: "Main circuit board",
  clean: toOptionalString,
});
const itemSearchCategoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: false,
  placeholder: "Enter category GUID",
  comments: "Filter items by category GUID.",
  example: "IT1AB2CD3EF4GH5IJ6KL7MN8",
  clean: toOptionalString,
});
const itemSearchCategoryNameInput = input({
  label: "Category Name",
  type: "string",
  required: false,
  placeholder: "Enter category name",
  comments: "Filter items by category name.",
  example: "Electronics",
  clean: toOptionalString,
});
const itemSearchRevisionNumberInput = input({
  label: "Revision Number",
  type: "string",
  required: false,
  placeholder: "Enter revision number",
  comments: "Filter items by revision number.",
  example: "A",
  clean: toOptionalString,
});
const itemSearchLifecyclePhaseGuidInput = input({
  label: "Lifecycle Phase GUID",
  type: "string",
  required: false,
  placeholder: "Enter lifecycle phase GUID",
  comments: "Filter items by lifecycle phase GUID.",
  example: "IT9X6BKEEHKSJRHQRIRF3FUR",
  clean: toOptionalString,
});
const itemSearchLifecyclePhaseStageInput = input({
  label: "Lifecycle Phase Stage",
  type: "string",
  required: false,
  placeholder: "Enter lifecycle phase stage",
  comments: "Filter items by lifecycle phase stage.",
  example: "Production",
  clean: toOptionalString,
});
const itemSearchOwnerFullNameInput = input({
  label: "Owner Full Name",
  type: "string",
  required: false,
  placeholder: "Enter owner full name",
  comments: "Filter items by owner's full name.",
  example: "John Doe",
  clean: toOptionalString,
});
const itemSearchCreatorEmailInput = input({
  label: "Creator Email",
  type: "string",
  required: false,
  placeholder: "Enter creator email",
  comments: "Filter items by creator's email.",
  example: "john.doe@company.com",
  clean: toOptionalString,
});
const itemSearchCreatorGuidInput = input({
  label: "Creator GUID",
  type: "string",
  required: false,
  placeholder: "Enter creator GUID",
  comments: "Filter items by creator's GUID.",
  example: "ITP4F558HNQZKLNN3R2UQFDY",
  clean: toOptionalString,
});
const itemSearchCreatorFullNameInput = input({
  label: "Creator Full Name",
  type: "string",
  required: false,
  placeholder: "Enter creator full name",
  comments: "Filter items by creator's full name.",
  example: "Jane Smith",
  clean: toOptionalString,
});
const itemSearchModifiedBomInput = input({
  label: "Modified BOM",
  type: "string",
  required: false,
  comments: "Filter items by whether BOM is modified.",
  model: [
    { label: "N/A", value: "na" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
const itemSearchModifiedFilesInput = input({
  label: "Modified Files",
  type: "string",
  required: false,
  comments: "Filter items by whether files are modified.",
  model: [
    { label: "N/A", value: "na" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
const itemSearchModifiedSourcingInput = input({
  label: "Modified Sourcing",
  type: "string",
  required: false,
  comments: "Filter items by whether sourcing is modified.",
  model: [
    { label: "N/A", value: "na" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
const itemSearchModifiedSpecsInput = input({
  label: "Modified Specs",
  type: "string",
  required: false,
  comments: "Filter items by whether specs are modified.",
  model: [
    { label: "N/A", value: "na" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
const itemSearchInAssemblyInput = input({
  label: "In Assembly",
  type: "string",
  required: false,
  comments: "Filter items by whether they are in an assembly.",
  model: [
    { label: "N/A", value: "na" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  default: "na",
  clean: toOptionalBoolean,
});
const itemSearchAssemblyTypeInput = input({
  label: "Assembly Type",
  type: "string",
  required: false,
  comments: "Filter items by assembly type.",
  model: [
    { label: "Top Level Assembly", value: "TOP_LEVEL_ASSEMBLY" },
    { label: "Sub Assembly", value: "SUB_ASSEMBLY" },
    { label: "Not An Assembly", value: "NOT_AN_ASSEMBLY" },
  ],
  clean: toOptionalString,
});
const itemSearchEffectiveDateTimeInput = input({
  label: "Effective Date Time",
  type: "string",
  required: false,
  placeholder: "Enter effective date time (ISO format)",
  comments: "Filter items by effective date time in ISO format.",
  example: "2025-08-15T10:00:00Z",
  clean: toOptionalString,
});
const responseViewInput = input({
  label: "Response View",
  type: "string",
  required: false,
  placeholder: "Enter response view",
  comments:
    "The Arena response view to request, which controls which fields are returned for each record.",
  example: "compact",
  clean: toOptionalString,
});
const itemLifecyclePhaseGuidInput = input({
  label: "Target Lifecycle Phase GUID",
  type: "string",
  required: true,
  placeholder: "Enter target lifecycle phase GUID",
  comments: "The GUID of the target lifecycle phase to transition the item to.",
  example: "ITUBMHBI4KB7XU873JRVNZ2K",
  clean: util.types.toString,
});
const itemLifecycleRevisionNumberInput = input({
  label: "Revision Number",
  type: "string",
  required: false,
  placeholder: "Enter revision number",
  comments:
    "Optional revision number for the new revision (if not auto-generated).",
  example: "B",
  clean: toOptionalString,
});
const itemLifecycleNotesInput = input({
  label: "Notes",
  type: "text",
  required: false,
  placeholder: "Enter lifecycle change notes",
  comments: "Optional notes for the lifecycle phase change.",
  example: "Released to production for initial launch",
  clean: toOptionalString,
});
const itemLifecycleProceedOnNoticeInput = input({
  label: "Proceed on Notice",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, the request proceeds even if it generates notices, which are warnings that do not prevent execution.",
  clean: util.types.toBool,
});
const itemImageContentInput = input({
  label: "Image Content",
  type: "data",
  required: true,
  comments: "The image file content to upload, base64 encoded.",
  clean: util.types.toString,
});
const itemImageFilenameInput = input({
  label: "Filename",
  placeholder: "Enter filename",
  type: "string",
  required: false,
  comments: "The filename for the image (e.g., 'thumbnail.jpg').",
  example: "specification.pdf",
  clean: toOptionalString,
});
const formatGuidInput = input({
  label: "Format GUID",
  type: "string",
  required: true,
  placeholder: "Enter the number format GUID",
  comments: "The GUID of the item number format.",
  example: "IT4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const numberFormatFieldDataInput = input({
  label: "Field Data",
  type: "data",
  required: true,
  comments: "The field data to create (name, fieldType, etc.).",
  clean: util.types.toObject,
});
const numberReservationDataInput = input({
  label: "Reservation Data",
  type: "data",
  required: true,
  comments: "The reservation data to create (name, category, etc.).",
  clean: util.types.toObject,
});
const numberFormatFieldGuidInput = input({
  label: "Field GUID",
  type: "string",
  required: true,
  placeholder: "Enter the field GUID",
  comments: "The GUID of the number format field.",
  example: "IT4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const numberFormatActiveInput = input({
  label: "Active Only",
  type: "string",
  required: false,
  comments: "Filter to only active number formats.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
    { label: "All", value: "" },
  ],
  default: "",
  clean: toOptionalString,
});
const includeItemNumbersInput = input({
  label: "Include Item Numbers",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, item numbers are included in the response.",
  clean: util.types.toBool,
});
const itemFileAssocPrimaryInput = input({
  label: "Primary",
  type: "boolean",
  required: false,
  comments:
    "When true, the associated file becomes the primary file in the relationship.",
  clean: util.types.toBool,
});
export const changeItemLifecyclePhaseInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  toLifecyclePhaseGuid: itemLifecyclePhaseGuidInput,
  revisionNumber: itemLifecycleRevisionNumberInput,
  notes: itemLifecycleNotesInput,
  proceedOnNotice: itemLifecycleProceedOnNoticeInput,
};
export const createItemInputs = {
  connection: connectionInput,
  name: itemNameInput,
  description: itemDescriptionInput,
  revisionNumber: itemRevisionNumberInput,
  categoryGuid: itemCategoryGuidInput,
  shared: itemSharedInput,
  offTheShelf: itemOffTheShelfInput,
  uom: itemUomInput,
  productionCost: itemProductionCostInput,
  prototypeCost: itemPrototypeCostInput,
  targetPrice: itemTargetPriceInput,
  targetCost: itemTargetCostInput,
  standardCost: itemStandardCostInput,
  ownerFullName: itemOwnerFullNameInput,
  numberFormatGuid: itemNumberFormatGuidInput,
  numberFormatFields: itemNumberFormatFieldsInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const createItemFileAssociationInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  file: fileInput,
  title: fileTitleInput,
  description: fileDescriptionInput,
  format: fileFormatInput,
  isPrivate: filePrivateInput,
  authorFullName: fileAuthorFullNameInput,
  categoryGuid: fileCategoryGuidInput,
  storageMethodName: fileStorageMethodNameInput,
  edition: fileEditionInput,
  latestEditionAssociation: latestEditionAssociationInput,
  primary: primaryFileInput,
};
export const createItemFromJsonInputs = {
  connection: connectionInput,
  itemJson: itemJsonInput,
  name: itemNameOptionalInput,
  description: itemDescriptionInput,
  revisionNumber: itemRevisionNumberInput,
  categoryGuid: itemCategoryGuidInput,
  shared: itemSharedInput,
  offTheShelf: itemOffTheShelfInput,
  uom: itemUomInput,
  productionCost: itemProductionCostInput,
  prototypeCost: itemPrototypeCostInput,
  targetPrice: itemTargetPriceInput,
  targetCost: itemTargetCostInput,
  standardCost: itemStandardCostInput,
  ownerFullName: itemOwnerFullNameInput,
  numberFormatGuid: itemNumberFormatGuidInput,
  numberFormatFields: itemNumberFormatFieldsInput,
};
export const createItemImageInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to add an image to.",
  },
  content: itemImageContentInput,
  filename: itemImageFilenameInput,
};
export const createItemNumberFormatFieldInputs = {
  connection: connectionInput,
  formatGuid: {
    ...formatGuidInput,
    comments: "The GUID of the item number format to add field to.",
  },
  fieldData: numberFormatFieldDataInput,
};
export const createItemNumberReservationInputs = {
  connection: connectionInput,
  reservationData: numberReservationDataInput,
};
export const deleteItemInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
};
export const deleteItemFileAssociationInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  itemFileAssociationGuid: itemFileAssociationGuidInput,
};
export const deleteItemImageInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to remove the image from.",
  },
};
export const getItemByGuidInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
  responseView: responseViewInput,
};
export const getItemFileAssociationInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  itemFileAssociationGuid: itemFileAssociationGuidInput,
};
export const listItemFileAssociationsInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
};
export const listItemFutureChangesInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get future changes for.",
  },
};
export const listItemHistoryInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get history for.",
  },
};
export const getItemImageContentInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get image content for.",
  },
};
export const listItemLifecyclePhasesInputs = {
  connection: connectionInput,
};
export const getItemNumberFormatByGuidInputs = {
  connection: connectionInput,
  guid: {
    ...guidInput,
    label: "Number Format GUID",
    required: true,
    placeholder: "Enter number format GUID",
    comments: "The GUID of the number format to retrieve.",
    clean: util.types.toString,
  },
};
export const getItemNumberFormatFieldInputs = {
  connection: connectionInput,
  formatGuid: formatGuidInput,
  fieldGuid: numberFormatFieldGuidInput,
};
export const listItemNumberFormatFieldsInputs = {
  connection: connectionInput,
  formatGuid: {
    ...formatGuidInput,
    comments: "The GUID of the item number format to get fields for.",
  },
};
export const listItemNumberFormatsInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Name Filter",
    placeholder: "Enter number format name",
    comments: "Filter number formats by name.",
  },
  active: numberFormatActiveInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listItemNumberReservationsInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Name Filter",
    placeholder: "Enter name filter",
    comments: "Filter by reservation name.",
  },
  categoryGuid: {
    ...categoryGuidInput,
    comments: "Filter by category GUID.",
  },
  includeItemNumbers: includeItemNumbersInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listItemRequirementsInputs = {
  connection: connectionInput,
};
export const getItemRevisionsInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get revisions for.",
  },
};
export const listItemsInputs = {
  connection: connectionInput,
  number: itemSearchNumberInput,
  name: itemSearchNameInput,
  description: itemSearchDescriptionInput,
  categoryGuid: itemSearchCategoryGuidInput,
  categoryName: itemSearchCategoryNameInput,
  revisionNumber: itemSearchRevisionNumberInput,
  lifecyclePhaseGuid: itemSearchLifecyclePhaseGuidInput,
  lifecyclePhaseStage: itemSearchLifecyclePhaseStageInput,
  ownerFullName: itemSearchOwnerFullNameInput,
  creatorEmail: itemSearchCreatorEmailInput,
  creatorGuid: itemSearchCreatorGuidInput,
  creatorFullName: itemSearchCreatorFullNameInput,
  modifiedBom: itemSearchModifiedBomInput,
  modifiedFiles: itemSearchModifiedFilesInput,
  modifiedSourcing: itemSearchModifiedSourcingInput,
  modifiedSpecs: itemSearchModifiedSpecsInput,
  inAssembly: itemSearchInAssemblyInput,
  assemblyType: itemSearchAssemblyTypeInput,
  effectiveDateTime: itemSearchEffectiveDateTimeInput,
  responseView: responseViewInput,
  fetchAll: fetchAllInput,
  pagination,
  includeChildCategories: {
    ...includeChildCategoriesInput,
    comments: "When true, items from child categories are included.",
  },
};
export const listItemTrainingPlansInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get training plans for.",
  },
};
export const listItemTrainingRecordsInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to get training records for.",
  },
};
export const listItemWhereUsedInputs = {
  connection: connectionInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "The GUID of the item to find where it's used.",
  },
};
export const updateItemInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  name: itemUpdateNameInput,
  description: itemDescriptionInput,
  revisionNumber: itemRevisionNumberInput,
  categoryGuid: itemCategoryGuidInput,
  shared: itemSharedInput,
  offTheShelf: itemOffTheShelfInput,
  uom: itemUomInput,
  targetPrice: itemTargetPriceInput,
  targetCost: itemTargetCostInput,
  standardCost: itemStandardCostInput,
  ownerFullName: itemOwnerFullNameInput,
  numberFormatGuid: itemNumberFormatGuidInput,
  numberFormatFields: itemNumberFormatFieldsInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const updateItemFileAssociationInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  itemFileAssociationGuid: itemFileAssociationGuidInput,
  latestEditionAssociation: {
    ...latestEditionAssociationInput,
    comments:
      "Whether the latest edition of the file should be associated to the item.",
  },
  primary: itemFileAssocPrimaryInput,
};
