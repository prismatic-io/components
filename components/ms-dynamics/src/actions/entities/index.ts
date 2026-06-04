import { batchEntityActions } from "./batchEntityActions";
import { createEntity } from "./createEntity";
import { deleteEntity } from "./deleteEntity";
import { getEntitiesMetaData } from "./getEntitiesMetaData";
import { getEntity } from "./getEntity";
import { getEntityMetaData } from "./getEntityMetaData";
import { listEntities } from "./listEntities";
import { listEntitiesAction } from "./listEntitiesAction";
import { queryEntities } from "./queryEntities";
import { updateEntity } from "./updateEntity";
import { upsertEntity } from "./upsertEntity";

export default {
  queryEntities,
  getEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  upsertEntity,
  getEntitiesMetaData,
  getEntityMetaData,
  batchEntityActions,
  listEntities,
  listEntitiesAction,
};
