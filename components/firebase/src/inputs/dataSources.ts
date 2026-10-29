import {
  collection,
  connectionInput,
  orderBy,
  queryOperatorCode,
} from "./common";

export const selectDocumentInputs = {
  collection: {
    ...collection,
    dataSource: undefined,
  },
  firebaseConnection: connectionInput,
  queryOperatorCode,
  orderBy,
};

export const selectCollectionInputs = {
  firebaseConnection: connectionInput,
};
