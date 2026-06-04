import { listObjectMetadata } from "./listObjectMetadata";
import { getObjectMetadataByName } from "./getObjectMetadataByName";
import { createObjectsFromMetadata } from "./createObjectsFromMetadata";
import { createFieldsFromMetadata } from "./createFieldsFromMetadata";
import { updateMetadata } from "./updateMetadata";
import { deleteMetadata } from "./deleteMetadata";

export default {
  createFieldsFromMetadata,
  createObjectsFromMetadata,
  getObjectMetadataByName,
  listObjectMetadata,
  updateMetadata,
  deleteMetadata,
};
