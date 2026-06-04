import { exportItem, getSelf } from "@esri/arcgis-rest-portal";
import { action } from "@prismatic-io/spectral";
import { EXPORT_LAYERS_EXAMPLE_PAYLOAD } from "../examplePayloads";
import {
  connection,
  featureServiceId,
  format,
  layersToExport,
  ownerName,
} from "../inputs";
import { getIdentityManager } from "../utils";

export const exportLayers = action({
  display: {
    label: "Export Layers",
    description: "Export layers to the specified output format.",
  },
  perform: async (
    _context,
    { connection, featureServiceId, ownerName, format, layersToExport },
  ) => {
    const authentication = await getIdentityManager(connection);

    const self = await getSelf({ authentication });
    const username = self.user.username;
    const owner = ownerName || username;

    const data = await exportItem({
      id: featureServiceId,
      owner,
      exportFormat: format,
      exportParameters: layersToExport
        ? {
            layers: layersToExport,
          }
        : undefined,
      authentication,
    });

    return { data };
  },
  inputs: {
    connection,
    featureServiceId,
    ownerName,
    format,
    layersToExport,
  },
  examplePayload: { data: EXPORT_LAYERS_EXAMPLE_PAYLOAD },
});
