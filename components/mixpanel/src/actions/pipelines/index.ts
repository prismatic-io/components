import { createGCSPipeline } from "./create";
import { createGenericPipeline } from "./createGeneric";
import { deletePipeline } from "./delete";
import { editGCSPipeline } from "./edit";
import { editGenericPipeline } from "./editGeneric";
import { getPipeline } from "./get";
import { listPipelines } from "./list";

export default {
  createGCSPipeline,
  createGenericPipeline,
  deletePipeline,
  editGCSPipeline,
  editGenericPipeline,
  getPipeline,
  listPipelines,
};
