import {
  connection,
  fetchAll,
  limit,
  model,
  modelSearch,
  nameSearch,
  offset,
} from "./common";

export const listModelsInputs = {
  connection,
  fetchAll,
  limit,
  offset,
  nameSearch,
  modelSearch,
};

export const listModelFieldsInputs = {
  connection,
  model,
};
