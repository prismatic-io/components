import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  cursorPagination,
  offsetPagination,
  productIdInput,
  sortBy,
  sortDirection,
  sortInput,
} from "./common";
import { cleanCode, cleanNumber, cleanString } from "../util";
const productName = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The name of the product",
  example: "Professional Software License",
  placeholder: "Enter product name",
});
const code = input({
  label: "Code",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The product code",
  example: "PROD-001",
  placeholder: "Enter product code",
});
const unit = input({
  label: "Unit",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The unit in which this product is sold",
  example: "license",
  placeholder: "Enter unit",
});
const tax = input({
  label: "Tax",
  type: "string",
  required: false,
  default: "0",
  clean: cleanNumber,
  comments: "The tax percentage",
  example: "10",
  placeholder: "Enter tax percentage",
});
const visibleTo = input({
  label: "Visible To",
  type: "string",
  required: false,
  model: [
    { label: "1", value: "1" },
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "7", value: "7" },
  ],
  clean: cleanNumber,
  comments:
    "Controls which users can see this record. 1 = owner only, 3 = owner's group, 5 = owner's group and sub-groups, 7 = entire company.",
});
const ownerId = input({
  label: "Owner ID",
  type: "string",
  required: false,
  clean: cleanNumber,
  comments:
    "The ID of the user who will be marked as the owner of this product",
  example: "123",
  placeholder: "Enter User ID",
});
const prices = input({
  label: "Prices",
  type: "code",
  language: "json",
  required: false,
  comments:
    'An array of objects, each containing: "currency" (string), "price" (number), "cost" (number, optional), "overhead_cost" (number, optional)',
  clean: cleanCode,
  example: JSON.stringify(
    [
      {
        product_id: 1,
        price: 5,
        currency: "EUR",
        cost: 2,
        direct_cost: 1,
        notes: "this is a note",
      },
    ],
    null,
    2,
  ),
});
const getProductsFilterId = input({
  label: "Filter ID",
  type: "string",
  clean: cleanNumber,
  comments: "The unique identifier of the filter to apply to narrow results.",
  example: "123",
  placeholder: "Enter Filter ID",
});
const getProductsIds = input({
  label: "Ids",
  type: "string",
  clean: cleanString,
  comments:
    "An array of integers with the IDs of the products that should be returned in the response",
  example: "123,456,789",
  placeholder: "Enter Product IDs (comma-separated)",
});
const followerUserId = input({
  label: "User ID",
  type: "string",
  required: true,
  clean: util.types.toNumber,
  comments: "The ID of the user to add as a follower of the product.",
  example: "123",
  placeholder: "Enter User ID",
});
const followerId = input({
  label: "Follower ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The ID of the relationship between the follower and the product",
});
const productDealsStatus = input({
  label: "Status",
  type: "string",
  model: [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
    { label: "Deleted", value: "deleted" },
  ],
  clean: cleanString,
  comments: "Only fetch deals with a specific status",
});
const includeDeletedFiles = input({
  label: "Include Deleted Files",
  type: "string",
  model: [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
  ],
  clean: cleanNumber,
  comments: "When enabled, the list of files will also include deleted files",
});
export const addProductInputs = {
  connection: connectionInput,
  name: productName,
  code,
  unit,
  tax,
  visibleTo,
  ownerId,
  prices,
};
export const updateProductInputs = {
  connection: connectionInput,
  id: productIdInput,
  name: productName,
  code,
  unit,
  tax,
  visibleTo,
  ownerId,
  prices,
};
export const getProductsInputs = {
  connection: connectionInput,
  filterId: getProductsFilterId,
  ids: getProductsIds,
  pagination: cursorPagination,
  sortBy,
  sortDirection,
};
export const addProductFollowerInputs = {
  connection: connectionInput,
  id: productIdInput,
  userId: followerUserId,
};
export const deleteProductFollowerInputs = {
  connection: connectionInput,
  id: productIdInput,
  followerId,
};
export const getProductDealsInputs = {
  connection: connectionInput,
  id: productIdInput,
  pagination: offsetPagination,
  status: productDealsStatus,
};
export const getProductFilesInputs = {
  connection: connectionInput,
  id: productIdInput,
  pagination: offsetPagination,
  includeDeletedFiles,
  sort: sortInput,
};
export const deleteProductInputs = {
  connection: connectionInput,
  id: productIdInput,
};
export const getProductInputs = {
  connection: connectionInput,
  id: productIdInput,
};
export const getProductUsersInputs = {
  connection: connectionInput,
  id: productIdInput,
};
export const getProductFollowersInputs = {
  connection: connectionInput,
  id: productIdInput,
  pagination: cursorPagination,
};
