import { util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";

export const requestErrorHandler = (error: unknown) => {
  const handled = handleErrors(error);
  const serialized = util.types.toJSON(handled);
  throw new Error(serialized);
};
