import { input, util } from "@prismatic-io/spectral";
import { LIST_COLLECTIONS_DATASOURCE_REFERENCE } from "../../constants";
import { getAlldata, pagination, shopifyConnection } from "./common";

const collectionId = input({
  label: "Collection ID",
  type: "string",
  required: true,
  example: "gid://shopify/Collection/841564295",
  placeholder: "Enter collection ID",
  comments: "The unique identifier for the collection.",
  clean: util.types.toString,
  dataSource: LIST_COLLECTIONS_DATASOURCE_REFERENCE,
});

export const listCollectionsInputs = {
  shopifyConnection,
  getAlldata,
  pagination,
};

export const getCollectionInputs = {
  shopifyConnection,
  collectionId,
};

export const countCollectionsInputs = {
  shopifyConnection,
};

export const deleteCollectionInputs = {
  shopifyConnection,
  collectionId,
};
