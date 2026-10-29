import { input, util } from "@prismatic-io/spectral";
import { endCursor, getAlldata, limit, shopifyConnection } from "./common";

const collectIdGql = input({
  label: "Collect ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the collect.",
  example: "gid://shopify/Collection/123456789",
  placeholder: "Enter collect ID",
  clean: util.types.toString,
});

export const countCollectsInputs = {
  shopifyConnection,
};

export const deleteCollectInputs = {
  shopifyConnection,
  collectIdGql,
};

export const getCollectInputs = {
  shopifyConnection,
  collectIdGql,
};

export const listCollectsInputs = {
  shopifyConnection,
  getAlldata,
  limit,
  endCursor,
};
