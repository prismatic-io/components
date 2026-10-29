import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDatasetExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  dataSetId,
  dataSetInput,
  qri,
  secureQri,
  technicalName,
} from "../../inputs";

export const updateDataset = action({
  display: {
    label: "Update Data Set",
    description: "Update data set by ID.",
  },
  examplePayload: updateDatasetExamplePayload,
  perform: async (
    context,
    { connection, dataSetId, dataSetInput, technicalName, qri, secureQri },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.put(`/data-sets/${dataSetId}`, {
      id: dataSetId,
      qri: qri || undefined,
      secureQri: secureQri || undefined,
      technicalName: technicalName || undefined,
      ...dataSetInput,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataSetId,
    qri,
    technicalName,
    secureQri,
    dataSetInput,
  },
});
