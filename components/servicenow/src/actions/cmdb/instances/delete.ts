import { action } from "@prismatic-io/spectral";
import { deleteConfigurationItemRelationResponse } from "../../../examplePayloads";
import {
  apiVersionInput,
  className,
  connection,
  instanceUrlInput,
  relSysId,
  sysId,
} from "../../../inputs";
import { createNowApiClient } from "../../../util";

export const deleteConfigurationItem = action({
  display: {
    label: "Delete Configuration Item",
    description:
      "Deletes the relation for the specified configuration item (CI).",
  },
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      className,
      sysId,
      relSysId,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );

    const { data } = await client.delete(
      `/cmdb/instance/${className}/${sysId}/relation/${relSysId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    className,
    sysId,
    relSysId,
  },
  examplePayload: deleteConfigurationItemRelationResponse,
});
