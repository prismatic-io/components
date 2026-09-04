import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalObject, toOptionalString } from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  attributeDefinitionsInput,
  connectionInput,
  fetchAllInput,
  fileAuthorFullNameInput,
  fileCategoryGuidInput,
  fileDescriptionInput,
  fileEditionInput,
  fileFormatInput,
  fileGuidInput,
  fileInput,
  filePrivateInput,
  fileStorageMethodNameInput,
  fileTitleInput,
  includeEmptyAdditionalAttributesInput,
  itemGuidInput,
  latestEditionAssociationInput,
  pagination,
  primaryFileInput,
  storageMethodNameInput,
} from "./common";
const phoneNumberUpdateInput = input({
  label: "Phone Number",
  type: "string",
  required: false,
  placeholder: "Enter phone number",
  clean: toOptionalString,
  comments:
    "The supplier's phone number. Leave empty to keep the stored value.",
  example: "+1-555-123-4567",
});
const supplierFileAssociationGuidInput = input({
  label: "Supplier File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter supplier file association GUID",
  clean: util.types.toString,
  comments: "The unique identifier (GUID) of the supplier file association.",
  example: "SPWCC5835PR4AZIWCN7FZ6K9",
});
const sourcingRelationshipGuidInput = input({
  label: "Sourcing Relationship GUID",
  type: "string",
  required: true,
  placeholder: "Enter sourcing relationship GUID",
  comments: "GUID of the sourcing relationship.",
  example: "SP1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const sourcingSetNullInput = input({
  label: "Set Null",
  type: "boolean",
  required: false,
  comments:
    "When true, unspecified fields are set to null when updating the sourcing relationship.",
  clean: util.types.toBool,
});
const sourcingAmlRankInput = input({
  label: "AML Rank",
  type: "string",
  required: false,
  placeholder: "Enter AML rank",
  comments: "Approved Manufacturer List rank (integer).",
  example: "1",
  clean: toOptionalNumber,
});
const sourcingApprovedInput = input({
  label: "Approved",
  type: "boolean",
  required: false,
  comments: "When true, the sourcing relationship is approved.",
  clean: util.types.toBool,
});
const sourcingMakeItemInput = input({
  label: "Make Item",
  type: "boolean",
  required: false,
  comments:
    "When true, the relationship is a make item, meaning the part is manufactured in house rather than bought from the supplier.",
  clean: util.types.toBool,
});
const sourcingMfrItemGuidInput = input({
  label: "Manufacturer Item GUID",
  type: "string",
  required: false,
  placeholder: "Enter manufacturer item GUID",
  comments: "GUID of the manufacturer item.",
  example: "SPQDZ6CQ75S3ENCGW6DXTGPP",
  clean: toOptionalString,
});
const sourcingNotesInput = input({
  label: "Notes",
  type: "text",
  required: false,
  placeholder: "Enter sourcing notes",
  comments: "Additional notes for the sourcing relationship.",
  example: "Primary supplier for production runs",
  clean: toOptionalString,
});
const sourcingVendorItemGuidInput = input({
  label: "Vendor Item GUID",
  type: "string",
  required: false,
  placeholder: "Enter vendor item GUID",
  comments: "GUID of the vendor item.",
  example: "SPW6UKHVR5KUVQGN48AHK9CZ",
  clean: toOptionalString,
});
const sourcingVendorItemConversionFactorInput = input({
  label: "Vendor Item Conversion Factor",
  type: "string",
  required: false,
  placeholder: "Enter conversion factor",
  comments: "Conversion factor between vendor and manufacturer items.",
  example: "1.0",
  clean: toOptionalNumber,
});
const sourcingAmlSplitInput = input({
  label: "AML Split",
  type: "string",
  required: false,
  placeholder: "Enter AML split percentage",
  comments: "AML split percentage (for update operations).",
  example: "50.5",
  clean: toOptionalNumber,
});
const supplierItemNameInput = input({
  label: "Supplier Item Name",
  type: "string",
  required: true,
  placeholder: "Enter supplier item name",
  comments: "The name of the supplier item.",
  example: "Circuit Board PCB-123",
  clean: util.types.toString,
});
const supplierItemNumberInput = input({
  label: "Supplier Item Number",
  type: "string",
  required: false,
  placeholder: "Enter supplier item number",
  comments: "The number/part number of the supplier item.",
  example: "PCB-123-V2",
  clean: toOptionalString,
});
const supplierItemDescriptionInput = input({
  label: "Supplier Item Description",
  type: "text",
  required: false,
  placeholder: "Enter supplier item description",
  comments: "Detailed description of the supplier item.",
  example: "High-quality circuit board for electronic assembly",
  clean: toOptionalString,
});
const supplierItemTypeInput = input({
  label: "Supplier Item Type",
  type: "string",
  required: false,
  placeholder: "Enter supplier item type",
  comments: "The type/category of the supplier item.",
  example: "Component",
  clean: toOptionalString,
});
const supplierGuidInput = input({
  label: "Supplier GUID",
  type: "string",
  required: true,
  placeholder: "Enter supplier GUID",
  comments: "GUID of the supplier that provides this item.",
  example: "SP1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const supplierItemUomInput = input({
  label: "Supplier Item Unit of Measure",
  type: "string",
  required: false,
  placeholder: "Enter unit of measure",
  comments: "Unit of measure for the supplier item (e.g., 'EA', 'LB', 'FT').",
  example: "EA",
  clean: toOptionalString,
});
const supplierItemOffTheShelfInput = input({
  label: "Off The Shelf",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, this is an off-the-shelf supplier item.",
  clean: util.types.toBool,
});
const supplierItemProcurementTypeInput = input({
  label: "Procurement Type",
  type: "string",
  required: false,
  comments: "Procurement type for the supplier item.",
  model: [
    { label: "Off The Shelf (OTS)", value: "OTS" },
    { label: "Make To Stock (MTS)", value: "MTS" },
  ],
  clean: toOptionalString,
});
const supplierItemSearchNumberInput = input({
  label: "Search by Number",
  type: "string",
  required: false,
  placeholder: "Enter supplier item number to search",
  comments: "Search for supplier items by number/part number.",
  clean: toOptionalString,
});
const supplierItemSearchNameInput = input({
  label: "Search by Name",
  type: "string",
  required: false,
  placeholder: "Enter supplier item name to search",
  comments: "Search for supplier items by name.",
  clean: toOptionalString,
});
const supplierNameSearchInput = input({
  label: "Search by Supplier Name",
  type: "string",
  required: false,
  placeholder: "Enter supplier name to search",
  comments: "Search for supplier items by supplier name.",
  clean: toOptionalString,
});
const supplierGuidSearchInput = input({
  label: "Search by Supplier GUID",
  type: "string",
  required: false,
  placeholder: "Enter supplier GUID to search",
  comments: "Search for supplier items by supplier GUID.",
  example: "SP4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const supplierItemGuidInput = input({
  label: "Supplier Item GUID",
  type: "string",
  required: true,
  placeholder: "Enter supplier item GUID",
  comments: "The GUID of the supplier item.",
  example: "SP1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const supplierItemLatestEditionAssociationInput = input({
  label: "Latest Edition Association",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, the file is associated with its latest edition.",
  clean: util.types.toBool,
});
const supplierItemFilePrimaryInput = input({
  label: "Primary File",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, this is the primary file for the supplier item.",
  clean: util.types.toBool,
});
const supplierItemFileAssociationGuidInput = input({
  label: "Supplier Item File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter supplier item file association GUID",
  comments: "The GUID of the supplier item file association.",
  example: "SP1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const approvalStatusNameSearchInput = input({
  label: "Approval Status Name",
  type: "string",
  required: false,
  placeholder: "Enter approval status name to search",
  comments: "Filter approval statuses by name.",
  clean: toOptionalString,
});
const approvalStatusTypeSearchInput = input({
  label: "Approval Status Type",
  type: "string",
  required: false,
  placeholder: "Enter approval status type to search",
  comments: "Filter approval statuses by type.",
  clean: toOptionalString,
});
const supplierNameInput = input({
  label: "Supplier Name",
  type: "string",
  required: true,
  placeholder: "Enter supplier name",
  comments: "The name of the supplier.",
  clean: util.types.toString,
});
const supplierIdInput = input({
  label: "Supplier ID",
  type: "string",
  required: false,
  placeholder: "Enter supplier unique identifier",
  comments: "The unique identifier for the supplier.",
  example: "SUP-000145",
  clean: toOptionalString,
});
const supplierIdSearchInput = input({
  label: "Supplier ID Search",
  type: "string",
  required: false,
  placeholder: "Enter supplier ID to search",
  comments: "Filter suppliers by unique identifier.",
  example: "SUP-000145",
  clean: toOptionalString,
});
const phoneNumberLabelInput = input({
  label: "Phone Number Label",
  type: "string",
  required: false,
  placeholder: "Enter phone number label",
  clean: toOptionalString,
  comments: "Label for the phone number (e.g., 'Main', 'Fax', 'Mobile').",
  example: "Main",
});
const phoneNumberInput = input({
  label: "Phone Number",
  type: "string",
  required: true,
  placeholder: "Enter phone number",
  clean: util.types.toString,
  comments: "Phone number in the format the supplier record stores it.",
  example: "+1-555-123-4567",
});
const phoneNumberExtensionInput = input({
  label: "Phone Number Extension",
  type: "string",
  required: false,
  placeholder: "Enter phone number extension",
  clean: toOptionalString,
  comments: "Phone number extension if applicable.",
  example: "123",
});
const phoneNumberCommentInput = input({
  label: "Phone Number Comment",
  type: "string",
  required: false,
  placeholder: "Enter phone number comment",
  clean: toOptionalString,
  comments: "Additional comment about the phone number.",
  example: "Primary contact number",
});
const phoneNumberGuidInput = input({
  label: "Phone Number GUID",
  type: "string",
  required: true,
  placeholder: "Enter phone number GUID",
  clean: util.types.toString,
  comments: "The unique identifier (GUID) of the phone number.",
  example: "SPSSLP7UXXNQ2YRAFWY593XU",
});
const addressLabelInput = input({
  label: "Address Label",
  type: "string",
  required: false,
  placeholder: "Enter address label",
  clean: toOptionalString,
  comments:
    "Label for the address (e.g., 'Main Office', 'Billing', 'Shipping').",
  example: "Main Office",
});
const address1Input = input({
  label: "Address Line 1",
  type: "string",
  required: false,
  placeholder: "Enter address line 1",
  clean: toOptionalString,
  comments: "First line of the street address.",
  example: "123 Main Street",
});
const address2Input = input({
  label: "Address Line 2",
  type: "string",
  required: false,
  placeholder: "Enter address line 2",
  clean: toOptionalString,
  comments: "Second line of the street address (optional).",
  example: "Suite 456",
});
const cityInput = input({
  label: "City",
  type: "string",
  required: false,
  placeholder: "Enter city",
  clean: toOptionalString,
  comments: "City name.",
  example: "San Francisco",
});
const stateInput = input({
  label: "State",
  type: "string",
  required: false,
  placeholder: "Enter state",
  clean: toOptionalString,
  comments: "State or region.",
  example: "CA",
});
const provinceInput = input({
  label: "Province",
  type: "string",
  required: false,
  placeholder: "Enter province",
  clean: toOptionalString,
  comments: "Province (typically used for international addresses).",
  example: "Ontario",
});
const postalCodeInput = input({
  label: "Zip/Postal Code",
  type: "string",
  required: false,
  placeholder: "Enter postal code",
  clean: toOptionalString,
  comments: "Postal or ZIP code.",
  example: "94105",
});
const countryInput = input({
  label: "Country",
  type: "string",
  required: false,
  placeholder: "Enter country",
  clean: toOptionalString,
  comments: "Country name or code.",
  example: "USA",
});
export const address = structuredObjectInput({
  label: "Address",
  required: false,
  comments:
    "Street address lines, city, state, province, postal code, and country.",
  inputs: {
    address1: address1Input,
    address2: address2Input,
    city: cityInput,
    state: stateInput,
    province: provinceInput,
    postalCode: postalCodeInput,
    country: countryInput,
  },
});
const addressGuidInput = input({
  label: "Address GUID",
  type: "string",
  required: true,
  placeholder: "Enter address GUID",
  clean: util.types.toString,
  comments: "The unique identifier (GUID) of the address.",
  example: "SP23PEPH52BD74BBYPPBHGAY",
});
const isPrimaryAddressInput = input({
  label: "Is Primary Address",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments: "When true, this address is the primary address for the supplier.",
  example: "true",
});
const supplierQualityAssociationGuidInput = input({
  label: "Supplier Quality Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter supplier quality association GUID",
  clean: util.types.toString,
  comments:
    "The unique identifier (GUID) of the supplier quality process association.",
  example: "SPTMBUM8PSQ6CEQTYFG4IA3Z",
});
const supplierAccountNumberInput = input({
  label: "Account Number",
  type: "string",
  required: false,
  placeholder: "Enter account number",
  comments: "Account number for the supplier.",
  example: "ACCT-12345",
  clean: toOptionalString,
});
const supplierWebsiteInput = input({
  label: "Website",
  type: "string",
  required: false,
  placeholder: "Enter website URL",
  comments:
    "The supplier's public website, recorded for reference on the supplier record.",
  example: "https://www.supplier.com",
  clean: toOptionalString,
});
const supplierApprovalStatusGuidInput = input({
  label: "Approval Status GUID",
  type: "string",
  required: false,
  placeholder: "Enter approval status GUID",
  comments: "GUID of the approval status setting to assign to this supplier.",
  example: "SP1AB2CD3EF4GH5IJ6KL7MN8",
  clean: toOptionalString,
});
const supplierDescriptionInput = input({
  label: "Description",
  type: "text",
  required: false,
  placeholder: "Enter supplier description",
  comments: "Description of the supplier.",
  clean: toOptionalString,
});
const supplierAddressesInput = input({
  label: "Addresses",
  type: "data",
  required: false,
  comments: "JSON array of address objects to assign to the supplier.",
  clean: toOptionalObject,
});
const supplierPhoneNumbersInput = input({
  label: "Phone Numbers",
  type: "data",
  required: false,
  comments: "JSON array of phone number objects to assign to the supplier.",
  clean: toOptionalObject,
});
export const createSourcingRelationshipInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  amlRank: sourcingAmlRankInput,
  approved: sourcingApprovedInput,
  makeItem: sourcingMakeItemInput,
  mfrItemGuid: sourcingMfrItemGuidInput,
  notes: sourcingNotesInput,
  vendorItemGuid: sourcingVendorItemGuidInput,
  vendorItemConversionFactor: sourcingVendorItemConversionFactorInput,
};
export const createSupplierInputs = {
  connection: connectionInput,
  name: supplierNameInput,
  supplierId: supplierIdInput,
  accountNumber: supplierAccountNumberInput,
  description: supplierDescriptionInput,
  website: supplierWebsiteInput,
  approvalStatusGuid: supplierApprovalStatusGuidInput,
  addresses: supplierAddressesInput,
  phoneNumbers: supplierPhoneNumbersInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
};
export const createSupplierAddressInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  label: addressLabelInput,
  address,
  isPrimary: isPrimaryAddressInput,
};
export const createSupplierFileAssociationInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  fileGuid: fileGuidInput,
};
export const createSupplierItemInputs = {
  connection: connectionInput,
  name: supplierItemNameInput,
  number: supplierItemNumberInput,
  description: supplierItemDescriptionInput,
  type: supplierItemTypeInput,
  supplierGuid: supplierGuidInput,
  uom: supplierItemUomInput,
  offTheShelf: supplierItemOffTheShelfInput,
  procurementType: supplierItemProcurementTypeInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const createSupplierItemFileInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
  file: fileInput,
  title: fileTitleInput,
  description: fileDescriptionInput,
  format: fileFormatInput,
  storageMethodName: storageMethodNameInput,
  categoryGuid: fileCategoryGuidInput,
  authorFullName: fileAuthorFullNameInput,
  edition: fileEditionInput,
  private: filePrivateInput,
  latestEditionAssociation: supplierItemLatestEditionAssociationInput,
  primary: supplierItemFilePrimaryInput,
};
export const createSupplierPhoneNumberInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  label: phoneNumberLabelInput,
  number: phoneNumberInput,
  extension: phoneNumberExtensionInput,
  comment: phoneNumberCommentInput,
};
export const deleteSourcingRelationshipInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  sourcingRelationshipGuid: sourcingRelationshipGuidInput,
};
export const deleteSupplierInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
};
export const deleteSupplierAddressInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  addressGuid: addressGuidInput,
};
export const deleteSupplierFileAssociationInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  supplierFileAssociationGuid: supplierFileAssociationGuidInput,
};
export const deleteSupplierItemInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
};
export const deleteSupplierPhoneNumberInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  phoneNumberGuid: phoneNumberGuidInput,
};
export const listSourcingRelationshipsInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
};
export const listSupplierAddressesInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
};
export const listSupplierApprovalStatusesInputs = {
  connection: connectionInput,
  name: approvalStatusNameSearchInput,
  type: approvalStatusTypeSearchInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getSupplierByGuidInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
};
export const listSupplierFileAssociationsInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
};
export const getSupplierItemByGuidInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
};
export const listSupplierItemComplianceInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
};
export const getSupplierItemFileContentInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
  supplierItemFileAssociationGuid: supplierItemFileAssociationGuidInput,
};
export const listSupplierItemFilesInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
};
export const listSupplierItemRequirementsInputs = {
  connection: connectionInput,
};
export const listSupplierItemsInputs = {
  connection: connectionInput,
  number: supplierItemSearchNumberInput,
  name: supplierItemSearchNameInput,
  supplierName: supplierNameSearchInput,
  supplierGuid: supplierGuidSearchInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const listSupplierItemSourcingInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
};
export const listSupplierPhoneNumbersInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
};
export const getSupplierQualityProcessAssociationInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  supplierQualityAssociationGuid: supplierQualityAssociationGuidInput,
};
export const listSupplierQualityProcessAssociationsInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
};
export const listSuppliersInputs = {
  connection: connectionInput,
  name: supplierNameSearchInput,
  supplierId: supplierIdSearchInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const updateSourcingRelationshipInputs = {
  connection: connectionInput,
  itemGuid: itemGuidInput,
  sourcingRelationshipGuid: sourcingRelationshipGuidInput,
  setNull: sourcingSetNullInput,
  amlRank: sourcingAmlRankInput,
  approved: sourcingApprovedInput,
  mfrItemGuid: sourcingMfrItemGuidInput,
  notes: sourcingNotesInput,
  vendorItemGuid: sourcingVendorItemGuidInput,
  vendorItemConversionFactor: sourcingVendorItemConversionFactorInput,
  amlSplit: sourcingAmlSplitInput,
};
export const updateSupplierInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  name: supplierNameInput,
  supplierId: supplierIdInput,
  accountNumber: supplierAccountNumberInput,
  description: supplierDescriptionInput,
  website: supplierWebsiteInput,
  approvalStatusGuid: supplierApprovalStatusGuidInput,
  addresses: supplierAddressesInput,
  phoneNumbers: supplierPhoneNumbersInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
};
export const updateSupplierAddressInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  addressGuid: addressGuidInput,
  label: addressLabelInput,
  address,
  isPrimary: isPrimaryAddressInput,
};
export const updateSupplierFileAssociationInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  supplierFileAssociationGuid: supplierFileAssociationGuidInput,
  title: fileTitleInput,
  description: fileDescriptionInput,
  edition: fileEditionInput,
  format: fileFormatInput,
  isPrivate: filePrivateInput,
  authorFullName: fileAuthorFullNameInput,
  categoryGuid: fileCategoryGuidInput,
  storageMethodName: fileStorageMethodNameInput,
  latestEditionAssociation: latestEditionAssociationInput,
  isPrimary: primaryFileInput,
};
export const updateSupplierItemInputs = {
  connection: connectionInput,
  supplierItemGuid: supplierItemGuidInput,
  name: supplierItemNameInput,
  number: supplierItemNumberInput,
  description: supplierItemDescriptionInput,
  type: supplierItemTypeInput,
  uom: supplierItemUomInput,
  offTheShelf: supplierItemOffTheShelfInput,
  procurementType: supplierItemProcurementTypeInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const updateSupplierPhoneNumberInputs = {
  connection: connectionInput,
  supplierGuid: supplierGuidInput,
  phoneNumberGuid: phoneNumberGuidInput,
  label: phoneNumberLabelInput,
  number: phoneNumberUpdateInput,
  extension: phoneNumberExtensionInput,
  comment: phoneNumberCommentInput,
};
