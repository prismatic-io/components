import {
  connectionInput,
  defaultSelectedRecordTypes,
  entityId,
  includeAllCustomRecordTypes,
  includeOnlyTopLevelRecordTypes,
  recordTypeFilter,
} from "./common";
import { includeCustom, includeOnlyTopLevel } from "./entities";

const { dataSource: _entityIdDataSource, ...entityIdWithoutDataSource } = entityId;

export const selectAttributeInputs = {
  connection: connectionInput,
  entityId: entityIdWithoutDataSource,
};

export const selectEntityInputs = {
  connection: connectionInput,
  includeCustom,
  includeOnlyTopLevel,
};

export const selectEntityTypeInputs = {
  connection: connectionInput,
  includeCustom,
  includeOnlyTopLevel,
};

export const getEntitiesMetaDataDataSourceInputs = {
  connection: connectionInput,
  defaultSelectedRecordTypes,
  recordTypeFilter,
  includeAllCustomRecordTypes,
  includeOnlyTopLevelRecordTypes,
};
