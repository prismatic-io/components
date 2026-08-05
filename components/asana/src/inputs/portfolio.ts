import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import {
  color,
  connectionInput,
  fieldId,
  insertAfter,
  insertBefore,
  isImportant,
  members,
  optFields,
  pagination,
  portfolioId,
  workspaceId,
} from "./common";
const portfolioName = input({
  label: "Portfolio Name",
  type: "string",
  example: "My Portfolio",
  placeholder: "Enter portfolio name",
  comments: "The display name for the portfolio.",
  required: true,
  clean: util.types.toString,
});
const isPublic = input({
  label: "Public",
  type: "boolean",
  comments:
    "When true, the resource is visible to every member of the team it belongs to.",
  required: true,
  clean: util.types.toBool,
});
export const createPortfolioInputs = {
  asanaConnection: connectionInput,
  color,
  isPublic,
  members,
  portfolioName,
  workspaceId,
};
export const updatePortfolioInputs = {
  asanaConnection: connectionInput,
  color: { ...color, required: false },
  isPublic,
  portfolioId,
  portfolioName: { ...portfolioName, required: false },
  workspaceId: { ...workspaceId, required: false },
};
export const getPortfolioInputs = {
  asanaConnection: connectionInput,
  portfolioId,
};
export const deletePortfolioInputs = {
  asanaConnection: connectionInput,
  portfolioId,
};
export const listPortfoliosInputs = {
  asanaConnection: connectionInput,
  pagination,
  workspaceId,
};
export const addUserToPortfolioInputs = {
  asanaConnection: connectionInput,
  members,
  portfolioId,
};
export const removeUserFromPortfolioInputs = {
  asanaConnection: connectionInput,
  members,
  optFields: {
    ...optFields,
    default:
      "name,created_at,created_by,custom_field_settings,color,workspace,members",
  },
  portfolioId,
};
export const addCustomFieldToPortfolioInputs = {
  asanaConnection: connectionInput,
  fieldId,
  insertAfter,
  insertBefore,
  isImportant,
  portfolioId,
};
export const removeCustomFieldFromPortfolioInputs = {
  asanaConnection: connectionInput,
  fieldId,
  portfolioId,
};
export const selectPortfolioInputs = {
  connection: connectionInput,
  workspaceId: {
    ...workspaceId,
    required: false,
    dataSource: undefined,
    clean: cleanString,
  },
};
