import { connection } from "./common";
import {
  count,
  include,
  includeItems,
  startPosition,
  subFolderDepth,
  userFilter,
} from "./folders";

export const foldersInputs = {
  connection,
  count,
  include,
  includeItems,
  startPosition,
  subFolderDepth,
  userFilter,
};

export const templatesInputs = {
  connection,
};
