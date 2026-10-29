import { geocode as geocodeEsri } from "@esri/arcgis-rest-geocoding";
import { action } from "@prismatic-io/spectral";
import { GEOCODE_EXAMPLE_PAYLOAD } from "../examplePayloads";
import { addressSearch, connection } from "../inputs";
import { getApiKeyManager } from "../utils";

export const geocode = action({
  display: {
    label: "GeoCode",
    description:
      "Determine the location of a single address or point of interest.",
  },
  perform: async (_context, { connection, addressSearch }) => {
    const authentication = getApiKeyManager(connection);
    const data = await geocodeEsri({
      authentication,
      singleLine: addressSearch,
    });

    return { data };
  },
  inputs: {
    connection,
    addressSearch,
  },
  examplePayload: { data: GEOCODE_EXAMPLE_PAYLOAD },
});
