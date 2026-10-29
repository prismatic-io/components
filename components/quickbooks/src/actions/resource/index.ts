import { createResource } from "./createResource";
import { findResource } from "./findResource";
import items from "./items";
import { queryResource } from "./queryResource";
import { updateResource } from "./updateResource";

export default {
  queryResource,
  createResource,
  findResource,
  updateResource,
  ...items,
};
