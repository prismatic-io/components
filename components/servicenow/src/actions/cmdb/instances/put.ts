import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  className,
  configurationItemAttributes,
  configurationItemSource,
  connection,
  instanceUrlInput,
  sysId,
} from "../../../inputs";
import { createNowApiClient } from "../../../util";

export const updateConfigurationItem = action({
  display: {
    label: "Update Configuration Item",
    description:
      "Updates a single configuration item (CI) with the specified outbound and inbound relations within the specified Configuration Management Database (CMDB) table.",
  },
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      className,
      configurationItemAttributes,
      configurationItemSource,
      sysId,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );

    const payload = {
      attributes: configurationItemAttributes,
      source: configurationItemSource,
    };

    const { data } = await client.put(
      `/cmdb/instance/${className}/${sysId}`,
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    sysId,
    apiVersionInput,
    className,
    configurationItemSource,
    configurationItemAttributes,
  },
});
