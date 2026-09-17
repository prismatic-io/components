import { action } from "@prismatic-io/spectral";
import { getCMDBClassMetaDataExamplePayload } from "../../../examplePayloads";
import { getCMDBClassMetaDataInputs } from "../../../inputs";
import { createNowApiClient } from "../../../util";
export const getCMDBClassMetaData = action({
  display: {
    label: "Get CMDB Class Metadata",
    description: "Returns the metadata for the specified CMDB class.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { apiVersionInput, connection, instanceUrlInput, className },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const { data } = await client.get(`/cmdb/meta/${className}`);
    return {
      data,
    };
  },
  inputs: getCMDBClassMetaDataInputs,
  examplePayload: getCMDBClassMetaDataExamplePayload,
});
