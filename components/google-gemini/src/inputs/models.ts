import {
  connection,
  extraParameters,
  fetchAll,
  filter,
  model,
  pageSize,
  pageToken,
} from "./common";

export const getModelInfoInputs = {
  connection,
  modelName: model,
};

export const listModelsInputs = {
  fetchAll,
  pageSize,
  pageToken,
  filter,
  extraParameters,
  connection,
};
