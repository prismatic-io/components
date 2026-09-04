import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import {
  commentInput,
  connectionInput,
  dueDateInput,
  fetchAllInput,
  fileGuidInput,
  itemGuidInput,
  latestEditionAssociationInput,
  nameInput,
  numberInput,
  pagination,
  qualityProcessGuidInput,
  statusInput,
  stepGuidInput,
  userGuidInput,
} from "./common";
const trainingGuidInput = input({
  label: "Training GUID",
  type: "string",
  required: true,
  placeholder: "Enter training plan GUID",
  comments: "GUID of the training plan.",
  example: "TR1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const managerGuidInput = input({
  label: "Manager GUID",
  type: "string",
  required: false,
  placeholder: "Enter manager GUID",
  comments: "Filter by training manager GUID.",
  example: "TR1AB2CD3EF4GH5IJ6KL7MN8",
  clean: toOptionalString,
});
const managerFullNameInput = input({
  label: "Manager Full Name",
  type: "string",
  required: false,
  placeholder: "Enter manager full name",
  comments: "Filter by training manager full name.",
  example: "John Doe",
  clean: toOptionalString,
});
const daysToCompleteInput = input({
  label: "Days to Complete",
  type: "string",
  required: false,
  placeholder: "Enter days to complete",
  comments: "Number of days to complete the training.",
  example: "30",
  clean: toOptionalNumber,
});
const trainingFileAssociationGuidInput = input({
  label: "Training File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter training file association GUID",
  comments: "GUID of the training file association to remove.",
  example: "TN29ZKZ6A3F58PSI8QGWXDS5",
  clean: util.types.toString,
});
const trainingItemAssociationGuidInput = input({
  label: "Training Item Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter training item association GUID",
  comments: "GUID of the training item association to remove.",
  example: "TN6AYSAL5W4CUBQKQK6LXEPW",
  clean: util.types.toString,
});
const trainingDescriptionInput = input({
  label: "Description",
  type: "text",
  required: false,
  placeholder: "Enter description",
  comments: "Updated description for the training plan.",
  example: "Comprehensive safety training for all employees",
  clean: toOptionalString,
});
const referenceGuidInput = input({
  label: "Reference GUID",
  type: "string",
  required: true,
  placeholder: "Enter quality process reference GUID",
  comments: "GUID of the quality process association to remove.",
  example: "TNCBDJS2ZQEVHYYXBDYYIGCQ",
  clean: util.types.toString,
});
export const addFileToTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  fileGuid: {
    ...fileGuidInput,
    comments: "GUID of the file to add to the training plan.",
  },
  latestEditionAssociation: latestEditionAssociationInput,
};
export const addItemToTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  itemGuid: {
    ...itemGuidInput,
    comments: "GUID of the item to add to the training plan.",
  },
};
export const addQualityToTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "GUID of the quality process to add.",
    example: "qp123-456-789-abc-def567890",
  },
  stepGuid: {
    ...stepGuidInput,
    comments: "Optional GUID of a specific step within the quality process.",
    example: "step123-456-789-abc-def567890",
  },
};
export const addUserToTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  userGuid: {
    ...userGuidInput,
    required: true,
    comments: "GUID of the user to add to the training plan.",
    example: "user123-456-789-abc-def567890",
    clean: util.types.toString,
  },
  dueDate: {
    ...dueDateInput,
    placeholder: "Enter due date (ISO 8601)",
    comments: "Optional due date for the user to complete the training plan.",
    example: "2024-12-31T00:00:00Z",
  },
};
export const changeTrainingPlanStatusInputs = {
  connection: connectionInput,
  trainingGuid: {
    ...trainingGuidInput,
    comments: "GUID of the training plan to update status.",
  },
  status: {
    ...statusInput,
    required: true,
    placeholder: "Select a status",
    comments: "New status for the training plan.",
    model: [
      { label: "Open", value: "OPEN" },
      { label: "Closed", value: "CLOSED" },
    ],
    clean: util.types.toString,
  },
  comment: {
    ...commentInput,
    placeholder: "Enter optional comment",
    comments: "Optional comment for the status change.",
    example: "Training completed by all required personnel",
  },
};
export const listTrainingManagersInputs = {
  connection: connectionInput,
};
export const listTrainingPlanFilesInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
};
export const listTrainingPlanItemsInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
};
export const listTrainingPlanQualityInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
};
export const listTrainingPlanRecordsInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
};
export const listTrainingPlansInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Training Number",
    placeholder: "Enter training number",
    comments: "Filter by training number.",
    example: "TRN-001",
  },
  name: {
    ...nameInput,
    label: "Training Name",
    placeholder: "Enter training name",
    comments: "Filter by training name.",
    example: "Safety Training",
  },
  status: {
    ...statusInput,
    comments: "Filter by training plan status.",
    example: "OPEN",
  },
  managerGuid: managerGuidInput,
  managerFullName: managerFullNameInput,
  userGuid: {
    ...userGuidInput,
    comments: "Filter by assigned user GUID.",
    example: "user123-456-789-abc-def567890",
  },
  fetchAll: fetchAllInput,
  pagination,
};
export const listTrainingPlanUsersInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
};
export const removeFileFromTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  trainingFileAssociationGuid: trainingFileAssociationGuidInput,
};
export const removeItemFromTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  trainingItemAssociationGuid: trainingItemAssociationGuidInput,
};
export const removeQualityFromTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: trainingGuidInput,
  referenceGuid: referenceGuidInput,
};
export const updateTrainingPlanInputs = {
  connection: connectionInput,
  trainingGuid: {
    ...trainingGuidInput,
    comments: "GUID of the training plan to update.",
  },
  name: {
    ...nameInput,
    label: "Training Name",
    placeholder: "Enter training name",
    comments: "Updated name for the training plan.",
    example: "Advanced Safety Training",
  },
  description: trainingDescriptionInput,
  daysToComplete: daysToCompleteInput,
  managerGuid: {
    ...managerGuidInput,
    comments: "GUID of the training manager.",
    example: "mgr123-456-789-abc-def567890",
  },
};
