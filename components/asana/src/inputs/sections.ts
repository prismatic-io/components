import { input, util } from "@prismatic-io/spectral";
import { SECTION_OPT_FIELDS } from "../constants";
import { validateId } from "../util";
import {
  connectionInput,
  insertAfter,
  insertBefore,
  optFields,
  pagination,
  projectId,
  taskId,
} from "./common";
const sectionId = input({
  label: "Section ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter section ID",
  comments: "The unique identifier for the section.",
  required: true,
  dataSource: "selectSection",
  clean: validateId,
});
const sectionName = input({
  label: "Section Name",
  type: "string",
  example: "Untriaged",
  placeholder: "Enter section name",
  comments: "The display name for the section.",
  required: true,
  clean: util.types.toString,
});
export const createSectionInputs = {
  asanaConnection: connectionInput,
  insertAfter,
  insertBefore,
  optFields: { ...optFields, default: SECTION_OPT_FIELDS },
  projectId,
  sectionName,
};
export const updateSectionInputs = {
  asanaConnection: connectionInput,
  insertAfter,
  insertBefore,
  optFields: { ...optFields, default: SECTION_OPT_FIELDS },
  sectionId,
  sectionName,
};
export const getSectionInputs = {
  asanaConnection: connectionInput,
  sectionId,
};
export const deleteSectionInputs = {
  asanaConnection: connectionInput,
  sectionId,
};
export const listSectionsInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: SECTION_OPT_FIELDS },
  pagination,
  projectId,
};
export const addTaskToSectionInputs = {
  asanaConnection: connectionInput,
  insertAfter,
  insertBefore,
  sectionId,
  taskId,
};
export const selectSectionInputs = {
  connection: connectionInput,
  projectId: { ...projectId, dataSource: undefined },
};
