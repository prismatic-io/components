import { action } from "@prismatic-io/spectral";
import { getCMDBClassMetaDataResponse } from "../../../examplePayloads";
import {
  apiVersionInput,
  className,
  connection,
  instanceUrlInput,
} from "../../../inputs";
import { createNowApiClient } from "../../../util";

export const getCMDBClassMetaData = action({
  display: {
    label: "Get CMDB Class Metadata",
    description: "Returns the meta data for the specified CMDB class",
  },
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
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    className,
  },
  examplePayload: getCMDBClassMetaDataResponse,
});
