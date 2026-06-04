import { connection, model, modelSearch, nameSearch } from "./common";

export const selectModelInputs = {
  connection,
  nameSearch,
  modelSearch,
};

export const selectRecordByIdInputs = {
  connection,
  model: {
    ...model,
    dataSource: undefined,
  },
};
