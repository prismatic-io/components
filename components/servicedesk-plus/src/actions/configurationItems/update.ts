import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getConfigurationItemResponse as updateConfigurationItemResponse } from "../../examplePayloads";
import {
  attributes,
  ciId,
  ciTypeApiName,
  connectionInput,
  description,
} from "../../inputs";
import { createConfigurationItemPayload } from "../../util";

export const updateConfigurationItem = action({
  display: {
    label: "Update Configuration Item",
    description: "Edit an existing configuration item on the CMDB",
  },
  inputs: {
    ciTypeApiName,
    ciId,
    description,
    attributes: {
      ...attributes,
      default: JSON.stringify(
        {
          txt_ip_address: "127.0.0.1",
        },
        null,
        2,
      ),
    },
    connectionInput,
  },
  perform: async (
    context,
    { connectionInput, ciTypeApiName, ciId, description, attributes },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const newConfigurationItem = {
      description,
      ci_attributes: {
        ...attributes,
      },
    };
    const payload = createConfigurationItemPayload(
      ciTypeApiName as string,
      newConfigurationItem,
    );
    const { data } = await client.put(
      `/cmdb/${ciTypeApiName}/${ciId}`,
      payload,
    );
    return { data };
  },
  examplePayload: {
    data: updateConfigurationItemResponse,
  },
});
