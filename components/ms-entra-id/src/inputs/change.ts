import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { connection, deltaURL, odataParams, returnMinimal } from "./common";
const listChangesODataQueryParams = structuredObjectInput({
  label: "OData Query Parameters",
  required: false,
  comments:
    "OData system query options for filtering, selecting, and tracking changes across pages.",
  inputs: {
    $deltatoken: odataParams.$deltatoken,
    $skiptoken: input({
      ...odataParams.$skiptoken,
      comments:
        "A state token returned in the @odata.nextLink URL of the previous delta function call, indicating there are further changes to be tracked in the same user collection.",
    }),
    $select: odataParams.$select,
    $filter: odataParams.$filter,
  },
});
export const listChangesInputs = {
  connection,
  deltaURL,
  odataQueryParams: listChangesODataQueryParams,
  returnMinimal,
};
