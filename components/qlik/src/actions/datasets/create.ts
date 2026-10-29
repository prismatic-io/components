import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createDatasetExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  dataSetInput,
  qri,
  secureQri,
  technicalName,
} from "../../inputs";

export const createDataset = action({
  display: {
    label: "Create New Data Set",
    description: "Save new data set.",
  },
  examplePayload: createDatasetExamplePayload,
  perform: async (
    context,
    { connection, dataSetInput, technicalName, qri, secureQri },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.post(`/data-sets`, {
      id: null,
      technicalName: technicalName || undefined,
      qri: qri || undefined,
      secureQri: secureQri || undefined,
      ...dataSetInput,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    qri,
    technicalName,
    secureQri,
    dataSetInput,
  },
});
