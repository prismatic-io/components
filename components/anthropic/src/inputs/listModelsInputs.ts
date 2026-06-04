import {
  afterIdInput,
  beforeIdInput,
  connectionInput,
  fetchAllInput,
  limitInput,
} from "./general";

export const listModelsInputs = {
  connection: connectionInput,
  fetchAll: fetchAllInput,
  beforeId: beforeIdInput,
  afterId: afterIdInput,
  limit: limitInput,
};
