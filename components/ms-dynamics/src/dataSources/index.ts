import { getEntitiesMetaData } from "./getEntitiesMetaData";
import { selectAttribute } from "./selectAttribute";
import { selectEntity } from "./selectEntity";
import { selectEntityType } from "./selectEntityType";

export default {
  getEntitiesMetaData,
  entityTypes: selectEntityType,
  entities: selectEntity,
  attributes: selectAttribute,
};
