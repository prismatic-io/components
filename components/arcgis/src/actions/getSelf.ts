import { getSelf as getSelfEsri } from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { getApiKeyManager } from "../utils";

export const getSelf = action({
  display: {
    label: "Get Current User",
    description: "Returns the view of the portal as seen by the current user.",
  },
  perform: async (_context, { connection }) => {
    const authentication = getApiKeyManager(connection);
    const data = await getSelfEsri({ authentication });
    return { data };
  },
  inputs: {
    connection,
  },
});
