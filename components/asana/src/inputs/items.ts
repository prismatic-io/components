import { input } from "@prismatic-io/spectral";
import { validateId } from "../util";
import { connectionInput, pagination, portfolioId } from "./common";
const itemId = input({
  label: "Item ID",
  type: "string",
  example: "843750385",
  placeholder: "Enter item ID",
  comments: "The unique identifier for the item (a project or portfolio).",
  required: true,
  clean: validateId,
});
export const listPortfolioItemsInputs = {
  asanaConnection: connectionInput,
  pagination,
  portfolioId,
};
export const removePortfolioItemInputs = {
  asanaConnection: connectionInput,
  itemId,
  portfolioId,
};
