import { connectionInput, shareName } from "./common";

export const listSharesInputs = {
  azureConnection: connectionInput,
};

export const createShareInputs = {
  azureConnection: connectionInput,
  shareName,
};

export const deleteShareInputs = {
  azureConnection: connectionInput,
  shareName,
};
