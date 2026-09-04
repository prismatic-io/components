import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject, toOptionalString } from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  attributeDefinitionsInput,
  categoryGuidInput,
  changeGuidInput,
  connectionInput,
  creatableOnlyInput,
  creatorGuidInput,
  dueDateInput,
  editableOnlyInput,
  fetchAllInput,
  fileGuidInput,
  guidInput,
  includeChildCategoriesInput,
  includeDeletedInput,
  includeEmptyAdditionalAttributesInput,
  includePossibleValuesInput,
  nameInput,
  numberInput,
  objectTypeInput,
  pagination,
  searchableOnlyInput,
  statusInput,
  titleInput,
} from "./common";
const changeTitleInput = input({
  label: "Change Title",
  type: "string",
  required: true,
  placeholder: "Enter change title",
  comments: "The title/name of the change to create.",
  example: "Component Design Update v3.0",
  clean: util.types.toString,
});
const changeUpdateTitleInput = input({
  label: "Change Title",
  type: "string",
  required: false,
  placeholder: "Enter change title",
  comments: "The title/name of the change to update.",
  example: "Component Design Update v3.0",
  clean: toOptionalString,
});
const changeDescriptionInput = input({
  label: "Change Description",
  type: "text",
  required: false,
  placeholder: "Enter change description",
  comments: "Detailed description of the change.",
  example: "Updated component design to improve manufacturing efficiency",
  clean: toOptionalString,
});
const changeCategoryGuidInput = input({
  label: "Category GUID",
  type: "string",
  required: false,
  placeholder: "Select a category",
  comments: "GUID of the category to assign to this change.",
  example: "CH1AB2CD3EF4GH5IJ6KL7MN8",
  dataSource: "categoriesPicklist",
  clean: toOptionalString,
});
const changeNumberSequencePrefixInput = input({
  label: "Number Sequence Prefix",
  type: "string",
  required: false,
  placeholder: "Enter number sequence prefix",
  comments: "Number sequence prefix for generating the change number.",
  example: "ECO",
  clean: toOptionalString,
});
const changeRoutingsInput = input({
  label: "Routings",
  type: "data",
  required: false,
  comments:
    "List of routing GUIDs for the change approval workflow. Select multiple routings from the available options for the specified category.",
  example: '["routing-guid-123", "routing-guid-456"]',
  dataSource: "changeCategoryRoutingsPicklist",
  clean: toOptionalObject,
});
const changeApprovalDeadlineDateTimeInput = input({
  label: "Approval Deadline",
  type: "string",
  required: false,
  placeholder: "Enter approval deadline (ISO format)",
  comments: "Deadline for change approval in ISO format.",
  example: "2025-08-15T10:00:00Z",
  clean: toOptionalString,
});
const changeEnforceApprovalDeadlineInput = input({
  label: "Enforce Approval Deadline",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, the approval deadline is enforced.",
  clean: util.types.toBool,
});
const changeEffectivityTypeInput = input({
  label: "Effectivity Type",
  type: "string",
  required: false,
  comments: "Type of effectivity for the change.",
  model: [
    { label: "Permanent on Approval", value: "PERMANENT_ON_APPROVAL" },
    { label: "Permanent on Date", value: "PERMANENT_ON_DATE" },
    { label: "Temporary", value: "TEMPORARY" },
    { label: "Permanent", value: "PERMANENT" },
    { label: "Immediate", value: "IMMEDIATE" },
  ],
  clean: toOptionalString,
});
const changeExpirationDateTimeInput = input({
  label: "Expiration Date Time",
  type: "string",
  required: false,
  placeholder: "Enter expiration date time (ISO format)",
  comments: "Expiration date time for the change in ISO format.",
  example: "2026-08-15T10:00:00Z",
  clean: toOptionalString,
});
const changeEffectivityPlannedDateTimeInput = input({
  label: "Effectivity Planned Date Time",
  type: "string",
  required: false,
  placeholder: "Enter effectivity planned date time (ISO format)",
  comments: "Planned effectivity date time for the change in ISO format.",
  example: "2025-09-01T08:00:00Z",
  clean: toOptionalString,
});
const changeSupplierVisibilityInput = input({
  label: "Supplier Visibility",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, the change is visible to suppliers.",
  clean: util.types.toBool,
});
const changeItemAssociationGuidInput = input({
  label: "Change Item Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter change item association GUID",
  comments: "GUID of the change-item association to update.",
  example: "CHVVLTU2VVPNU6P4IVW8MN4V",
  clean: util.types.toString,
});
const changeFileAssociationGuidInput = input({
  label: "Change File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter change file association GUID",
  comments: "GUID of the change-file association.",
  example: "CHRXMFA8H3PN48IAAH7PV9L3",
  clean: util.types.toString,
});
const changeImplementationStatusInput = input({
  label: "Implementation Status",
  type: "string",
  required: false,
  placeholder: "Select an implementation status",
  comments: "Implementation status of the change.",
  example: "In Progress",
  model: [
    { label: "N/A", value: "" },
    { label: "Not Started", value: "NOT_STARTED" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Needs Attention", value: "NEEDS_ATTENTION" },
    { label: "Done", value: "DONE" },
    { label: "Canceled", value: "CANCELED" },
  ],
  default: "",
  clean: toOptionalString,
});
const newItemRevisionInput = input({
  label: "New Item Revision GUID",
  type: "string",
  required: true,
  placeholder: "Enter new item revision GUID",
  comments: "GUID of the working revision of the Item being added.",
  example: "CH1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const newRevisionNumberInput = input({
  label: "New Revision Number",
  type: "string",
  required: false,
  placeholder: "Enter new revision number",
  comments: "New revision number for the item (required when making edits).",
  example: "B",
  clean: toOptionalString,
});
const newLifecyclePhaseInput = input({
  label: "New Lifecycle Phase GUID",
  type: "string",
  required: false,
  placeholder: "Enter new lifecycle phase GUID",
  comments: "GUID of the new lifecycle phase.",
  example: "CH5D4TZKH884FUWA7TYZCCIA",
  clean: toOptionalString,
});
const materialEffectivityDateTimeInput = input({
  label: "Material Effectivity Date Time",
  type: "string",
  required: false,
  placeholder: "Enter material effectivity date time",
  comments: "Material effectivity date and time (ISO format).",
  example: "2024-01-15T10:00:00Z",
  clean: toOptionalString,
});
const retrainingRequiredInput = input({
  label: "Retraining Required",
  type: "string",
  required: false,
  comments: "Whether retraining is required for this change.",
  model: [
    { label: "N/A", value: "" },
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: toOptionalString,
});
const retrainingRequiredBoolInput = input({
  label: "Retraining Required",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, retraining is required for this change.",
  clean: util.types.toBool,
});
const dispositionAttributeJsonInput = input({
  label: "Disposition Attribute JSON",
  type: "data",
  required: false,
  comments:
    "Provide disposition attributes as raw JSON array. Each attribute should have 'guid' and 'value' properties.",
  clean: toOptionalObject,
});
const filesViewInput = input({
  label: "Files View JSON",
  type: "data",
  required: false,
  comments:
    "Optional Files view control object with 'includedInThisChange' (boolean) and 'notes' (string) properties.",
  clean: toOptionalObject,
});
const sourcingViewInput = input({
  label: "Sourcing View JSON",
  type: "data",
  required: false,
  comments:
    "Optional Sourcing view control object with 'includedInThisChange' (boolean) and 'notes' (string) properties.",
  clean: toOptionalObject,
});
const specsViewInput = input({
  label: "Specs View JSON",
  type: "data",
  required: false,
  comments:
    "Optional Specs view control object with 'includedInThisChange' (boolean) and 'notes' (string) properties.",
  clean: toOptionalObject,
});
const bomViewInput = input({
  label: "BOM View JSON",
  type: "data",
  required: false,
  comments:
    "Optional BOM view control object with 'includedInThisChange' (boolean) and 'notes' (string) properties.",
  clean: toOptionalObject,
});
const implementationTaskGuidInput = input({
  label: "Implementation Task GUID",
  type: "string",
  required: true,
  placeholder: "Enter implementation task GUID",
  comments: "The GUID of the implementation task.",
  example: "CH4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const assigneeUserGuidInput = input({
  label: "Assignee User GUID",
  type: "string",
  required: false,
  placeholder: "Enter assignee user GUID",
  comments:
    "The GUID of the user to assign this task to. Use either Assignee User GUID or Assignee User Group GUID, not both.",
  example: "CH4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const assigneeUserGroupGuidInput = input({
  label: "Assignee User Group GUID",
  type: "string",
  required: false,
  placeholder: "Enter assignee user group GUID",
  comments:
    "The GUID of the user group to assign this task to. Use either Assignee User GUID or Assignee User Group GUID, not both.",
  example: "CH4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const noteInput = input({
  label: "Note Content",
  type: "text",
  required: true,
  placeholder: "Enter note content",
  comments: "The content of the note to add.",
  clean: util.types.toString,
});
const labelInput = input({
  label: "Label",
  type: "string",
  required: false,
  placeholder: "Enter label",
  comments: "Optional label for the note.",
  clean: toOptionalString,
});
const isPrivateInput = input({
  label: "Private",
  type: "boolean",
  required: false,
  comments: "When true, the note is marked as private.",
  clean: util.types.toBool,
});
const noteGuidInput = input({
  label: "Note GUID",
  type: "string",
  required: true,
  placeholder: "Enter note GUID",
  comments: "The GUID of the note to update.",
  example: "CH4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const effectiveDateTimeInput = input({
  label: "Effective DateTime",
  type: "string",
  required: false,
  placeholder: "Enter effective datetime",
  comments:
    "Filter by the date and time the change became effective, in ISO 8601 format.",
  example: "2026-05-10T09:15:00Z",
  clean: toOptionalString,
});
const submissionDateTimeInput = input({
  label: "Submission DateTime",
  type: "string",
  required: false,
  placeholder: "Enter submission datetime",
  comments:
    "Filter by the date and time the change was submitted for approval, in ISO 8601 format.",
  example: "2026-05-02T14:30:00Z",
  clean: toOptionalString,
});
const lifecycleStatusTypeInput = input({
  label: "Lifecycle Status Type",
  type: "string",
  required: false,
  placeholder: "Enter lifecycle status type",
  comments:
    "Filter by the change's lifecycle status, such as OPEN, SUBMITTED, APPROVED or EFFECTIVE.",
  example: "APPROVED",
  clean: toOptionalString,
});
const implementationStatusInput = input({
  label: "Implementation Status",
  type: "string",
  required: false,
  placeholder: "Enter implementation status",
  comments:
    "Filter by the progress of the change's implementation tasks, such as NOT_STARTED, IN_PROGRESS or COMPLETE.",
  example: "IN_PROGRESS",
  clean: toOptionalString,
});
const anyInput = input({
  label: "Any Search",
  type: "string",
  required: false,
  placeholder: "Enter a term to search across all fields",
  comments:
    "Filter by a term matched against any searchable change field, rather than one named field.",
  example: "solder mask",
  clean: toOptionalString,
});
const filesViewIncludedInput = input({
  label: "Files View Included in Change",
  type: "boolean",
  required: false,
  comments: "When true, the files view is included in this change.",
  clean: util.types.toBool,
});
const filesViewNotesInput = input({
  label: "Files View Notes",
  type: "string",
  required: false,
  placeholder: "Enter files view notes",
  comments: "Notes for the files view modification.",
  clean: toOptionalString,
});
const sourcingViewIncludedInput = input({
  label: "Sourcing View Included in Change",
  type: "boolean",
  required: false,
  comments: "When true, the sourcing view is included in this change.",
  clean: util.types.toBool,
});
const sourcingViewNotesInput = input({
  label: "Sourcing View Notes",
  type: "string",
  required: false,
  placeholder: "Enter sourcing view notes",
  comments: "Notes for the sourcing view modification.",
  clean: toOptionalString,
});
const specsViewIncludedInput = input({
  label: "Specs View Included in Change",
  type: "boolean",
  required: false,
  comments: "When true, the specs view is included in this change.",
  clean: util.types.toBool,
});
const specsViewNotesInput = input({
  label: "Specs View Notes",
  type: "string",
  required: false,
  placeholder: "Enter specs view notes",
  comments: "Notes for the specs view modification.",
  clean: toOptionalString,
});
const bomViewIncludedInput = input({
  label: "BOM View Included in Change",
  type: "boolean",
  required: false,
  comments: "When true, the BOM view is included in this change.",
  clean: util.types.toBool,
});
const bomViewNotesInput = input({
  label: "BOM View Notes",
  type: "string",
  required: false,
  placeholder: "Enter BOM view notes",
  comments: "Notes for the BOM view modification.",
  clean: toOptionalString,
});
export const addItemToChangeInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  newItemRevision: newItemRevisionInput,
  newRevisionNumber: {
    ...newRevisionNumberInput,
    comments:
      "New revision number (can be omitted if a next revision is available in workspaces with Revision Sequences).",
  },
  newLifecyclePhase: newLifecyclePhaseInput,
  materialEffectivityDateTime: materialEffectivityDateTimeInput,
  retrainingRequired: retrainingRequiredInput,
  dispositionAttributeJson: dispositionAttributeJsonInput,
  filesView: filesViewInput,
  sourcingView: sourcingViewInput,
  specsView: specsViewInput,
  bomView: bomViewInput,
};
export const createChangeInputs = {
  connection: connectionInput,
  title: changeTitleInput,
  description: changeDescriptionInput,
  categoryGuid: changeCategoryGuidInput,
  numberSequencePrefix: changeNumberSequencePrefixInput,
  routings: changeRoutingsInput,
  approvalDeadlineDateTime: changeApprovalDeadlineDateTimeInput,
  enforceApprovalDeadline: changeEnforceApprovalDeadlineInput,
  effectivityType: changeEffectivityTypeInput,
  expirationDateTime: changeExpirationDateTimeInput,
  effectivityPlannedDateTime: changeEffectivityPlannedDateTimeInput,
  supplierVisibility: changeSupplierVisibilityInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const createChangeFileAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  fileGuid: {
    ...fileGuidInput,
    placeholder: "Enter file GUID to associate",
    comments: "GUID of the existing file to associate with the change.",
  },
};
export const createChangeImplementationFileInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to attach the implementation file to.",
  },
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to attach as an implementation file.",
  },
};
export const createChangeImplementationTaskInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to create an implementation task for.",
  },
  name: {
    ...nameInput,
    label: "Task Name",
    required: true,
    placeholder: "Enter task name",
    comments: "The name of the implementation task.",
    clean: util.types.toString,
  },
  assigneeUserGuid: assigneeUserGuidInput,
  assigneeUserGroupGuid: assigneeUserGroupGuidInput,
  dueDate: {
    ...dueDateInput,
    comments: "The due date for the task (ISO 8601 format).",
  },
};
export const createChangeImplementationTaskFileInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to attach the file to.",
  },
  fileGuid: { ...fileGuidInput, comments: "The GUID of the file to attach." },
};
export const createChangeImplementationTaskNoteInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to add a note to.",
  },
  note: noteInput,
  label: labelInput,
  isPrivate: isPrivateInput,
};
export const createChangeMarkupFileInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to attach the markup file to.",
  },
  fileGuid: {
    ...fileGuidInput,
    comments: "The GUID of the file to attach as a markup file.",
  },
};
export const deleteChangeInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
};
export const deleteChangeFileAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  changeFileAssociationGuid: changeFileAssociationGuidInput,
};
export const deleteChangeItemAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  changeItemAssociationGuid: changeItemAssociationGuidInput,
};
export const deleteChangeMarkupFileInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  changeFileAssociationGuid: {
    ...changeFileAssociationGuidInput,
    comments: "The GUID of the change file association to delete.",
  },
};
export const listChangeAlertsInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get alerts for.",
  },
};
export const getChangeByGuidInputs = {
  connection: connectionInput,
  guid: {
    ...guidInput,
    label: "Change GUID",
    required: true,
    placeholder: "Enter change GUID",
    clean: util.types.toString,
  },
  includeEmptyAdditionalAttributes: {
    ...includeEmptyAdditionalAttributesInput,
    comments:
      "When true, includes additional attributes even when they have no value.",
  },
};
export const listChangeCategoryItemAttributesInputs = {
  connection: connectionInput,
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    placeholder: "Enter the GUID of the change category",
    comments: "The unique identifier of the change category.",
    clean: util.types.toString,
  },
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: {
    ...creatableOnlyInput,
    comments: "Filter to only attributes that can be used when creating items.",
  },
  editableOnly: {
    ...editableOnlyInput,
    comments: "Filter to only editable attributes.",
  },
  searchableOnly: {
    ...searchableOnlyInput,
    comments: "Filter to only searchable attributes.",
  },
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted attributes in the results.",
  },
};
export const listChangeCategoryRoutingsInputs = {
  connection: connectionInput,
  categoryGuid: {
    ...categoryGuidInput,
    required: true,
    comments:
      "The unique identifier (GUID) of the change category to get routings for.",
    example: "J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6",
    clean: util.types.toString,
  },
};
export const getChangeFileAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  changeFileAssociationGuid: changeFileAssociationGuidInput,
};
export const listChangeFileAssociationsInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
};
export const listChangeFilesInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get files for.",
  },
};
export const listChangeHistoryInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get history for.",
  },
};
export const listChangeImplementationFilesInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get implementation files for.",
  },
};
export const getChangeImplementationTaskInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to retrieve.",
  },
};
export const listChangeImplementationTaskFilesInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to get files for.",
  },
};
export const listChangeImplementationTaskNotesInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to get notes for.",
  },
};
export const listChangeImplementationTasksInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get implementation tasks for.",
  },
};
export const getChangeItemAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  changeItemAssociationGuid: changeItemAssociationGuidInput,
};
export const listChangeItemsInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
};
export const listChangeMarkupFilesInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to get markup files for.",
  },
};
export const listChangesInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Change Number",
    placeholder: "Enter change number",
    clean: toOptionalString,
  },
  title: {
    ...titleInput,
    label: "Change Title",
    placeholder: "Enter change title",
    clean: toOptionalString,
  },
  effectiveDateTime: effectiveDateTimeInput,
  submissionDateTime: submissionDateTimeInput,
  lifecycleStatusType: lifecycleStatusTypeInput,
  implementationStatus: implementationStatusInput,
  categoryGuid: {
    ...categoryGuidInput,
    clean: toOptionalString,
  },
  creatorGuid: {
    ...creatorGuidInput,
    clean: toOptionalString,
  },
  any: anyInput,
  fetchAll: fetchAllInput,
  pagination,
  includeChildCategories: {
    ...includeChildCategoriesInput,
    comments:
      "When true, includes changes from child categories of the specified category.",
    clean: util.types.toBool,
  },
};
export const listChangesAdministratorsInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    placeholder: "Select an object type",
    default: "changes",
    model: [
      { label: "Changes", value: "changes" },
      { label: "Requests", value: "requests" },
    ],
    comments:
      "The type of objects whose administrators to list (changes or requests).",
  },
};
export const listNumberSequencePrefixesInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    required: true,
    placeholder: "Select an object type",
    comments: "The type of object to get number sequence prefixes for.",
    model: [
      { label: "Quality Processes", value: "qualityprocesses" },
      { label: "Requests", value: "requests" },
      { label: "Changes", value: "changes" },
      { label: "Tickets", value: "tickets" },
      { label: "Training Plans", value: "trainingplans" },
    ],
    default: "changes",
    clean: util.types.toString,
  },
};
export const updateChangeInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  title: changeUpdateTitleInput,
  description: changeDescriptionInput,
  categoryGuid: changeCategoryGuidInput,
  approvalDeadlineDateTime: changeApprovalDeadlineDateTimeInput,
  enforceApprovalDeadline: changeEnforceApprovalDeadlineInput,
  effectivityType: changeEffectivityTypeInput,
  expirationDateTime: changeExpirationDateTimeInput,
  effectivityPlannedDateTime: changeEffectivityPlannedDateTimeInput,
  implementationStatus: changeImplementationStatusInput,
  supplierVisibility: changeSupplierVisibilityInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const updateChangeImplementationTaskInputs = {
  connection: connectionInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change that owns the implementation task.",
  },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task to update.",
  },
  name: {
    ...nameInput,
    label: "Task Name",
    placeholder: "Enter task name",
    comments: "The updated name of the implementation task.",
  },
  assigneeUserGuid: assigneeUserGuidInput,
  assigneeUserGroupGuid: assigneeUserGroupGuidInput,
  dueDate: {
    ...dueDateInput,
    comments: "The updated due date for the task (ISO 8601 format).",
  },
  status: {
    ...statusInput,
    placeholder: "Select a status",
    model: [
      { label: "Not Started", value: "NOT_STARTED" },
      { label: "In Progress", value: "IN_PROGRESS" },
      { label: "Behind", value: "BEHIND" },
      { label: "Canceled", value: "CANCELED" },
      { label: "Not Applicable", value: "NOT_APPLICABLE" },
      { label: "Done", value: "DONE" },
    ],
    comments: "The updated status of the implementation task.",
  },
};
export const updateChangeImplementationTaskNoteInputs = {
  connection: connectionInput,
  changeGuid: { ...changeGuidInput, comments: "The GUID of the change." },
  implementationTaskGuid: {
    ...implementationTaskGuidInput,
    comments: "The GUID of the implementation task that owns the note.",
  },
  noteGuid: noteGuidInput,
  note: {
    ...noteInput,
    required: false,
    clean: toOptionalString,
    comments: "The updated content of the note.",
  },
  label: {
    ...labelInput,
    comments: "The updated label for the note.",
  },
  isPrivate: {
    ...isPrivateInput,
    comments: "When true, the note is private.",
  },
};
export const updateChangeItemAssociationInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  changeItemAssociationGuid: changeItemAssociationGuidInput,
  filesViewIncluded: filesViewIncludedInput,
  filesViewNotes: filesViewNotesInput,
  sourcingViewIncluded: sourcingViewIncludedInput,
  sourcingViewNotes: sourcingViewNotesInput,
  specsViewIncluded: specsViewIncludedInput,
  specsViewNotes: specsViewNotesInput,
  bomViewIncluded: bomViewIncludedInput,
  bomViewNotes: bomViewNotesInput,
  newRevisionNumber: newRevisionNumberInput,
  newLifecyclePhase: newLifecyclePhaseInput,
  materialEffectivityDateTime: materialEffectivityDateTimeInput,
  retrainingRequired: retrainingRequiredBoolInput,
  dispositionAttributeJson: dispositionAttributeJsonInput,
};
