import {
  connection,
  fetchAll,
  model,
  modelSearch,
  nameSearch,
  pagination,
} from "./common";
export const listModelsInputs = {
  connection,
  fetchAll,
  pagination,
  nameSearch,
  modelSearch,
};
export const listModelFieldsInputs = {
  connection,
  model,
};
