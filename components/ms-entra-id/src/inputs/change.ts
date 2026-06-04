import { input } from "@prismatic-io/spectral";
import { connection, deltaURL, odataParams, returnMinimal } from "./common";

export const listChangesInputs = {
  connection,
  deltaURL,
  $skiptoken: input({
    ...odataParams.$skiptoken,
    comments:
      "A state token returned in the @odata.nextLink URL of the previous delta function call, indicating there are further changes to be tracked in the same user collection.",
  }),
  $deltatoken: odataParams.$deltatoken,
  $select: odataParams.$select,
  $filter: odataParams.$filter,
  returnMinimal,
};
